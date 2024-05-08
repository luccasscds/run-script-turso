export const utils = {
    jsonToTable(data, columns) {
        const table = document.getElementById('result');
        table.innerText = null;
    
        // heard
        const thead = document.createElement('thead');
        const tr1 = document.createElement('tr');
        columns.forEach(col => {
            const th = document.createElement('th');
            th.setAttribute('scope', 'col');
            th.innerText = col;
            tr1.appendChild(th);
        });
        thead.appendChild(tr1);
        table.appendChild(thead);
        
        
        // body
        const tbody = document.createElement('tbody');
        data.forEach((key) => {
            const tr2 = document.createElement('tr');
            columns.forEach(col => {
                const td = document.createElement('td');
                console.log(key[col])
                td.innerText = key[col];
                tr2.appendChild(td);
            });
            tbody.appendChild(tr2);
        });
        table.appendChild(tbody);
    },

    /**
     * 
     * @param {{message: string, type: 'none' | 'info' | 'error' | 'question' | 'warning'}} options 
     */
    showMessageBox(options) {
        window.App.showMessageBox({message: options.message, type: options.type});
    },

    showModal(show = false){
        const Modal = new bootstrap.Modal(document.getElementById('Modal'), {
            keyboard: false
        });
        show ? Modal?.show() : Modal?.hide();
    },

    loading(value = false) {
        const loading = document.getElementById('loading-background');
        if(value) {
            loading.style.display = 'flex';
        } else {
            loading.style.display = 'none';
        };
    },
};