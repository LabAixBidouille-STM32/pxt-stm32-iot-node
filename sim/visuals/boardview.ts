/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../built/common-sim.d.ts"/>
/// <reference path="../../libs/core/dal.d.ts"/>
/// <reference path="../dalboard.ts"/>
/// <reference path="./board.ts"/>

namespace pxsim.visuals {
    mkBoardView = (opts: pxsim.visuals.BoardViewOptions): BoardView => {
        return new visuals.MetroBoardSvg({
            runtime: runtime,
            theme: visuals.randomTheme(),
            visualDef: opts.visual as BoardImageDefinition,
            disableTilt: false,
            wireframe: opts.wireframe
        });
    }
}