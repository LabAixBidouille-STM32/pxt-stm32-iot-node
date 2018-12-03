/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../built/common-sim.d.ts"/>
/// <reference path="../../libs/core/dal.d.ts"/>
/// <reference path="../dalboard.ts"/>

namespace pxsim.visuals {
    export class ButtonView implements IBoardPart<CommonButtonState> {
        public element: SVGElement;
        public defs: SVGElement[];
        public style = BUTTON_PAIR_STYLE;
        private state: CommonButtonState;
        private bus: EventBus;
        private btn: SVGGElement;

        private pinId: number;
        private button: CommonButton;

        public init(bus: EventBus, state: CommonButtonState, svgEl: SVGSVGElement, otherParams: Map<string>) {
            this.state = state;
            this.bus = bus;
            this.defs = [];
            this.element = this.mkBtn();
            let pinStr = pxsim.readPin(otherParams["button"]);
            this.pinId = pxsim.pinIds[pinStr];
            this.button = new CommonButton(this.pinId);
            this.state.buttonsByPin[this.pinId] = this.button;
            this.updateState();
            this.attachEvents();
        }

        public moveToCoord(xy: Coord) {
            let btnWidth = PIN_DIST * 3;
            let [x, y] = xy;
            translateEl(this.btn, [x, y])
        }

        public updateState() {

        }

        public updateTheme() {}

        private mkBtn() {
            this.btn = mkBtnSvg([0, 0]).el;

            const mkVirtualBtn = () => {
                const numPins = 2;
                const w = PIN_DIST * 2.8;
                const offset = (w - (numPins * PIN_DIST)) / 2;
                const corner = PIN_DIST / 2;
                const cx = 0 - offset + w / 2;
                const cy = cx;
                const txtSize = PIN_DIST * 1.3;
                const x = -offset;
                const y = -offset;
                const txtXOff = PIN_DIST / 7;
                const txtYOff = PIN_DIST / 10;

                let btng = <SVGGElement>svg.elt("g");
                let btn = svg.child(btng, "rect", { class: "sim-button-virtual", x: x, y: y, rx: corner, ry: corner, width: w, height: w});
                let btnTxt = mkTxt(cx + txtXOff, cy + txtYOff, txtSize, 0, "A+B");
                svg.addClass(btnTxt, "sim-text")
                svg.addClass(btnTxt, "sim-text-virtual");
                btng.appendChild(btnTxt);

                return btng;
            }

            let el = svg.elt("g");
            svg.addClass(el, "sim-buttonpair")
            el.appendChild(this.btn);

            return el;
        }

        private attachEvents() {
            let btnSvgs = [this.btn];

            btnSvgs.forEach((btn, index) => {
                pointerEvents.down.forEach(evid => btn.addEventListener(evid, ev => {
                    this.button.setPressed(true);
                }));
                btn.addEventListener(pointerEvents.leave, ev => {
                    this.button.setPressed(false);
                })
                btn.addEventListener(pointerEvents.up, ev => {
                    this.button.setPressed(false);
                })
            })
        }
    }

    export class BoardButton extends CommonButton {
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

    export class BoardButtonReset extends BoardButton {
        constructor(x: number, y: number, r: number) {
            let pin = pinByName("RESET")
            super(pin.id, x, y, r, "sim-reset-btn", "BUTTON_RESET");
            this.getElement().addEventListener("click", () => pxsim.control.reset(), false);
        }
    }

    export class BoardButtonUser extends BoardButton {
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

}