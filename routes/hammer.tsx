import { PageProps } from "$fresh/server.ts";
import { getStatsForModelType } from "../game/lists.ts";
import { HitResultOutcome, shoot, ShootResultOutcome } from "../game/mathHammer.ts";
import { Arc, ModelType } from "../game/types.ts";
import { WeaponType } from "../game/weaponTypes.ts";


type HammerResultTableProps = {
    resultTable: ShootResultOutcome[]
};

const ResultTable = (props: HammerResultTableProps) => {
    return <table class="border-collapse border text-sm">
        <thead>
            <tr class="border-b-2 border-gray-400 font-bold bg-gray-100">
                <td class="w-16">W</td>
                <td class="w-16">%</td>
            </tr>
        </thead>
        <tbody>

        {props.resultTable.map((ssr, i)=>{
            return <tr key={i}><td>{ssr.wounds}</td><td>{Math.round(ssr.fraction*10000)/100}</td></tr>
        })}
        </tbody>
    </table>
}

type HammerAimTableProps = {
    resultTable: HitResultOutcome[]
};

const AimTable = (props: HammerAimTableProps) => {
    return <table class="border-collapse border text-sm">
        <thead>
            <tr class="border-b-2 border-gray-400 font-bold bg-gray-100">
                <td class="w-16">Hits</td>
                <td class="w-16">%</td>
            </tr>
        </thead>
        <tbody>

        {props.resultTable.map((ssr)=>{
            return <tr><td>{ssr.hits}</td><td>{Math.round(ssr.fraction*10000)/100}</td></tr>
        })}
        </tbody>
    </table>
}

export default function Hammer(props: PageProps) {
    const shooterModelType = props.url.searchParams.get("shooterModelType") ?? "";
    if(shooterModelType == "") {
        return <div>Missing shooter model type</div>
    }

    const additionalShooterWeapons = (props.url.searchParams.getAll("additionalShooterWeapon") ?? []) as WeaponType[];

    const targetModelType: ModelType = (props.url.searchParams.get("targetModelType") ?? "Tactical Legionaries") as ModelType;

    const targetArc = (props.url.searchParams.get("targetArc") ?? "Front") as Arc;
    const rangeString = (props.url.searchParams.get("range") ?? "8");
    const range = parseInt(rangeString);

    const haveTargetStats = getStatsForModelType(targetModelType) != undefined;

    const shootResults = shoot(
        shooterModelType, additionalShooterWeapons, targetModelType, targetArc, range
    );

    return <div class="flex flex-row justify-center mt-8">
        <div>
        <h1 class="text-xl">Maths Hammer</h1>
    
        <div>
            <div class="font-medium text-lg bg-gray-100 border-b-2 border-gray-400">Scenario</div>
            <div><span class="font-medium">Shooter</span> <a href={"/unit/"+shooterModelType} target="_blank" class="hover:underline">
                {shooterModelType}</a>
            </div>
            <div>
            {(additionalShooterWeapons.length > 0)?
            (<div><span class="font-medium">Optional loadout</span> {additionalShooterWeapons.join(", ")}</div>):" "} 
            </div>
            <div>
                <span class="font-medium">Target</span> <a href={"/unit/"+targetModelType} target="_blank" class="hover:underline">{targetModelType}</a> 
            </div> 
            <div><span class="font-medium">Target Arc</span> {targetArc} </div> 
            <div><span class="font-medium">Range</span> {range} </div> 
        </div>
        {
            (haveTargetStats && shootResults != undefined)?(
                
                <div>
                    <div class="font-medium text-lg bg-gray-100 border-b-2 border-gray-400">Individual results</div>
                    {
                    shootResults.individualResults.map(
                        (sr)=> <div class="border-b-4 border-white"> {
                                (sr === undefined) ?
                                ( <div>No data for weapon</div> )
                                :
                                (<div><span class="font-medium">{sr.weaponType}</span>
                                    <div>Dice: {sr.dice}</div>
                                    <div>Hit table
                                        <AimTable resultTable={sr.hitTable}></AimTable>
                                    </div>
                                    <div>
                                    Wound: {Math.round(sr.damageFraction*10000)/100}%
                                    Save Type: {sr.saveType}
                                    </div>
                                    <div>
                                        Result table
                                        <ResultTable resultTable={sr.resultTable}></ResultTable>
                                    </div>
                                    {(sr.notes.length >0)?(<div class="text-sm">Notes: {sr.notes.join("\n")}</div>):("")}
                                    
                                </div>)
                        } </div>
                    )
                }
                <div class="font-medium text-lg bg-gray-100 border-b-2 border-gray-400">Net results</div>
                    <ResultTable resultTable={shootResults.netResults}></ResultTable>
                </div>
            ):("No stats for target in system yet, sorry")
        }
    </div></div>
}