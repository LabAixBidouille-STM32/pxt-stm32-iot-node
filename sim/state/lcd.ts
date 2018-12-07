/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../node_modules/pxt-core/localtypings/pxtarget.d.ts"/>
/// <reference path="../../built/common-sim.d.ts"/>
namespace pxsim.LCD {
    export function setCursor(x: number, y: number) {
        let b = lcdState();
        if (y < b.lines && y >= 0)
            b.cursor[0] = y;
        if (x < b.columns && x >= 0)
            b.cursor[1] = x;
        else if (x >= b.columns)
            b.cursor[1] = b.columns;  
        b.setUsed();
    }

    export function ShowNumber(n: number) {
        ShowString("" + n);
    }

    export function ShowValue(name: string, value: number) {
        ShowString( name + ":" + value);
    }

    export function ShowString(s: string) {
        let b = lcdState();
        b.setUsed();

        if (b.cursor[0] >= b.lines || b.cursor[0] < 0)
            return;
            
        if (b.cursor[1] >= b.columns || b.cursor[1] < 0)
            return;

        b.text[b.cursor[0]] = b.text[b.cursor[0]].substring(0, b.cursor[1]) + s + b.text[b.cursor[0]].substring(b.cursor[1] + s.length, b.columns);
        b.cursor[1] += s.length;
        runtime.queueDisplayUpdate()
    }

    export function clear() {
        let b = lcdState();
        b.text[0] = "                ";
        b.text[1] = "                ";
        b.setUsed();
    }

    export function SetBacklightColor(rgb: number) {
        let b = lcdState();
        b.backLightColor = RGBColorToHtmlColor(rgb);
        b.setUsed();
    }

    export function BacklightOn() {
        let b = lcdState();
        b.backLightColor = "#A0F7F7";
        b.setUsed();

    }

    export function BacklightOff() {
        let b = lcdState();
        b.backLightColor = "#6e7d6e";
        b.setUsed();
    }

    export function ShowNumberAtPos(n: number, x: number, y: number) {
        setCursor(x, y);
        ShowNumber(n);
        runtime.queueDisplayUpdate()
    }

    export function ShowStringAtPos(s: string, x: number, y: number) {
        setCursor(x, y);
        ShowString(s);
        runtime.queueDisplayUpdate()

    }

    function RGBColorToHtmlColor(rgb: number): string {
        let red = unpackR(rgb);
        let green = unpackG(rgb);
        let blue = unpackB(rgb);
        let html = "#" +
            (red > 10 ? red.toString(16) : "0" + red.toString(16)) +
            (green > 10 ? green.toString(16) : "0" + green.toString(16)) +
            (blue > 10 ? blue.toString(16) : "0" + blue.toString(16));
        return html;
    }

    function unpackR(rgb: number): number {
        let r = (rgb >> 16) & 0xFF;
        return r;
    }
    function unpackG(rgb: number): number {
        let g = (rgb >> 8) & 0xFF;
        return g;
    }
    function unpackB(rgb: number): number {
        let b = (rgb >> 0) & 0xFF;
        return b;
    }

}