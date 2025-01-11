const API_BASE_URL = 'http://localhost:3000';

async function fetchData(endpoint, tableId) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = '<tr><td colspan="5">Loading...</td></tr>';
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = getRowHtml(tableId, item);
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Fetch Error:', error);
        tableBody.innerHTML = '<tr><td colspan="5">Failed to load data.</td></tr>';
    }
}

function getRowHtml(tableId, item) {
    switch (tableId) {
        case 'userTable':
            return `<td>${item.nama}</td><td>${item.email}</td><td>${item.role}</td>`;
        case 'sewaTable':
            return `<td>${item.nama}</td><td>${item.lapangan}</td><td>${new Date(item.tanggal).toLocaleDateString()}</td><td>${item.durasi}</td>`;
        case 'lapanganTable':
            return `<td>${item.lokasi}</td><td>${item.harga_per_jam}</td>`;
        case 'tablePembayaran':
            return `<td>${item.total_pembayaran}</td><td>${item.metode_pembayaran}</td>`;
        case 'komentarTable':
            return `<td>${item.komentar}</td>`;
        default:
            return '';
    }
}

function createItem(type) {
    alert(`Create new ${type} data`);
    // Tambahkan logika untuk menambahkan data baru
}

function readItems(type) {
    alert(`Fetch ${type} data`);
    fetchData(`/api/${type}`, `${type}Table`);
}

function updateItem(type) {
    alert(`Update ${type} data`);
    // Tambahkan logika untuk memperbarui data
}

function deleteItem(type) {
    alert(`Delete ${type} data`);
    // Tambahkan logika untuk menghapus data
}

fetchData('/api/user', 'userTable');
fetchData('/api/sewa', 'sewaTable');
fetchData('/api/lapangan', 'lapanganTable');
fetchData('/api/pembayaran', 'tablePembayaran');
fetchData('/api/komentar', 'komentarTable');
