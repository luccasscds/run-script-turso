import { utils } from "../utils/utils.js";

export const exportController = {
    handleModal(result) {
        const modalBody = document.getElementById('modalBody');
        let listGroup = `
            <div class="btn-group mb-3" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="btnradio1">SQL</label>
            
                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" disabled>
                <label class="btn btn-outline-primary" for="btnradio2">CSV</label>
            
                <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" disabled>
                <label class="btn btn-outline-primary" for="btnradio3">JSON</label>
            </div>
            <ul id="listGroup" class="list-group list-group-numbered">
                ${result?.rows.map((item) => (`<li class="list-group-item">${item.name}</li>`) ).join('')}
            </ul>
        `;
        modalBody.innerHTML = listGroup;
    },
    addButtons() {
        const exportButton = document.getElementById('exportButton');
        exportButton.addEventListener('click', async () => {
            try {
                utils.loading(true);
                await window.App.runScript({
                    sql: "select name from sqlite_schema where type = 'table' and name <> 'sqlite_sequence';",
                    type: 'exportList',
                });
                utils.showModal(true);
            } catch (error) {
                utils.showMessageBox({message: error, type: 'error'});
            } finally {
                utils.loading();
            };
        });

        const modalBody = document.getElementById('modalBody');
        modalBody.addEventListener('click', async (event) => {
            try {
                utils.loading(true);
                const { target } = event;
                if(target.className === 'list-group-item' && target.innerText) {
                    await window.App.runScript({
                        sql: `select * from ${target.innerText};`,
                        table: target.innerText,
                        type: 'export',
                    });
                };
            } catch (error) {
                utils.showMessageBox({message: error, type: 'error'});
            } finally {
                utils.loading();
            }
        });
    },
}