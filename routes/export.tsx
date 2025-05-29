import { grayscale, PageSizes, PDFDocument, PDFFont, PDFPage, rgb, StandardFonts } from "pdf-lib";
import { Army, Detachment, Formation, ModelGroup } from "../game/types.ts";
import { Handlers } from "$fresh/server.ts";
import { getShapeForFormationName, getStatsForModelName } from "../game/lists.ts";
//import { decodeBase64GzipJson } from "../server/storageServer.ts";

import { decodeBase64 } from "jsr:@std/encoding/base64";
import { gunzip } from "jsr:@deno-library/compress";

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

const h1FontSize = 28;
const h2FontSize = 18;
const h3FontSize = 14;
const bodyFontSize = 10;
const damageSquareSize = 10;
const damageSquaresX = 520;
const xMargin = 30;
const topYMargin = 20;
const bottomYMargin = 40;
const indent = 20;
const gapSize = 4;
const lineGapSize = 16;
const errorColor = rgb(0.7, 0.1, 0.1);

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

function decY(y: number, pageData: PageData) {
    const newY = pageData.y - y;
    if(newY < bottomYMargin) {
        drawPageNumber(pageData);
        pageData.page = pageData.pdfDoc.addPage(PageSizes.A4);
        pageData.pageNumber += 1;
        pageData.y = pageData.height - y - topYMargin;
    } else {
        pageData.y = newY;
    }
}

function writeModelGroup(modelGroup: ModelGroup, damageBoxes: boolean, pageData: PageData) {
    if(modelGroup.number == 0)
        return;

    decY(bodyFontSize + gapSize, pageData);
    pageData.page.drawText(
        modelGroup.number.toString() + "x " + modelGroup.modelName, {size: bodyFontSize, x: xMargin, y: pageData.y}
    );
    const pointsText = modelGroup.points + " pts"
    const textWidth = pageData.font.widthOfTextAtSize(pointsText, bodyFontSize);
    const pointsX = pageData.width - xMargin - textWidth;
    const pointsY = pageData.y;
    pageData.page.drawText(pointsText, {size: bodyFontSize, font: pageData.font, x: pointsX, y: pointsY});
    
    if(damageBoxes) {
        const stats = getStatsForModelName(modelGroup.modelName);
        let x = damageSquaresX;
        if(stats != undefined) {
            for(let i = 0; i < modelGroup.number; ++i) {
                x -= gapSize;
                for(let j = 0; j < stats.wounds; ++j) {
                    x -= damageSquareSize;
                    pageData.page.drawSquare(
                        {
                            x,
                            y: pointsY, size: damageSquareSize, 
                            borderWidth: 1, borderColor: grayscale(0), color: grayscale(1)
                        }
                    )
                }
            }
        }
    }

    for(const mlg of modelGroup.modelLoadoutGroups) {
        decY(bodyFontSize + gapSize, pageData);
        let mlgText = "";
        if(mlg.number != modelGroup.number) {
            mlgText += mlg.number.toString() + "x ";
        } else {
            if(mlg.number > 1)
                mlgText += "all with "
            else
                mlgText += "with "
        }
        if(mlg.modelLoadoutSlots.length == 1) {
            pageData.page.drawText(
                mlgText + mlg.modelLoadoutSlots.map((s)=>{
                    return s.name + ": " + s.modelLoadout.loadout
                }).join(", "), {size: bodyFontSize, x: xMargin + indent, y: pageData.y}
            );
        } else {
            pageData.page.drawText(mlgText, {size: bodyFontSize, x: xMargin + indent, y: pageData.y});
            for(const mls of mlg.modelLoadoutSlots) {
                decY(bodyFontSize + gapSize, pageData);
                pageData.page.drawText(
                    mls.name + ": " + mls.modelLoadout.loadout, {size: bodyFontSize, x: xMargin + 2*indent, y: pageData.y}
                );
            }
        }
    }
    
}

function writeDetachment(formation: Formation, detachment: Detachment, slotName: string, damageBoxes: boolean, pageData: PageData) {
    if(detachment.modelGroups.length == 0)
        return;

    decY(h3FontSize + gapSize * 2, pageData);
    pageData.page.drawText(slotName + ": " + detachment.detachmentName, {size: h3FontSize, x: xMargin, y: pageData.y});

    const pointsText = detachment.points + " pts"
    const textWidth = pageData.font.widthOfTextAtSize(pointsText, h3FontSize);
    pageData.page.drawText(pointsText, {size: h3FontSize, font: pageData.font, x: pageData.width - xMargin - textWidth, y: pageData.y});

    if(detachment.validationState.valid == false){
        decY(bodyFontSize + gapSize, pageData);
        const errorText = "Detachment not valid! " + detachment.validationState.error;
        pageData.page.drawText(
            errorText, 
            {size: bodyFontSize, x: xMargin, y: pageData.y, color: errorColor}
        );
    }

    if(detachment.attachedDetachmentIndex != undefined && detachment.attachedDetachmentIndex != -1){
        decY(bodyFontSize + gapSize, pageData);
        pageData.page.drawText(
            "Attached to detachment " + formation.detachments[detachment.attachedDetachmentIndex].detachmentName, 
            {size: bodyFontSize, x: xMargin + indent, y: pageData.y, font: pageData.italicFont}
        );
    }

    for(const modelGroup of detachment.modelGroups) {
        writeModelGroup(modelGroup, damageBoxes, pageData);
    }
}

function writeFormation(formation: Formation, damageBoxes: boolean, pageData: PageData) {
    decY(h2FontSize + gapSize, pageData);
    pageData.page.drawText(formation.armyListName + ", " + formation.formationName, {size: h2FontSize, font: pageData.font, x: xMargin, y: pageData.y});

    const pointsText = formation.points + " pts"
    const textWidth = pageData.font.widthOfTextAtSize(pointsText, h2FontSize);
    pageData.page.drawText(pointsText, {size: h2FontSize, font: pageData.font, x: pageData.width - xMargin - textWidth, y: pageData.y});

    let detailsText = "";
    if(formation.legionName != undefined && formation.legionName != "") {
        detailsText += "Legion: " + formation.legionName + ", breakpoint: ";
    } else 
        detailsText += "Breakpoint: ";
    detailsText += formation.breakPoint + ", activations: " + formation.activations;
    
    decY(h3FontSize + gapSize, pageData);
    pageData.page.drawText(detailsText, 
        {size: h3FontSize, x: xMargin, y: pageData.y}
    );

    const shape = getShapeForFormationName(formation.armyListName, formation.formationName);

    for(const [detachmentIndex, detachment] of formation.detachments.entries()) {
        const slotName = (shape.slotRequirements[detachmentIndex].displayName ?? detachment.slot)
        writeDetachment(formation, detachment, slotName, damageBoxes, pageData);
    }

    decY(lineGapSize, pageData);
    pageData.page.drawLine({
        start: {x: xMargin, y: pageData.y}, end: {x: pageData.width-xMargin, y: pageData.y}
    });
}

async function createPdf(army: Army, damageBoxes: boolean) {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    // Add a page to the PDFDocument
    const page = pdfDoc.addPage(PageSizes.A4);
    const {width, height} = page.getSize()

    let y = height - h1FontSize - topYMargin;

    page.drawText(army.name, {size: h1FontSize, font, x: xMargin, y});

    const pointsText = army.points.toString() + " pts";
    const textWidth = font.widthOfTextAtSize(pointsText, h1FontSize);
    page.drawText(pointsText, {size: h1FontSize, font, x: width - xMargin - textWidth, y});

    y -= h2FontSize + gapSize;
    page.drawText(army.allegiance + ", " + army.primaryArmyListName, {size: h2FontSize, font, x: xMargin, y});

    y -= h3FontSize + gapSize;
    const detailsText = "Activations: " + army.activations.toString() 
        + ", allied points: " + army.alliedPoints + "/" + (army.maxPoints * 0.3)
        + ", max points: " + army.maxPoints;
    page.drawText(
        detailsText, 
        {size: h3FontSize, x: xMargin, y}
    );

    if(!army.validationState.valid) {
        y -= bodyFontSize + gapSize;
        const errorText = "Army not valid! " + army.validationState.error;
        page.drawText(
            errorText, 
            {size: bodyFontSize, x: xMargin, y, color: errorColor}
        );
    }

    y -= lineGapSize;
    page.drawLine({
        start: {x: xMargin, y}, end: {x: width-xMargin, y}
    });

    const pageData = {y, width, height, pdfDoc, font, page, italicFont, pageNumber: 1};
    for(const formation of army.formations) {
        writeFormation(formation, damageBoxes, pageData)
    }

    drawPageNumber(pageData);

    const bytes = await pdfDoc.save();
    return bytes
}

export const handler: Handlers = {
  GET(req) {
    const url = URL.parse(req.url);
    if(url == null)
        return new Response("URL not valid", {status: 400});

    const encodedArmyString = url.searchParams.get("army") ?? "";
    if(encodedArmyString == "")
        return new Response("No army param", {status: 400});

    const damageBoxesString = url.searchParams.get("damageBoxes") ?? "false";
    let damageBoxes = false;
    if(damageBoxesString == "true")
        damageBoxes = true;

    const army = decodeBase64GzipJson<Army>(encodedArmyString);
    const fileName = army.name.trim().replace(/ +/g, '-').replace(/[^a-z0-9\-]/gi, '_').toLowerCase();
    return createPdf(army, damageBoxes).then((s)=>{
        return new Response(s, {
            status: 200,
            headers: {
                "content-type": "application/pdf",
                "content-disposition": "attachment; filename=\"" + fileName + ".pdf\"",
                "content-transfer-encoding": "binary"
            }
        }
    )});
  },
};
