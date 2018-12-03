#include "pxt.h"
#include "target_pressure.h"

enum class PressureCondition {
    //% block="high"
    High = ANALOG_THRESHOLD_HIGH,
    //% block="low"
    Low = ANALOG_THRESHOLD_LOW
};

enum class PressureUnit {
    //% block="hPa"
    HectoPascal,
    //% block="mBar"
    mBar
};

namespace pxt {
SINGLETON(WPres);
}

namespace input {

/**
* Run some code when the pressure changes from dry to wet, or from wet to dry.
* @param condition the condition, wet or dry, the event triggers on
* @param pressure the pressure at which this event happens, eg: 1013.25
* @param unit the unit of the pressure
*/
//% blockId=input_on_pressure_condition_changed block="on pressure %condition|at %pressure |%unit"
//% help=input/on-pressure-condition-changed blockExternalInputs=0
//% parts="pressure"
//% group="More" weight=76
void onPressureConditionChanged(PressureCondition condition, int pressure, PressureUnit unit, Action handler) {
    auto sensor = &getWPres()->sensor;
    sensor->updateSample();

    float t = pressure;

    if (condition == PressureCondition::Low)
        sensor->setLowThreshold(t);
    else
        sensor->setHighThreshold(t);
    registerWithDal(sensor->id, (int)condition, handler);
}

/**
 * Get the relative pressure in percent.
 */
//% help=input/pressure
//% blockId=device_pressure block="pressure in %unit"
//% parts="pressure"
//% weight=26
int pressure(PressureUnit unit) {
    return (int) getWPres()->sensor.getValue();
}
}
