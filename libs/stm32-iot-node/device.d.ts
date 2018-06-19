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
    const D2: PwmPin;
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
    //% fixedInstance shim=pxt::getPin(PIN_LED2)
    const LED2: PwmPin;

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
     * Button connecting A0 to GND.
     */
    //% block="button A0" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_A0,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonA0: Button;

    /**
     * Button connecting A1 to GND.
     */
    //% block="button A1" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_A1,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonA1: Button;

    /**
     * Button connecting A2 to GND.
     */
    //% block="button A2" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_A2,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonA2: Button;

    /**
     * Button connecting A3 to GND.
     */
    //% block="button A3" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_A3,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonA3: Button;

    /**
     * Button connecting A4 to GND.
     */
    //% block="button A4" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_A4,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonA4: Button;

    /**
     * Button connecting A5 to GND.
     */
    //% block="button A5" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_A5,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonA5: Button;

    /**
     * Button connecting D0 to GND.
     */
    //% block="button D0" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_D0,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonD0: Button;

    /**
     * Button connecting D1 to GND.
     */
    //% block="button D1" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_D1,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonD1: Button;

    /**
     * Button connecting D2 to GND.
     */
    //% block="button D2" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_D2,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonD2: Button;

    /**
     * Button connecting D3 to GND.
     */
    //% block="button D3" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_D3,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonD3: Button;

    /**
     * Button connecting D4 to GND.
     */
    //% block="button D4" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_D4,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonD4: Button;

    /**
     * Button connecting D5 to GND.
     */
    //% block="button D5" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_D5,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonD5: Button;

    /**
     * Button connecting D6 to GND.
     */
    //% block="button D6" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_D6,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonD6: Button;

    /**
     * Button connecting D7 to GND.
     */
    //% block="button D7" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_D7,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonD7: Button;

    /**
     * Button connecting D8 to GND.
     */
    //% block="button D8" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_D8,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonD8: Button;

    /**
     * Button connecting D9 to GND.
     */
    //% block="button D9" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_D9,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonD9: Button;

    /**
     * Button connecting D10 to GND.
     */
    //% block="button D10" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_D10,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonD10: Button;

    /**
     * Button connecting D11 to GND.
     */
    //% block="button D11" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_D11,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonD11: Button;

    /**
     * Button connecting D12 to GND.
     */
    //% block="button D12" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_D12,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonD12: Button;

    /**
     * Button connecting D13 to GND.
     */
    //% block="button D13" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_D13,BUTTON_ACTIVE_LOW_PULL_UP)
    const buttonD13: Button;

    /**
     * Button connecting BUTTON_USER to GND.
     */
    //% block="button BUTTON_USER" fixedInstance
    //% shim=pxt::getButtonByPin(PIN_BTN_A,BUTTON_ACTIVE_LOW_PULL_UP)
    const btn_A: Button;
}

