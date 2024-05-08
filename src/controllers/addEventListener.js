import { utils } from "../utils/utils.js";
import { exportController } from "./export.controller.js";
import { runScriptController } from "./runScript.controller.js";

export function addEventListener() {
    window.addEventListener('DOMContentLoaded', function() {
        window.App.getResult((_, value) => {
            const { type, result } = value;
            try {
                if(type === 'showTable') {
                    runScriptController.handleResult(result);
                } else if(type === 'exportList') {
                    exportController.handleModal(result);
                } else if(type === 'export') {
                    console.log(result);
                };
            } catch (error) {
                utils.showMessageBox({message: error, type: 'error'});
            };
        });
    });

    runScriptController.addButtons();
    exportController.addButtons();
}