import { Handlers } from "$fresh/server.ts";
import { grayscale, PageSizes, PDFDocument, PDFFont, PDFPage, StandardFonts } from "pdf-lib";
import { decodeBase64 } from "jsr:@std/encoding/base64";
import { gunzip } from "jsr:@deno-library/compress";
import { Army, ModelName, Save, SaveArc, SaveType, Stats } from "../game/types.ts";
import { loadArmyKV } from "../server/kv.ts";
import { SaveModifier, WeaponArc, WeaponStats, WeaponStatsAtRange, WeaponType } from "../game/weaponTypes.ts";
import { getStatsForModelName } from "../game/lists.ts";
import { getWeaponStats } from "../game/weapons.ts";

function decodeBase64Gzip(encodedArmyString: string): string {
  const zippedArmyString = decodeBase64(decodeURIComponent(encodedArmyString));
  const armyAsJson = new TextDecoder().decode(gunzip(zippedArmyString));
  return armyAsJson;
}

function decodeBase64GzipJson<T>(encodedArmyString: string): T {
  const armyAsJson = decodeBase64Gzip(encodedArmyString);
  const army = JSON.parse(armyAsJson);
  return army as T;
}

type NamedStats = {
    stats: Stats;
    modelName: ModelName;
}

type NamedWeaponStats = {
    weaponStats: WeaponStats;
    weaponType: WeaponType;
}

type AllStats = {
    modelStats: NamedStats[];
    weaponsForModels: Map<ModelName, Set<WeaponType>>;
    namedWeaponStats: NamedWeaponStats[];
    modelsMissingStats: ModelName[];
    weaponsMissingStats: WeaponType[];
};

function getAllStats(army: Army): AllStats {
    const namedStatsMap: Map<ModelName, Stats> = new Map();
    const modelsMissingStatsSet: Set<ModelName> = new Set();
    const weaponsMissingStatsSet: Set<WeaponType> = new Set();
    const namedWeaponStatsMap: Map<WeaponType, WeaponStats> = new Map();

    const out: AllStats = {
        modelStats: [],
        namedWeaponStats: [],
        modelsMissingStats: [],
        weaponsMissingStats: [],
        weaponsForModels: new Map(),
    }

    const recordWeaponStats = (mn: ModelName, wt: WeaponType) => {
        const weaponStats = getWeaponStats(wt);
        if(weaponStats != undefined)
            namedWeaponStatsMap.set(wt, weaponStats);
        else
            weaponsMissingStatsSet.add(wt);
        if(!out.weaponsForModels.has(mn))
            out.weaponsForModels.set(mn, new Set());
        out.weaponsForModels.get(mn)?.add(wt);
    };

    for (const formation of army.formations) {
        for (const detachment of formation.detachments) {
            for (const modelGroup of detachment.modelGroups) {
                if(modelGroup.number == 0)
                    continue;
                const modelName = modelGroup.modelName;
                if (!namedStatsMap.has(modelName)) {
                    const stats = getStatsForModelName(modelName);
                    if(stats == undefined) {
                        modelsMissingStatsSet.add(modelName);
                        continue;
                    }   
                    namedStatsMap.set(modelName, stats);

                    //first, required weapons
                    stats.modelLoadoutSlots.forEach((slot) => {
                        if (slot.name == "") {
                            if(slot.possibleModelLoadouts[0].weaponTypes != undefined)
                                slot.possibleModelLoadouts[0].weaponTypes.forEach((wt) => recordWeaponStats(modelName, wt));
                            else
                                recordWeaponStats(modelName, slot.possibleModelLoadouts[0].loadout as WeaponType);
                        }
                    });

                    //now find all the user-chosen weapons
                    for (const mlg of modelGroup.modelLoadoutGroups) {
                        for (const mls of mlg.modelLoadoutSlots) {
                            const statsmlss = stats.modelLoadoutSlots.find((s) => s.name == mls.name);
                            const statsmls = statsmlss?.possibleModelLoadouts.find((s)=>s.loadout == mls.modelLoadout.loadout);
                            if(statsmls == undefined) {
                                modelsMissingStatsSet.add(modelName);
                                continue;
                            }
                            if(statsmls.weaponTypes != undefined)
                                statsmls.weaponTypes.forEach((wt) => recordWeaponStats(modelName, wt));
                            else
                                recordWeaponStats(modelName, statsmls.loadout as WeaponType);
                        }
                    }
                }
            }
        }
    }

    const namedStatsMapKeysIter = namedStatsMap.keys();
    const namedStatsMapKeys = Array.from(namedStatsMapKeysIter);
    namedStatsMapKeys.sort();
    out.modelStats = namedStatsMapKeys.map((modelName)=>{return {modelName, stats: namedStatsMap.get(modelName)!}})

    const namedWeaponStatsMapKeysIter = namedWeaponStatsMap.keys();
    const namedWeaponStatsMapKeys = Array.from(namedWeaponStatsMapKeysIter);
    namedWeaponStatsMapKeys.sort();
    out.namedWeaponStats = namedWeaponStatsMapKeys.map((weaponType)=>{return {weaponType, weaponStats: namedWeaponStatsMap.get(weaponType)!}})

    const modelsMissingStatsSetKeysIter = modelsMissingStatsSet.keys();
    const modelsMissingStatsSetKeys = Array.from(modelsMissingStatsSetKeysIter);
    out.modelsMissingStats = modelsMissingStatsSetKeys.sort();

    const weaponsMissingStatsSetKeysIter = weaponsMissingStatsSet.keys();
    const weaponsMissingStatsSetKeys = Array.from(weaponsMissingStatsSetKeysIter);
    out.weaponsMissingStats = weaponsMissingStatsSetKeys.sort();

    return out;
}

const h1FontSize = 28;
const h4FontSize = 12;
const bodyFontSize = 10;
const xMargin = 30;
const topYMargin = 20;
const bottomYMargin = 40;
const gapSize = 4;
const lineGapSize = 16;
const numSaveHeaders = 5;
const statsTypeWidth = 48;
const weaponWidth = 52;

type PageData = {
    y: number;
    width: number;
    height: number;
    pdfDoc: PDFDocument;
    page: PDFPage;
    font: PDFFont;
    italicFont: PDFFont;
    pageNumber: number;
}

function drawPageNumber(pageData: PageData) {
    const pageNumberText = pageData.pageNumber.toString();
    const textWidth = pageData.font.widthOfTextAtSize(pageNumberText, bodyFontSize);
    pageData.page.drawText(pageNumberText, {x: pageData.width / 2 - textWidth / 2, y: 10 + bodyFontSize, size: bodyFontSize})
}

function newPage(pageData: PageData) {
    drawPageNumber(pageData);
    pageData.page = pageData.pdfDoc.addPage(PageSizes.A4);
    pageData.pageNumber += 1;
    pageData.y = pageData.height - topYMargin;
}

function decY(y: number, pageData: PageData) {
    const newY = pageData.y - y;
    if(newY < bottomYMargin) {
        newPage(pageData);
        pageData.y -= y;
    } else {
        pageData.y = newY;
    }
}

type SaveHeader = {
    saveType: SaveType;
    arc: SaveArc;
};

type SaveHeaders = {
    saveHeaders: SaveHeader[];
    rows: number;
}

function writeUnitHeaders(saveHeaders: SaveHeaders, stats: Stats, pageData: PageData) {
    pageData.page.drawRectangle({
        x: xMargin,
        y: pageData.y -1 - (1+bodyFontSize) * saveHeaders.rows,
        color: grayscale(0.8),
        opacity: 0.5,
        width: pageData.width - xMargin*2,
        height: bodyFontSize * saveHeaders.rows
    })

    decY(bodyFontSize, pageData);
    let x = xMargin;
    pageData.page.drawText(
        "Type", {size: bodyFontSize, x, y: pageData.y}
    );
    x += statsTypeWidth;
    pageData.page.drawText(
        "Scale", {size: bodyFontSize, x, y: pageData.y}
    );
    x += 40;
    pageData.page.drawText(
        "Move", {size: bodyFontSize, x, y: pageData.y}
    );
    x += 40;
    
    let numSaves = 0;
    for(const sh of saveHeaders.saveHeaders) {
        pageData.page.drawText(
            (sh.saveType=="Ion Shield")?"Ion Sh.":sh.saveType, {size: bodyFontSize, x, y: pageData.y}
        );
        
        x += 40;
        numSaves++;
    }
    if(stats.voidShields) {
        pageData.page.drawText(
            "Void Sh.", {size: bodyFontSize, x, y: pageData.y}
        );
        x += 40;
        numSaves++;
    }
    while(numSaves < numSaveHeaders) {
        x += 40;
        numSaves++;
    }
    pageData.page.drawText(
        "CAF", {size: bodyFontSize, x, y: pageData.y}
    );
    x += 40;
    pageData.page.drawText(
        "Morale", {size: bodyFontSize, x, y: pageData.y}
    );
    x += 40;
    pageData.page.drawText(
        "W", {size: bodyFontSize, x, y: pageData.y}
    );
    x += 40;
    pageData.page.drawText(
        "TacStr", {size: bodyFontSize, x, y: pageData.y}
    );
    x += 40;

    if(saveHeaders.rows == 2) {
        decY(h4FontSize, pageData);
        x = xMargin;
        x += statsTypeWidth;
        x += 40;
        x += 40;
        let numSaves = 0;
        for(const sh of saveHeaders.saveHeaders) {
            pageData.page.drawText(
                (sh.arc == "All" ? "" : (sh.arc)), {size: bodyFontSize, x, y: pageData.y}
            );
            x += 40;
            numSaves++;
        }
        while(numSaves < numSaveHeaders) {
            x += 40;
            numSaves++;
        }
    }
}

function formatSave(s: Save) {
    return s.save.toString() + "+"
}

function writeUnit(namedStats: NamedStats, allStats: AllStats, saveHeaders: SaveHeaders, pageData: PageData) {
    decY(bodyFontSize, pageData);
    let x = xMargin;

    const stats = namedStats.stats;
    pageData.page.drawText(
        (stats.detachmentType=="Super-heavy vehicle")?"S. H. V.":stats.detachmentType, {size: bodyFontSize, x, y: pageData.y}
    );
    x += statsTypeWidth;
    pageData.page.drawText(
        stats.scale.toString(), {size: bodyFontSize, x, y: pageData.y}
    );
    x += 40;
    pageData.page.drawText(
        stats.move?.toString()??"", {size: bodyFontSize, x, y: pageData.y}
    );
    x += 40;
    let numSaves = 0;
    for(const sh of saveHeaders.saveHeaders) {
        const save = stats.saves.find((s)=>s.saveType == sh.saveType && s.arc == sh.arc);
        if(save) {
            pageData.page.drawText(
                formatSave(save), {size: bodyFontSize, x, y: pageData.y}
            );
        }
        x += 40;
        numSaves ++;
    }
    if(stats.voidShields) {
        pageData.page.drawText(
            stats.voidShields.toString(),
            {size: bodyFontSize, x, y: pageData.y}
        );
        x += 40;
        numSaves++;
    }
    while(numSaves < numSaveHeaders) {
        x += 40;
        numSaves++;
    }
    pageData.page.drawText(
        (stats.caf >= 0)?("+" + stats.caf.toString()):stats.caf.toString(), {size: bodyFontSize, x, y: pageData.y}
    );
    x += 40;
    pageData.page.drawText(
        (stats.morale)?(stats.morale.toString() + "+"):"", {size: bodyFontSize, x, y: pageData.y}
    );
    x += 40;
    pageData.page.drawText(
        stats.wounds.toString() + (stats.voidShields?("W, " + stats.voidShields + "VS"):""), {size: bodyFontSize, x, y: pageData.y}
    );
    x += 40;
    pageData.page.drawText(
        stats.tacticalStrength.toString(), {size: bodyFontSize, x, y: pageData.y}
    );

    const wnSet = allStats.weaponsForModels.get(namedStats.modelName);
    if(wnSet) {
        decY(bodyFontSize, pageData);
        const wns = Array.from(wnSet);
        pageData.page.drawText(
            wns.join(", "), {size: bodyFontSize, x: xMargin, y: pageData.y}
        );
    }

    const traits = namedStats.stats.unitTraits;
    if(traits.length > 0) {
        decY(bodyFontSize, pageData);
        pageData.page.drawText(
            traits.join(", "), {size: bodyFontSize, x: xMargin, y: pageData.y, font: pageData.italicFont}
        );
    }
    decY(gapSize, pageData);
}

function gatherSaveHeaders(stats: Stats): SaveHeaders {
    const saveHeaders: SaveHeader[] = [];
    let rows = 1;
    for(const s of stats.saves) {
        if(!saveHeaders.some((sh)=>sh.saveType == s.saveType && sh.arc == s.arc)) {
            if(s.arc != "All")
                rows = 2;
            saveHeaders.push({saveType: s.saveType, arc: s.arc});
        }
    }
    return { rows, saveHeaders: saveHeaders.sort((a, b) => a.saveType.localeCompare(b.saveType) || a.arc.localeCompare(b.arc)) };
}

function writeWeaponHeaders(pageData: PageData) {
    pageData.page.drawRectangle({
        x: xMargin,
        y: pageData.y -1 - (1+bodyFontSize),
        color: grayscale(0.8),
        opacity: 0.5,
        width: pageData.width - xMargin*2,
        height: bodyFontSize
    })

    decY(bodyFontSize, pageData);
    let x = xMargin;
    pageData.page.drawText(
        "Arc", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        "Range", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        "D6", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        "Hit", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        "Inf/Cav", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        "Walker", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        "V/K/T", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        "Ion Sh.", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        "Void Sh.", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        "Struct", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
}

function formatSaveModifier(saveModifier: SaveModifier): string {
  let out = saveModifier.modifier.toString();
  if(saveModifier.wounds > 1)
    out += ", " + saveModifier.wounds.toString() + "W";
  return out;
}

function writeWeaponStatsAtRange(arc: WeaponArc, wsar: WeaponStatsAtRange, pageData: PageData) {
    decY(bodyFontSize, pageData);

    let x = xMargin;
    pageData.page.drawText(
        arc, {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        (wsar.minRange !=undefined)?(wsar.minRange.toString() + '" - ' + wsar.maxRange?.toString() + '"'):(""), 
        {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        wsar.dice?.toString()??"", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        (wsar.hit != undefined)?(wsar.hit.toString() + "+"):"", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        (wsar.infAndCav)?(formatSaveModifier(wsar.infAndCav)):"", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        (wsar.walker)?(formatSaveModifier(wsar.walker)):"", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        (wsar.vShvKT)?(formatSaveModifier(wsar.vShvKT)):"", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        (wsar.ionShield)?(formatSaveModifier(wsar.ionShield)):"", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        (wsar.voidShields)?("-" + wsar.voidShields + "VS"):"", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    pageData.page.drawText(
        (wsar.structure)?(formatSaveModifier(wsar.structure)):"", {size: bodyFontSize, x, y: pageData.y}
    );
    x += weaponWidth;
    
    if(wsar.traits.length > 0) {
        decY(bodyFontSize, pageData);
        x = xMargin;
        pageData.page.drawText(
            wsar.traits.join(", "), {size: bodyFontSize, x, y: pageData.y, font: pageData.italicFont}
        );
    }
}

function writeWeapon(namedWeaponStats: NamedWeaponStats, pageData: PageData) {
    const weaponStats = namedWeaponStats.weaponStats;
    for(const wsar of weaponStats.weaponStatsAtRange) {
        writeWeaponStatsAtRange(weaponStats.arc, wsar, pageData);
    }
    decY(gapSize, pageData);
}

async function createPdf(army: Army) {
    const pdfDoc = await PDFDocument.create();

    const allStats = getAllStats(army);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
    
    const page = pdfDoc.addPage(PageSizes.A4);
    const {width, height} = page.getSize()
    
    const y = height - h1FontSize - topYMargin;
    const pageData = {y, width, height, pdfDoc, font, page, italicFont, pageNumber: 1};

    page.drawText(army.name + " stats", {size: h1FontSize, font, x: xMargin,y: pageData.y});
    const betaText = "(beta)";
    const textWidth = pageData.font.widthOfTextAtSize(betaText, bodyFontSize);
    page.drawText(betaText, {size: bodyFontSize, font, x: pageData.width - xMargin - textWidth, y: pageData.y});
    pageData.y -= lineGapSize;
    page.drawLine({
        start: {x: xMargin, y: pageData.y}, end: {x: width-xMargin, y: pageData.y}
    });

    for(const ns of allStats.modelStats) {
        const saveHeaders = gatherSaveHeaders(ns.stats);
        decY(h4FontSize, pageData);
        pageData.page.drawText(
            ns.modelName, {size: h4FontSize, x: xMargin, y: pageData.y}
        );
        writeUnitHeaders(saveHeaders, ns.stats, pageData);
        writeUnit(ns, allStats, saveHeaders, pageData)
    }

    newPage(pageData);

    for(const nws of allStats.namedWeaponStats) {
        decY(h4FontSize, pageData);
        pageData.page.drawText(
            nws.weaponType, {size: h4FontSize, x: xMargin, y: pageData.y}
        );
        writeWeaponHeaders(pageData);
        writeWeapon(nws, pageData);
    }

    drawPageNumber(pageData);

    const bytes = await pdfDoc.save();
    return bytes;
}

export const handler: Handlers = {
  async GET(req) {
    const url = URL.parse(req.url);
    if(url == null)
        return new Response("URL not valid", {status: 400});

    const encodedArmyString = url.searchParams.get("army") ?? "";
    const clouduuid = url.searchParams.get("clouduuid") ?? "";
    if(encodedArmyString == "" && clouduuid == "")
        return new Response("No army param", {status: 400});

    let army = undefined;
        if(encodedArmyString != "")
            army=decodeBase64GzipJson<Army>(encodedArmyString);
        else {
            const kvsa = await loadArmyKV(clouduuid);
            if(kvsa == undefined)
                return new Response("No army param", {status: 400});    
            army = JSON.parse(kvsa.jsonData);
        }
        
    const fileName = army.name.trim().replace(/ +/g, '-').replace(/[^a-z0-9\-]/gi, '_').toLowerCase()+"_stats";
    return createPdf(army).then((s)=>{
        return new Response(s, {
            status: 200,
            headers: {
                "content-type": "application/pdf",
                "content-disposition": "attachment; filename=\"" + fileName + ".pdf\"",
                "content-transfer-encoding": "binary"
            }
        }
    )});
  }
}