import { PageProps } from "$fresh/server.ts";
import { ModelType } from "../../game/types.ts";
import { getStatsForModelType } from "../../game/lists.ts";

export default function Unit(props: PageProps) {
  const stats = getStatsForModelType(props.params.unitid as ModelType);
  if(stats) {
    const saveHeaders = stats.unitStats.saves.map(s=><td>{s.saveType}</td>);
    const saves = stats.unitStats.saves.map(s=><td>{s.save.toString() + "+"}</td>);
    const weapons = stats.weaponStats.map((w)=><tr>
      <td>{w.name}</td>
      <td>{w.arc}</td>
    </tr>)
    return <div>
      <h1>{props.params.unitid}</h1>
      <div>
        <table>
          <thead>
            <tr>
              <td>Type</td>
              <td>Scale</td>
              <td>Advance</td>
              <td>Charge</td>
              <td>March</td>
              {saveHeaders}
              <td>CAF</td>
              <td>Morale</td>
              <td>W</td>
              <td>Tac. Str.</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{stats.unitStats.unitType}</td>
              <td>{stats.unitStats.scale}</td>
              <td>{stats.unitStats.advance}</td>
              <td>{stats.unitStats.charge}</td>
              <td>{stats.unitStats.march}</td>
              {saves}
              <td>{(stats.unitStats.caf >= 0)?("+" + stats.unitStats.caf.toString()):stats.unitStats.caf}</td>
              <td>{stats.unitStats.morale.toString() + "+"}</td>
              <td>{stats.unitStats.wounds}</td>
              <td>{stats.unitStats.tacticalStrength}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
      <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Arc</td>
            </tr>
          </thead>
          <tbody>
            {weapons}
          </tbody>
        </table>
      </div>
    </div>
  } else {
    return <div>No stats for: {props.params.unitid}</div>;
  }
}