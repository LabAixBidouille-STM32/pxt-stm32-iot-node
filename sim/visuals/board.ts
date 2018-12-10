
/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../built/common-sim.d.ts"/>
/// <reference path="../../libs/core/dal.d.ts"/>
/// <reference path="../dalboard.ts"/>

namespace pxsim.visuals {
    const svg = pxsim.svg;

    export const VIEW_WIDTH = 375;
    export const VIEW_HEIGHT = 375;
    const TOP_MARGIN = 20;
    const MID_MARGIN = 40;
    const BOT_MARGIN = 20;
    const PIN_LBL_SIZE = PIN_DIST * 0.7;
    const PIN_LBL_HOVER_SIZE = PIN_LBL_SIZE * 1.5;
    const SQUARE_PIN_WIDTH = PIN_DIST * 0.66666;
    const SQUARE_PIN_HOVER_WIDTH = PIN_DIST * 0.66666 + PIN_DIST / 3.0;

    const STYLE = `
.sim-board-pin {
    stroke: #404040;
    fill: #000000;
}

.sim-reset-btn {
    stroke: #404040;
    fill: #000000;
}

.sim-reset-btn:active {
    stroke: #404040;
    fill: #FFA500;
}

.sim-user-btn {
    stroke: #404040;
    fill: #0047bb;
}

.sim-user-btn:active {
    stroke: #404040;
    fill: #FFA500;
}
.sim-thermometer {
    stroke:#aaa;
    stroke-width: 1px;
}

.sim-text {
    font-family:"Lucida Console", Monaco, monospace;
    font-size:16px;
    fill:#fff;
    pointer-events: none; user-select: none;
}

*:focus {
    outline: none;
}
.sim-button-outer:focus,
.sim-slide-switch:focus,
.sim-pin:focus,
.sim-thermometer:focus,
.sim-button-group:focus .sim-button-outer,
.sim-light-level-button:focus,
.sim-sound-level-button:focus {
    stroke: #4D90FE;
    stroke-width: 2px !important;
 }

`
    export interface IBoardTheme {
        accent?: string;
        display?: string;
        pin?: string;
        pinTouched?: string;
        pinActive?: string;
        ledOn?: string;
        ledOff?: string;
        buttonOuter?: string;
        buttonUps: string[];
        buttonDown?: string;
        virtualButtonOuter?: string;
        virtualButtonUp?: string;
        virtualButtonDown?: string;
        lightLevelOn?: string;
        lightLevelOff?: string;
        soundLevelOn?: string;
        soundLevelOff?: string;
    }

    export var themes: IBoardTheme[] = ["#3ADCFE"].map(accent => {
        return {
            accent: accent,
            pin: "#D4AF37",
            pinTouched: "#FFA500",
            pinActive: "#FF5500",
            ledOn: "#ff7777",
            ledOff: "#fff",
            buttonOuter: "#979797",
            buttonUps: ["#000", "#000", "#000"],
            buttonDown: "#FFA500",
            virtualButtonDown: "#FFA500",
            virtualButtonOuter: "#333",
            virtualButtonUp: "#fff",
            lightLevelOn: "yellow",
            lightLevelOff: "#555",
            soundLevelOn: "#7f8c8d",
            soundLevelOff: "#555",
        }
    });

    export function randomTheme(): IBoardTheme {
        return themes[Math.floor(Math.random() * themes.length)];
    }

    export type ComputedBoardDimensions = {
        scaleFn: (n: number) => number,
        height: number,
        width: number,
        xOff: number,
        yOff: number
    };

    export function getBoardDimensions(vis: BoardImageDefinition): ComputedBoardDimensions {
        let scaleFn = (n: number) => n * (PIN_DIST / vis.pinDist);
        let width = scaleFn(vis.width);
        return {
            scaleFn: scaleFn,
            height: scaleFn(vis.height),
            width: width,
            xOff: (VIEW_WIDTH - width) / 2.0,
            yOff: TOP_MARGIN
        }
    }

    export interface MetroBoardProps extends GenericBoardProps {
        runtime?: pxsim.Runtime;
        theme?: IBoardTheme;
        disableTilt?: boolean;
    }

    export class MetroBoardSvg extends GenericBoardSvg {
        public board: pxsim.DalBoard;

        private shakeButton: SVGCircleElement;
        private shakeText: SVGTextElement;


        private onBoardLeds: BoardLed[];
        private onBoardNeopixel: BoardNeopixel;
        private onBoardButtonReset: BoardButton;
        private onBoardButtonUser: BoardButton;
        private onBoardThermometer: pxsim.visuals.ThermometerView;
        private onBoardHumidity: pxsim.visuals.HumidityView;
        private onBoardPressure: pxsim.visuals.PressureView;
        private onBoardDistance: pxsim.visuals.DistanceView;
        

        constructor(public props: MetroBoardProps) {
            super(props);
            const el = this.getView().el;
            this.addDefs(el);

            this.onBoardLeds = []

            for (let l of props.visualDef.leds || []) {
                if (l.color == "neopixel") {
                    this.onBoardNeopixel = new BoardNeopixel(l.x, l.y, l.w || 9);
                    el.appendChild(this.onBoardNeopixel.getElement());
                } else {
                    let bl = new BoardLed(l.x, l.y, l.color, pinByName(l.label),
                        l.w || 9, l.h || 8)
                    this.onBoardLeds.push(bl)
                    el.appendChild(bl.getElement())
                }
            }

            if (props.visualDef.reset) {
                this.onBoardButtonReset = new BoardButtonReset(props.visualDef.reset.x, props.visualDef.reset.y, props.visualDef.reset.h);
                el.appendChild(this.onBoardButtonReset.getElement());
            }

            this.onBoardButtonUser = new BoardButtonUser(43.3, 173.8, props.visualDef.reset.h);
            el.appendChild(this.onBoardButtonUser.getElement());

            this.onBoardThermometer = new ThermometerView();
            this.onBoardHumidity = new HumidityView();
            this.onBoardPressure = new PressureView();
            this.onBoardDistance = new DistanceView();

            if (props && props.theme)
                this.updateTheme();

            if (props && props.runtime) {
                this.board = this.props.runtime.board as pxsim.DalBoard;
                this.board.updateSubscribers.push(() => this.updateState());
                this.updateState();
            }

            this.onBoardThermometer.init(this.board.bus, new ThermometerState(this.board.thermometerState, this.board.thermometerUnitState), el, null);
            this.onBoardHumidity.init(this.board.bus, new HumidityState(this.board.humidityState), el, null);
            this.onBoardPressure.init(this.board.bus, new PressureState(this.board.pressureState, this.board.pressureUnitState), el, null);
            this.onBoardDistance.init(this.board.bus, new DistanceState(this.board.distanceState, this.board.distanceUnitState), el, null);

        }

        public updateTheme() {
            let theme = this.props.theme;
            if (this.shakeButton) svg.fill(this.shakeButton, theme.virtualButtonUp);

        }

        public updateState() {
            let state = this.board;
            if (!state) return;
            
            this.onBoardLeds.forEach(l => l.updateState());
            const neopixelState = this.board.neopixelState(this.board.defaultNeopixelPin().id)
            if (neopixelState.buffer) {
                const rgb = neopixelState.pixelColor(0)
                if (rgb) {
                    this.onBoardNeopixel.setColor(rgb as any);
                }
            }

            this.onBoardButtonReset.updateState();
            this.onBoardThermometer.updateState();
            this.onBoardHumidity.updateState();
            this.onBoardPressure.updateState();
            this.onBoardDistance.updateState();
            this.updateGestures();
        }

        private updateGestures() {
            let state = this.board;
            if (state.accelerometerState.useShake && !this.shakeButton) {
                const el = this.getView().el;
                this.shakeButton = svg.child(el, "circle", { cx: 230, cy: 30, r: 16.5, class: "sim-shake" }) as SVGCircleElement;
                accessibility.makeFocusable(this.shakeButton);
                svg.fill(this.shakeButton, this.props.theme.virtualButtonUp)
                pointerEvents.down.forEach(evid => this.shakeButton.addEventListener(evid, ev => {
                    let state = this.board;
                    svg.fill(this.shakeButton, this.props.theme.buttonDown);
                }));
                this.shakeButton.addEventListener(pointerEvents.leave, ev => {
                    let state = this.board;
                    svg.fill(this.shakeButton, this.props.theme.virtualButtonUp);
                })
                this.shakeButton.addEventListener(pointerEvents.up, ev => {
                    let state = this.board;
                    svg.fill(this.shakeButton, this.props.theme.virtualButtonUp);
                    this.board.bus.queue(DAL.DEVICE_ID_GESTURE, 11); // GESTURE_SHAKE
                })
                accessibility.enableKeyboardInteraction(this.shakeButton, undefined, () => {
                    this.board.bus.queue(DAL.DEVICE_ID_GESTURE, 11);
                });
                accessibility.setAria(this.shakeButton, "button", "Shake the board");
                this.shakeText = svg.child(el, "text", { x: 250, y: 40, class: "sim-text" }) as SVGTextElement;
                this.shakeText.textContent = "SHAKE"
            }
        }

        private addDefs(el: SVGElement) {
            const defs = svg.child(el, "defs", {});

            let neopixelglow = svg.child(defs, "filter", { id: "neopixelglow", x: "-200%", y: "-200%", width: "400%", height: "400%" });
            svg.child(neopixelglow, "feGaussianBlur", { stdDeviation: "4.3", result: "coloredBlur" });
            let neopixelmerge = svg.child(neopixelglow, "feMerge", {});
            svg.child(neopixelmerge, "feMergeNode", { in: "coloredBlur" })
            svg.child(neopixelmerge, "feMergeNode", { in: "SourceGraphic" })

            const style = svg.child(el, "style", {});
            style.textContent = STYLE;
        }
    }
}
