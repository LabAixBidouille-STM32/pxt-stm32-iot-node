/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../built/common-sim.d.ts"/>
/// <reference path="../../libs/core/dal.d.ts"/>
/// <reference path="../../libs/core/enums.d.ts"/>
/// <reference path="../dalboard.ts"/>

namespace pxsim.visuals {
    export class BoardLed {
        private element: SVGElement;
        private colorOff = "#aaa"

        constructor(x: number, y: number, private colorOn: string, private pin: Pin, w: number, h: number) {
            this.element = svg.elt("rect", { x, y, width: w, height: h, fill: this.colorOff });
        }

        getElement() {
            return this.element;
        }

        updateTheme(colorOff: string, colorOn: string) {
            if (colorOff) {
                this.colorOff = colorOff;
            }
            if (colorOn) {
                this.colorOn = colorOn;
            }
        }

        updateState() {
            if (this.pin.value > 0) {
                this.element.setAttribute("fill", this.colorOn)
                svg.filter(this.element, `url(#neopixelglow)`);
            }
            else {
                this.element.setAttribute("fill", this.colorOff)
                svg.filter(this.element, null);
            }
        }
    }
}