let productList = []; // Массив для хранения всех товаров

function addProduct() {
    const product = {
        id: Date.now(),
        name: document.getElementById('productName').value,
        sku: document.getElementById('sku').value,
        color: document.getElementById('color').value,
        size: document.getElementById('size').value,
        country: document.getElementById('country').value,
        brand: document.getElementById('brand').value,
        composition: document.getElementById('composition').value,
        manufacturer: document.getElementById('manufacturer').value,
        address: document.getElementById('address').value,
        prodDate: document.getElementById('prodDate').value,
        barcode: document.getElementById('barcode').value,
        icons: Array.from(document.querySelectorAll('#icons-selection input:checked')).map(cb => cb.value)
    };
    productList.push(product);
    renderProductList();
}

function renderProductList() {
    const tableBody = document.querySelector('#product-table tbody');
    tableBody.innerHTML = ''; 
    productList.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.sku}</td>
            <td>${product.size}</td>
            <td><span class="delete-btn" onclick="deleteProduct(${product.id})">X</span></td>
        `;
        tableBody.appendChild(row);
    });
    document.getElementById('product-count').innerText = productList.length;
}

function deleteProduct(id) {
    productList = productList.filter(p => p.id !== id);
    renderProductList();
}

function generateExcel() {
    if (productList.length === 0) { alert("Список товаров пуст!"); return; }
    const worksheetData = productList.map(p => ({
        "Наименование": p.name, "Артикул": p.sku, "Бренд": p.brand, "Цвет": p.color, "Размер": p.size,
        "Состав": p.composition, "Страна": p.country, "Производитель": p.manufacturer, "Штрихкод": p.barcode
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(wb, ws, "Товары для Lamoda");
    XLSX.writeFile(wb, "Lamoda_Products.xlsx");
}

/* 
=====================================================
--- НОВАЯ ФУНКЦИЯ ПЕЧАТИ ЭТИКЕТОК ---
=====================================================
*/
function printLabels() {
    if (productList.length === 0) {
        alert("Список товаров пуст!");
        return;
    }

    const printArea = document.getElementById('print-area');
    printArea.innerHTML = ''; // Очищаем область печати

    // Проходим по каждому товару в списке
    productList.forEach(product => {
        // --- Создаем HTML для иконок ---
        let iconsHtml = '';
        product.icons.forEach(iconFile => {
            iconsHtml += `<img src="icons/${iconFile}" class="care-icon">`;
        });

        // --- Создаем полный HTML для одной этикетки ---
        const labelHtml = `
            <div class="print-label-container">
                <div class="lamoda-label">
                    <div class="text-content">
                        <p><strong>${product.name}</strong></p>
                        <p>Артикул: ${product.sku}</p>
                        <p>Цвет: ${product.color} / Разм.: ${product.size}</p>
                        <p>Страна: ${product.country}</p>
                        <p>Бренд: ${product.brand}</p>
                        <p>Состав: ${product.composition}</p>
                        <p>Производитель: ${product.manufacturer}</p>
                        <p>${product.address}</p>
                        <p>Дата производства: ${product.prodDate}</p>
                    </div>
                    <div class="icons-content">
                        ${iconsHtml}
                    </div>
                </div>
            </div>
        `;
        
        // Добавляем готовую этикетку в область печати
        printArea.innerHTML += labelHtml;
    });

    // Отправляем на печать
    window.print();
}
// --- КОНЕЦ НОВОЙ ФУНКЦИИ ---

function printBarcodes() {
    alert("Функция печати штрихкодов в разработке!");
    // Здесь будет код для генерации простых штрихкодов
}