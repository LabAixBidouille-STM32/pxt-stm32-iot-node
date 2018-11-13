/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtlib.d.ts" />


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

        dataToUint8Array(): Uint8Array{
            return Uint8Array.from(Array.from(this.data, (x:string) => parseInt(x, 16)));
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
        let output = new Uint8Array(hexInput.length - hex.length);
        let outputSize = 0;
        // Figure out what the base offset is
        let startBaseAddr = parseIHexRecord(hex[0]).dataToBaseAdress();
        let currentBaseAddr = startBaseAddr;

        for (let i = 1; i < hex.length; ++i) {
            let m = parseIHexRecord(hex[i]);
            if (!m) continue;

            if (m.type == 4) {
                currentBaseAddr = m.dataToBaseAdress();
            } else if (m.type == 0) {
                // Ensure we're padded properly.  Add "0xff" if needed to fill in gaps in the hexfile.
                while (startBaseAddr + outputSize < currentBaseAddr + m.adress) {
                    output[outputSize++] = (0xFF);

                }
                
                let data = m.dataToUint8Array();

                for (let i = 0; i < data.length; i++) {
                    output[outputSize++] = data[i];
                }
            }
        }

        pxt.log("Resulting binary is " + output.length + " bytes");
        
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

    function showUploadInstructionsAsync(fn: string, url: string, confirmAsync: (options: any) => Promise<number>) {
        const boardName = Util.htmlEscape(pxt.appTarget.appTheme.boardName || "???");
        const boardDriveName = Util.htmlEscape(pxt.appTarget.appTheme.driveDisplayName || pxt.appTarget.compile.driveName || "???");

        // https://msdn.microsoft.com/en-us/library/cc848897.aspx
        // "For security reasons, data URIs are restricted to downloaded resources.
        // Data URIs cannot be used for navigation, for scripting, or to populate frame or iframe elements"
        const userDownload = pxt.BrowserUtils.isBrowserDownloadWithinUserContext();
        const downloadAgain = !pxt.BrowserUtils.isIE() && !pxt.BrowserUtils.isEdge();
        const docUrl = pxt.appTarget.appTheme.usbDocs;

        const body = userDownload
                ? lf("Click 'Download' to open the {0} app.", pxt.appTarget.appTheme.boardName || "")
                : undefined;
        const htmlBody = !userDownload ?
            `<div class="ui grid stackable">
            <div class="column sixteen wide">
                <div class="ui grid">
                    <div class="row">
                        <div class="column">
                            <div class="ui two column grid padded">
                                <div class="column">
                                    <div class="ui">
                                        <div class="image">
                                            <img class="ui medium rounded image" src="./static/download/connect.png" style="margin-bottom:1rem;" />
                                        </div>
                                        <div class="content">
                                            <div class="description">
                                                <span class="ui purple circular label">1</span>
                                                <strong>${lf("Connect the {0} to your computer with a USB cable", boardName)}</strong>
                                                <br />
                                                <span style="font-size:small">${lf("Use the microUSB port on the top of the {0}", boardName)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="ui">
                                        <div class="image">
                                            <img class="ui medium rounded image" src="./static/download/transfer.png" style="margin-bottom:1rem;" />
                                        </div>
                                        <div class="content">
                                            <div class="description">
                                                <span class="ui purple circular label">2</span>
                                                <strong>${lf("Move the file to the {0}", boardName)}</strong>
                                                <br />
                                                <span style="font-size:small">${lf("Locate the downloaded file and drag it to the <strong>{0}</strong> drive", boardDriveName)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>` : undefined;

        const buttons: any[] = [];

        if (downloadAgain) {
            buttons.push({
                label: userDownload ? lf("Download") : fn,
                icon: "download",
                class: `${userDownload ? "primary" : "lightgrey"}`,
                url,
                fileName: fn
            });
        }

        if (docUrl) {
            buttons.push({
                label: lf("Help"),
                icon: "help",
                className: "lightgrey",
                url: docUrl
            });
        }

        return confirmAsync({
            header: lf("Download to your {0}", pxt.appTarget.appTheme.boardName),
            body,
            htmlBody,
            hasCloseIcon: true,
            hideCancel: true,
            hideAgree: true,
            className: 'downloaddialog',
            buttons
            //timeout: 20000
        }).then(() => { });
    }

    initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
        pxt.debug('loading pxt-stm32-iot-node target extensions...')
        const res: pxt.editor.ExtensionResult = {
            "showUploadInstructionsAsync" : showUploadInstructionsAsync,
            "deployCoreAsync": (resp: pxtc.CompileResult) => { 
                let hexInput = resp.outfiles[pxt.outputName()];
                let binOutput = hexToBinary(hexInput);
                const fileName = resp.downloadFileBaseName + ".bin";
                
                let url = pxt.BrowserUtils.browserDownloadUInt8Array(
                    binOutput,
                    fileName,
                    "octet/stream",
                    resp.userContextWindow
                );
                
                if (!resp.success) {
                    return Promise.resolve();
                }
            
                return showUploadInstructionsAsync(fileName, url, resp.confirmAsync);
            }
        };
        return Promise.resolve<pxt.editor.ExtensionResult>(res);
    }
}
