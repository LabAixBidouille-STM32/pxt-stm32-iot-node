/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../node_modules/pxt-core/localtypings/pxtarget.d.ts"/>
/// <reference path="../../built/common-sim.d.ts"/>
namespace pxsim {
    export enum PressureUnit {
        HectoPascal = 0,
        mBar = 1,
    }
}

namespace pxsim.input {
    export function onPressureConditionChanged(condition: number, pressure: number, unit: PressureUnit, body: RefAction) {
        let b = pressureState();
        b.setUsed();

        const t = pressure;
        
        if (condition === DAL.ANALOG_THRESHOLD_HIGH) {
            b.setHighThreshold(t);
        }
        else {
            b.setLowThreshold(t);
        }
        pxtcore.registerWithDal(b.id, condition, body);
    }

    
    export function pressure(unit: PressureUnit): number {
        let b = pressureState();
        b.setUsed();
        const pressure = b.getLevel();
        return pressure ;
    }
}