/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../built/common-sim.d.ts"/>

namespace pxsim {
    export interface PressureBoard extends CommonBoard {
        pressureState: AnalogSensorState;
        pressureUnitState: PressureUnit;
    }

    export function pressureState(): AnalogSensorState {
        return (board() as PressureBoard).pressureState;
    }

    export function setPressureUnit(unit: PressureUnit) {
        (board() as PressureBoard).pressureUnitState = unit;
    }
}