import { PageProps } from "$fresh/server.ts";
import { getStatsForModelName } from "../game/lists.ts";
import {
  HitResultOutcome,
  shoot,
  ShootResultOutcome,
} from "../game/mathHammer.ts";
import { ModelName, SaveArc } from "../game/types.ts";
import { WeaponType } from "../game/weaponTypes.ts";
import { HammerScenarioIsland } from "../islands/HammerScenarioIsland.tsx";

type HammerResultTableProps = {
  resultTable: ShootResultOutcome[];
};

const ResultTable = (props: HammerResultTableProps) => {
  return (
    <table class="border-collapse border text-sm">
      <thead>
        <tr class="border-b-2 border-gray-400 font-bold bg-gray-100">
          <td class="w-16">W</td>
          <td class="w-16">%</td>
        </tr>
      </thead>
      <tbody>
        {props.resultTable.map((ssr, i) => {
          return (
            <tr key={i}>
              <td>{ssr.wounds}</td>
              <td>{Math.round(ssr.fraction * 10000) / 100}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

type HammerAimTableProps = {
  resultTable: HitResultOutcome[];
};

export default function Hammer(props: PageProps) {
  const shooterModelType = props.url.searchParams.get("shooter") ??
    "Tactical Legionaries";
  const shooterStats = getStatsForModelName(shooterModelType);
  if (shooterStats == undefined) {
    return <div>Missing shooter stats</div>;
  }

  const loadoutStrings = props.url.searchParams.getAll("loadout") ?? [];
  const loadoutsFromUrl = loadoutStrings.map((s) => {
    const bits = s.split(":");
    return { name: bits[0], loadout: bits[1] };
  });
  const additionalShooterWeapons: WeaponType[] = [];
  for (const statsSlot of shooterStats.modelLoadoutSlots) {
    if (statsSlot.name == "") {
      continue;
    }

    const loadoutFromUrl = loadoutsFromUrl.find((s) =>
      s.name == statsSlot.name
    );
    if (loadoutFromUrl == undefined) {
      if (statsSlot.possibleModelLoadouts[0].weaponTypes != undefined) {
        additionalShooterWeapons.push(
          ...statsSlot.possibleModelLoadouts[0].weaponTypes,
        );
      } else {
        additionalShooterWeapons.push(
          statsSlot.possibleModelLoadouts[0].loadout as WeaponType,
        );
      }
    } else {
      const statsLoadout = statsSlot.possibleModelLoadouts.find((s) =>
        s.loadout == loadoutFromUrl.loadout
      );
      if (statsLoadout != undefined) {
        if (statsLoadout.weaponTypes != undefined) {
          additionalShooterWeapons.push(...statsLoadout.weaponTypes);
        } else {
          additionalShooterWeapons.push(statsLoadout.loadout as WeaponType);
        }
      }
    }
  }

  const targetModelType: ModelName = (props.url.searchParams.get("target") ??
    "Tactical Legionaries") as ModelName;

  const targetArc =
    (props.url.searchParams.get("targetArc") ?? "Front") as SaveArc;
  const rangeString = props.url.searchParams.get("range") ?? "8";
  const range = parseInt(rangeString);

  const haveTargetStats = getStatsForModelName(targetModelType) != undefined;
  if (!haveTargetStats) {
    return <div>Missing target stats</div>;
  }

  const shootResults = shoot(
    shooterModelType,
    additionalShooterWeapons,
    targetModelType,
    targetArc,
    range,
  );
  if (shootResults == undefined) {
    return <div>Can't calculate</div>;
  }

  return (
    <div class="flex flex-row justify-center mt-8">
      <div>
        <h1 class="text-xl">Maths Hammer</h1>
        <p class="text-sm">Not all weapons are in the system yet.</p>
        <p class="text-sm">Some exotic weapons may be incorrect.</p>
        <HammerScenarioIsland urlString={props.url.toString()} />
        {
          <div>
            <div class="font-medium text-lg bg-gray-100 border-b-2 border-gray-400 mt-8">
              Net results
            </div>
            Wounds: {shootResults.netResults.reduce((a, s) =>
              a + s.fraction * s.wounds, 0).toFixed(2)}
            <ResultTable resultTable={shootResults.netResults}></ResultTable>
            <div class="font-medium text-lg bg-gray-100 border-b-2 border-gray-400 mt-8">
              Individual results
            </div>
            {shootResults.individualResults.map(
              (sr, i) => (
                <div key={i} class="mb-4">
                  {(sr === undefined) ? <div>No data for weapon</div> : (
                    <div>
                      <div class="font-medium">{sr.weaponType}</div>
                      Wounds: {sr.resultTable.reduce((a, s) =>
                        a + s.fraction * s.wounds, 0).toFixed(2)}
                      <ResultTable resultTable={sr.resultTable}></ResultTable>
                      
                      {(sr.notes.length > 0)
                        ? (
                          <div class="text-sm">
                            Notes: {sr.notes.join("\n")}
                          </div>
                        )
                        : ("")}
                    </div>
                  )}
                </div>
              ),
            )}
            <div hidden={shootResults.unknownWeapons.length == 0}>
              <div class="font-medium text-lg bg-gray-100 border-b-2 border-gray-400 mt-8">
                Weapons without stats
              </div>
              {shootResults.unknownWeapons.map((uw, i) => (
                <div key={i} class="border-b-4 border-white">{uw}</div>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
}
