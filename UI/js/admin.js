
const dashboard = document.getElementById('dashboard-info');

const accounts = document.getElementById('accounts').addEventListener('click', () => {
    dashboard.innerHTML = '<object height="1000" width="1129" type="text/html" data="accounts.html"></object>';
})


function deleteRow(button) {
    const option = confirm('Are you sure to delete this account?');
    
    if (option === true) {
        const tableRow = button.parentNode.parentNode;
        tableRow.parentNode.removeChild(tableRow);
    }
    return false;

}