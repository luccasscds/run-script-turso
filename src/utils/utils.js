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

    message: {
        success(message) {
            showAlert(message, 'success');
        },
        error(message) {
            showAlert(message, 'danger');
        },
        warning(message) {
            showAlert(message, 'warning');
        },
        info(message) {
            showAlert(message, 'info');
        }
    }
}

/**
 * 
 * @param {string} message 
 * @param {'success' | 'danger' | 'warning' | 'info'} type 
 */
function showAlert(message, type) {
    const alertPlaceholder = document.getElementById('message');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');

    alertPlaceholder.append(wrapper);
}