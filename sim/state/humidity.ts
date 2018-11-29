/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../node_modules/pxt-core/localtypings/pxtarget.d.ts"/>
/// <reference path="../../built/common-sim.d.ts"/>

namespace pxsim.input {

    export function humidity(): number {
        let b = humidityState();
        b.setUsed();
        const humidity = b.getLevel();
        return humidity ;
    }

    export function onHumidityConditionChanged(condition: number, humidity: number, body: RefAction) {
        let b = humidityState();
        b.setUsed();

        const t = humidity;
        
        if (condition === DAL.ANALOG_THRESHOLD_HIGH) {
            b.setHighThreshold(t);
        }
        else {
            b.setLowThreshold(t);
        }
        pxtcore.registerWithDal(b.id, condition, body);
    }
}