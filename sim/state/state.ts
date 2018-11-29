/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../built/common-sim.d.ts"/>

namespace pxsim {
    export interface HumidityBoard extends CommonBoard {
        humidityState: AnalogSensorState;
    }

    export function humidityState(): AnalogSensorState {
        return (board() as HumidityBoard).humidityState;
    }
}