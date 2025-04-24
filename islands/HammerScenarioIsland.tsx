import { createContext } from "preact";
import { createHammerScenarioState, HammerScenarioStateType } from "../state/hammerScenarioState.ts";
import { HammerScenario } from "../components/HammerScenario.tsx";

export const HammerScenarioState = createContext<HammerScenarioStateType>({} as HammerScenarioStateType);

export type HammerScenarioIslandProps = {
    urlString: string
};

export function HammerScenarioIsland(props: HammerScenarioIslandProps) {
    return <div className="HammerScenario" >
        <HammerScenarioState.Provider value={createHammerScenarioState(props.urlString)}>
            <HammerScenario/>
        </HammerScenarioState.Provider>
    </div>
}