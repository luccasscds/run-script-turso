import { utils } from "../utils/utils.js";

export const runScriptController = {
    handleResult(result) {
        const table = document.getElementById('result');
        table.innerText = null;

        if(result.error) throw result.error;

        utils.jsonToTable(result.rows, result.columns);
    },
    addButtons() {
        const runButton = document.getElementById('runScriptButton');
        runButton.addEventListener('click', async () => {
            try {
                utils.loading(true);
                const textarea = document.getElementById('areaScript');
                if(!textarea.value) {
                    utils.showMessageBox({message: 'Precisa digitar alguma coisa.', type: 'error'});
                    return;
                };
                
                const isExecuteMultiple = document.getElementById('executeMultiple');

                await window.App.runScript({
                    sql: textarea.value,
                    type: 'showTable',
                    executeMultiple: isExecuteMultiple.checked,
                });
            } catch (error) {
                utils.showMessageBox({message: error, type: 'error'});
            } finally {
                utils.loading();
            };
        });
    }
}