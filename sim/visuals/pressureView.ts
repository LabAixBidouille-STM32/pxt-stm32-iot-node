/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../built/common-sim.d.ts"/>
/// <reference path="../../libs/core/dal.d.ts"/>

namespace pxsim{
    export class PressureState { 
        constructor(public pressureState: AnalogSensorState, public pressureUnit : PressureUnit) {
            
        }
    }
}

namespace pxsim.visuals {
    export class PressureView implements IBoardPart<PressureState> {
        public element: SVGElement;
        public svgEl: SVGSVGElement;
        public defs: SVGElement[];
        public style = BUTTON_PAIR_STYLE;
        private state: PressureState;
        private bus: EventBus;
        private btn: SVGGElement;

        private pressureGradient: SVGLinearGradientElement;
        private pressure: SVGRectElement;
        private pressureText: SVGTextElement;

        private static pmin = 980;
        private static pmax = 1050;

        public init(bus: EventBus, state: PressureState, svgEl: SVGSVGElement, otherParams: Map<string>) {
            this.state = state;
            this.bus = bus;
            this.defs = [];
            this.svgEl = svgEl;
            this.updateState();
            this.attachEvents();
        }

        public moveToCoord(xy: Coord) {
            let btnWidth = PIN_DIST * 3;
            let [x, y] = xy;
            translateEl(this.btn, [x, y])
        }

        public updateState() {
            let state = this.state;
            if (!state || !state.pressureState || !state.pressureState.sensorUsed) {
                if (this.pressure) {
                    this.svgEl.removeChild(this.element);
                    this.pressure = null;
                }
            } else if (state && state.pressureState && state.pressureState.sensorUsed) {
                this.mkPressure();
                this.svgEl.appendChild(this.element);
                this.updatePressure();
            }
        }

        getElement() {
            return this.element;
        }

        public updateTheme() {
            let On = "#77ff77";
            let Off = "#fff";
            svg.setGradientColors(this.pressureGradient, Off, On);
        }

        private mkPressure() {
            let svgEl = this.svgEl;
            let defs = <SVGDefsElement>svg.child(svgEl, "defs", {});
            let g = <SVGGElement>svg.elt("g");

            if (!this.pressure) {
                let gid = "gradient-pressure";
                this.pressureGradient = svg.linearGradient(defs, gid);
                let xBase = 250;
                let yBase = 3;
                this.pressure = <SVGRectElement>svg.child(g, "rect", {
                    class: "sim-pressure no-drag",
                    x: xBase,
                    y: yBase,
                    width: 10,
                    height: 64,
                    rx: 4, ry: 4,
                    fill: `url(#${gid})`
                });
                this.pressureText = svg.child(g, "text", { class: 'sim-text', x: xBase + 20, y: yBase + 20 }) as SVGTextElement;
                this.updateTheme();

                let pt = svgEl.createSVGPoint();
                svg.buttonEvents(this.pressure,
                    // move
                    (ev) => {
                        let cur = svg.cursorPoint(pt, svgEl, ev);
                        let t = Math.max(0, Math.min(1, (35 - cur.y) / 30))
                        this.state.pressureState.setLevel(Math.floor(PressureView.pmin + t * (PressureView.pmax - PressureView.pmin)));
                        this.updatePressure();
                    },
                    // start
                    ev => { },
                    // stop
                    ev => { },
                    // keydown
                    (ev) => {
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            if (this.state.pressureState.getLevel() === PressureView.pmin) {
                                this.state.pressureState.setLevel(PressureView.pmax);
                            } else {
                                this.state.pressureState.setLevel(this.state.pressureState.getLevel() - 1);
                            }
                            this.updatePressure();
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            if (this.state.pressureState.getLevel() === PressureView.pmax) {
                                this.state.pressureState.setLevel(PressureView.pmin);
                            } else {
                                this.state.pressureState.setLevel(this.state.pressureState.getLevel() + 1);
                            }
                            this.updatePressure();
                        }
                    });

                accessibility.makeFocusable(this.pressure);
                accessibility.setAria(this.pressure, "slider", "Pressure");
                this.pressure.setAttribute("aria-valuemin", PressureView.pmin.toString());
                this.pressure.setAttribute("aria-valuemax", PressureView.pmax.toString());
                this.pressure.setAttribute("aria-orientation", "vertical");
            }
            this.element = g;
        }

        private attachEvents() {
        }

        private updatePressure() {
            let state = this.state;
            if (!state || !state.pressureState || !state.pressureState.sensorUsed)
                return;
            
            let t = Math.max(PressureView.pmin, Math.min(PressureView.pmax, state.pressureState.getLevel()))
            let per = Math.floor((state.pressureState.getLevel() - PressureView.pmin) / (PressureView.pmax - PressureView.pmin) * 100)
            svg.setGradientValue(this.pressureGradient, 100 - per + "%");

            let unit = " hPa";
            if (state.pressureUnit == pxsim.PressureUnit.mBar) {
                unit = " mBar";
            }
            this.pressureText.textContent = t + unit;
            this.pressure.setAttribute("aria-valuenow", t.toString());
            this.pressure.setAttribute("aria-valuetext", t + unit);
            accessibility.setLiveContent(t + unit);
        }
    }
}