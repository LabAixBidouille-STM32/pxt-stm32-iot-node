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

        private onBoardLeds: BoardLed[];
        private onBoardNeopixel: BoardNeopixel;
        private onBoardReset: BoardButton;
        private onBoardUser: BoardButton;

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
                this.onBoardReset = new BoardButtonReset(props.visualDef.reset.x, props.visualDef.reset.y, props.visualDef.reset.h);
                el.appendChild(this.onBoardReset.getElement());
            }

            this.onBoardUser = new BoardButtonUser(43.3, 173.8, props.visualDef.reset.h);
            el.appendChild(this.onBoardUser.getElement());


            if (props && props.theme)
                this.updateTheme();

            if (props && props.runtime) {
                this.board = this.props.runtime.board as pxsim.DalBoard;
                this.board.updateSubscribers.push(() => this.updateState());
                this.updateState();
            }
        }

        public updateTheme() {
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
            this.onBoardReset.updateState();
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

    class BoardButton extends CommonButton {
        private element: SVGElement;
        constructor(pinId: number, x: number, y: number, r: number, styleClass: string, label: string) {
            
            const txtSize = PIN_DIST * 1.3;
            const txtXOff = PIN_DIST / 7;
            const txtYOff = PIN_DIST / 10;

            super(pinId);

            let btng = <SVGGElement>svg.elt("g");
            let btn = svg.elt("circle", { cx: x, cy: y, r, class: styleClass }) as SVGCircleElement
            btng.appendChild(btn);
            this.element = btng;
        }

        getElement() {
            return this.element;
        }

        updateState() {
        }
    }

    class BoardButtonReset extends BoardButton {
        constructor(x: number, y: number, r: number) {
            let pin = pinByName("RESET")
            super(pin.id, x, y, r, "sim-reset-btn", "BUTTON_RESET");
            this.getElement().addEventListener("click", () => pxsim.control.reset(), false);
        }
    }

    class BoardButtonUser extends BoardButton {
        constructor(x: number, y: number, r: number) {
            let pin = pinByName("BTN_USER");
            super(pin.id, x, y, r, "sim-user-btn", "BUTTON_USER");
            this.attachEvents();
        }
        private attachEvents() {
            pointerEvents.down.forEach(evid => this.getElement().addEventListener(evid, ev => {
                    this.setPressed(true);
                }));
            this.getElement().addEventListener(pointerEvents.leave, ev => {
                this.setPressed(false);
            })
            this.getElement().addEventListener(pointerEvents.up, ev => {
                this.setPressed(false);
            })
        }
    }

    class BoardLed {
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

    class BoardNeopixel {
        private element: SVGCircleElement;

        constructor(x: number, y: number, r: number) {
            this.element = svg.elt("circle", { cx: x, cy: y, r }) as SVGCircleElement
        }

        getElement() {
            return this.element;
        }

        setColor(rgb: [number, number, number]) {
            const hsl = visuals.rgbToHsl(rgb);
            let [h, s, l] = hsl;
            const lx = Math.max(l * 1.3, 85);

            // at least 10% luminosity
            l = l * 90 / 100 + 10;
            this.element.style.stroke = `hsl(${h}, ${s}%, ${Math.min(l * 3, 75)}%)`
            this.element.style.strokeWidth = "1.5";
            svg.fill(this.element, `hsl(${h}, ${s}%, ${lx}%)`);
            svg.filter(this.element, `url(#neopixelglow)`);
        }
    }
}
