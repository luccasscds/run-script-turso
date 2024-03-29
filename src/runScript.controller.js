import { utils } from "./utils/utils.js";

const runButton = document.getElementById('runScriptButton');
const textarea = document.getElementById('areaScript');

window.addEventListener('DOMContentLoaded', function() {
    window.App.getResult((event, value) => {
        const table = document.getElementById('result');
        table.innerText = null;

        if(value.error) {
            utils.message.error(value.error);
            return;
        };

        if(!value.rows || !value.columns) utils.message.info(JSON.stringify(value, null, 3));

        utils.jsonToTable(value.rows, value.columns);
    });
});

runButton.addEventListener('click', () => {
    if(!textarea.value) {
        utils.message.error('Precisa digitar alguma coisa.');
        return;
    };
    window.App.runScript( textarea.value );
});