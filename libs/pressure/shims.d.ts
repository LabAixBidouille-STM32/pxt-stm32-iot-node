// Auto-generated. Do not edit.
declare namespace input {

    /**
     * Run some code when the pressure changes from dry to wet, or from wet to dry.
     * @param condition the condition, wet or dry, the event triggers on
     * @param pressure the pressure at which this event happens, eg: 1013.25
     * @param unit the unit of the pressure
     */
    //% blockId=input_on_pressure_condition_changed block="on pressure %condition|at %pressure |%unit"
    //% help=input/on-pressure-condition-changed blockExternalInputs=0
    //% parts="pressure"
    //% group="More" weight=76 shim=input::onPressureConditionChanged
    function onPressureConditionChanged(condition: PressureCondition, pressure: int32, unit: PressureUnit, handler: () => void): void;

    /**
     * Get the relative pressure in percent.
     */
    //% help=input/pressure
    //% blockId=device_pressure block="pressure in %unit"
    //% parts="pressure"
    //% weight=26 shim=input::pressure
    function pressure(unit: PressureUnit): int32;
}

// Auto-generated. Do not edit. Really.
