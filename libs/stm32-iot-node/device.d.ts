declare namespace pins {
    //% fixedInstance shim=pxt::getPin(PIN_A0)
    const A0: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_A1)
    const A1: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_A2)
    const A2: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_A3)
    const A3: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_A4)
    const A4: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_A5)
    const A5: PwmPin;

    //% fixedInstance shim=pxt::getPin(PIN_D0)
    const D0: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_D1)
    const D1: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_D2)
    const D2: DigitalPin;
    //% fixedInstance shim=pxt::getPin(PIN_D3)
    const D3: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_D4)
    const D4: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_D5)
    const D5: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_D6)
    const D6: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_D7)
    const D7: PwmPin;

    //% fixedInstance shim=pxt::getPin(PIN_D8)
    const D8: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_D9)
    const D9: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_D10)
    const D10: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_D11)
    const D11: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_D12)
    const D12: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_D13)
    const D13: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_LED)
    const LED: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_RX)
    const RX: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_TX)
    const TX: PwmPin;
    //% fixedInstance shim=pxt::getPin(PIN_MISO)
    const MISO: DigitalPin;
    //% fixedInstance shim=pxt::getPin(PIN_MOSI)
    const MOSI: DigitalPin;
    //% fixedInstance shim=pxt::getPin(PIN_SCK)
    const SCK: DigitalPin;
    //% fixedInstance shim=pxt::getPin(PIN_SCL)
    const SCL: DigitalPin;
    //% fixedInstance shim=pxt::getPin(PIN_SDA)
    const SDA: DigitalPin;
}


declare namespace input {
    /**
     * Button connecting BUTTON_USER to GND.
     */
    //% block="button BUTTON_USER" fixedInstance
    //% shim=pxt::getButton(0)
    const btn_A: Button;
}
