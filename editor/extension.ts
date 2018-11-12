/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />

namespace pxt.editor {
    class HexRecord{
        constructor(public length: number,
            public adress: number,
            public type: number,
            public data: string,
            public crc: number) {
        }

        dataToBaseAdress() : number {
            return parseInt(this.data, 16)<<16;
        }

        dataToHexStrings(): string[] {
            let res: string[] = [];
            for (let i = 0; i < this.length; ++i) {
                res[i] = this.data[2 * i] + this.data[2 * i + 1];
            }
            return res;
        }
    }

    function hexToBinary(hexInput: string): Uint8Array {
        let hex = hexInput.split("\n");
        let hexOutput: string[] = [];

        // Figure out what the base offset is
        let startBaseAddr = parseIHexRecord(hex[0]).dataToBaseAdress();
        let currentBaseAddr = startBaseAddr;

        for (let i = 0; i < hex.length; ++i) {
            let m = parseIHexRecord(hex[i]);
            if (!m) continue;

            if (m.type == 4) {
                currentBaseAddr = m.dataToBaseAdress();
            } else if (m.type == 0) {
                // Ensure we're padded properly.  Add "0xff" if needed to fill in gaps in the hexfile.
                while (startBaseAddr + hexOutput.length < currentBaseAddr + m.adress) {
                    hexOutput.push("FF");
                }
                hexOutput.push(...m.dataToHexStrings());
            }
        }

        pxt.log("Resulting binary is " + hexOutput.length + " bytes");
        
        let output = new Uint8Array(hexOutput.length);
        for (let i = 0; i < hexOutput.length; i++) {
            output[i] = parseInt(hexOutput[i], 16);
        }
        return output;
    }

    function parseIHexRecord(hexLine: string): HexRecord{
        let m = /^:(..)(....)(0[012345])(.*)(..)/.exec(hexLine);
        let res : HexRecord;
        if (m) {
            res = new HexRecord(parseInt(m[1], 16),
                                parseInt(m[2], 16),
                                parseInt(m[3], 16),
                                m[4],
                                parseInt(m[5], 16));
        }
        return res;
    }

    function showUploadInstructionsAsync(fn: string, url: string, confirmAsync?: (options: any) => Promise<number>) {
        const boardName = pxt.appTarget.appTheme.boardName || "???";
        const boardDriveName = pxt.appTarget.appTheme.driveDisplayName || pxt.appTarget.compile.driveName || "???";

        // https://msdn.microsoft.com/en-us/library/cc848897.aspx
        // "For security reasons, data URIs are restricted to downloaded resources. 
        // Data URIs cannot be used for navigation, for scripting, or to populate frame or iframe elements"
        const downloadAgain = !pxt.BrowserUtils.isIE() && !pxt.BrowserUtils.isEdge();
        const docUrl = pxt.appTarget.appTheme.usbDocs;
        const saveAs = pxt.BrowserUtils.hasSaveAs();

        const htmlBody = `
        <div class="ui three column grid stackable">
            <div class="column">
                <div class="ui">
                    <div class="content">
                        <div class="description">
                            <span class="ui blue circular label">1</span>
                            ${lf("Take the USB cable you connected to your computer. Plug it into your {0}.", boardName)}
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="ui">
                    <div class="content">
                        <div class="description">
                            <span class="ui blue circular label">2</span>
                            ${lf("Press the RESET button to go into programming mode. When the lights turn green, you're ready to go.")}
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="ui">
                    <div class="content">
                        <div class="description">
                            <span class="ui blue circular label">3</span>
                            ${lf("Click and drag the file you downloaded onto {0}.", boardDriveName)}
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        return confirmAsync({
            header: lf("Download completed..."),
            htmlBody,
            hasCloseIcon: true,
            hideCancel: true,
            hideAgree: true,
            size: 'large',
            buttons: [downloadAgain ? {
                label: fn,
                icon: "download",
                class: "lightgrey focused",
                url,
                fileName: fn
            } : undefined, docUrl ? {
                label: lf("Help"),
                icon: "help",
                class: "lightgrey focused",
                url: docUrl
            } : undefined]
            //timeout: 20000
        }).then(() => { });
    }

    initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
        pxt.debug('loading pxt-stm32-iot-node target extensions...')
        const res: pxt.editor.ExtensionResult = {
            deployCoreAsync: (resp: pxtc.CompileResult) => {
                let resolve: (thenableOrResult?: void | PromiseLike<void>) => void;
                let reject: (error: any) => void;

                let hexInput = resp.outfiles[pxtc.BINARY_HEX];
                let binOutput = hexToBinary(hexInput);

                const fileName = resp.downloadFileBaseName + ".bin";

                const url = pxt.BrowserUtils.browserDownloadUInt8Array(
                    binOutput,
                    fileName,
                    "octet/stream",
                    resp.userContextWindow,
                    reject
                );

                showUploadInstructionsAsync(fileName, url, resp.confirmAsync)
                    .then(() => resolve());

                const deferred = new Promise<void>((res, rej) => {
                    resolve = res;
                    reject = rej;
                });
                return deferred;
            },
            showUploadInstructionsAsync: (fn: string, url: string, confirmAsync?: (options: any) => Promise<number>) => {    
                const boardName = pxt.appTarget.appTheme.boardName || "???";
                const boardDriveName = pxt.appTarget.appTheme.driveDisplayName || pxt.appTarget.compile.driveName || "???";

                // https://msdn.microsoft.com/en-us/library/cc848897.aspx
                // "For security reasons, data URIs are restricted to downloaded resources. 
                // Data URIs cannot be used for navigation, for scripting, or to populate frame or iframe elements"
                const downloadAgain = !pxt.BrowserUtils.isIE() && !pxt.BrowserUtils.isEdge();
                const docUrl = pxt.appTarget.appTheme.usbDocs;
                const saveAs = pxt.BrowserUtils.hasSaveAs();

                const htmlBody = `
                <div class="ui three column grid stackable">
                    <div class="column">
                        <div class="ui">
                            <div class="content">
                                <div class="description">
                                    <span class="ui blue circular label">1</span>
                                    ${lf("Take the USB cable you connected to your computer. Plug it into your {0}.", boardName)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="ui">
                            <div class="content">
                                <div class="description">
                                    <span class="ui blue circular label">2</span>
                                    ${lf("Press the RESET button to go into programming mode. When the lights turn green, you're ready to go.")}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="ui">
                            <div class="content">
                                <div class="description">
                                    <span class="ui blue circular label">3</span>
                                    ${lf("Click and drag the file you downloaded onto {0}.", boardDriveName)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

                return confirmAsync({
                    header: lf("Download completed..."),
                    htmlBody,
                    hasCloseIcon: true,
                    hideCancel: true,
                    hideAgree: true,
                    size: 'large',
                    buttons: [downloadAgain ? {
                        label: fn,
                        icon: "download",
                        class: "lightgrey focused",
                        url,
                        fileName: fn
                    } : undefined, docUrl ? {
                        label: lf("Help"),
                        icon: "help",
                        class: "lightgrey focused",
                        url: docUrl
                    } : undefined]
                    //timeout: 20000
                }).then(() => { });
            }
        };
        return Promise.resolve<pxt.editor.ExtensionResult>(res);
    }
}
