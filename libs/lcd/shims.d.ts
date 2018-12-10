// Auto-generated. Do not edit.
declare namespace LCD {

    /**
     * set cursor position at given position
     * @param x is LCD column position, eg: 0
     * @param y is LCD row position, eg: 0
     */
    //% blockId="LCD_SET_CURSOR" 
    //% block="set cursor position |at x %x|y %y"
    //% weight=89 
    //% blockGap=8 
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    //% parts=LCD trackArgs=0 shim=LCD::setCursor
    function setCursor(x: uint8, y: uint8): void;

    /**
     * show a number in LCD at given position
     * @param n is number will be show, eg: 10, 100, 200
     */
    //% blockId="LCD_SHOW_NUMBER" 
    //% block="show number %n"
    //% weight=90 
    //% blockGap=8
    //% parts=LCD trackArgs=0 shim=LCD::ShowNumber
    function ShowNumber(n: uint32): void;

    /**
     * show a string in LCD at given position
     * @param s is string will be show, eg: "Hello"
     */
    //% blockId="LCD_SHOW_STRING" 
    //% block="show string %s"
    //% weight=90 
    //% blockGap=8
    //% parts=LCD trackArgs=0 shim=LCD::ShowString
    function ShowString(s: string): void;

    /**
     * show a name:value pair in LCD at given position
     * @param name : a string that is the name part of the name:value pair, eg: "x"
     * @param value : a number that is the value part of the name:value pair, eg: 0
     */
    //% blockId="LCD_SHOW_VALUE" 
    //% block="show value %name = %value"
    //% weight=90 
    //% blockGap=8
    //% parts=LCD trackArgs=0 shim=LCD::ShowValue
    function ShowValue(name: string, value: uint32): void;

    /**
     * clear all display content
     */
    //% blockId="LCD_CLEAR" 
    //% block="clear screen"
    //% weight=85 
    //% blockGap=8
    //% parts=LCD trackArgs=0 shim=LCD::clear
    function clear(): void;

    /**
     * set LCD backlight color
     * 
     * @param rgb RGB color of the backlight LED
     */
    //% blockId="LCD_BACKLIGHT_COLOR" 
    //% block="set backlight color %rgb=colorNumberPicker"
    //% weight=69
    //% blockGap=8
    //% group="Backlight" 
    //% parts=LCD trackArgs=0 shim=LCD::SetBacklightColor
    function SetBacklightColor(rgb: uint32): void;

    /**
     * turn on LCD backlight
     */
    //% blockId="LCD_BACKLIGHT_ON" 
    //% block="turn on backlight"
    //% group="Backlight"  
    //% weight=71 
    //% blockGap=8
    //% parts=LCD trackArgs=0 shim=LCD::BacklightOn
    function BacklightOn(): void;

    /**
     * turn off LCD backlight
     */
    //% blockId="LCD_BACKLIGHT_OFF" 
    //% block="turn off backlight"
    //% group="Backlight" 
    //% weight=70 
    //% blockGap=8
    //% parts=LCD trackArgs=0 shim=LCD::BacklightOff
    function BacklightOff(): void;

    /**
     * show a number in LCD at given position
     * @param n is number will be show, eg: 10, 100, 200
     * @param x is LCD column position, eg: 0
     * @param y is LCD row position, eg: 0
     */
    //% blockId="LCD_SHOW_NUMBER_AT_POS" 
    //% block="show number %n|at x %x|y %y"
    //% group="More" 
    //% weight=10 
    //% blockGap=8
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    //% parts=LCD trackArgs=0 shim=LCD::ShowNumberAtPos
    function ShowNumberAtPos(n: uint32, x: uint8, y: uint8): void;

    /**
     * show a string in LCD at given position
     * @param s is string will be show, eg: "Hello"
     * @param x is LCD column position, [0 - 15], eg: 0
     * @param y is LCD row position, [0 - 1], eg: 0
     */
    //% blockId="LCD_SHOW_STRING_AT_POS" 
    //% block="show string %s|at x %x|y %y"
    //% group="More" 
    //% weight=10 
    //% blockGap=8
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    //% parts=LCD trackArgs=0 shim=LCD::ShowStringAtPos
    function ShowStringAtPos(s: string, x: uint8, y: uint8): void;
}

// Auto-generated. Do not edit. Really.
