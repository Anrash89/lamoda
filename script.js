let productList = []; // Массив для хранения всех товаров

function addProduct() {
    // 1. Собираем данные из формы
    const product = {
        id: Date.now(), // Уникальный ID для удаления
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

    // 2. Добавляем товар в массив
    productList.push(product);

    // 3. Обновляем отображение списка
    renderProductList();

    // 4. Очищаем форму (опционально)
    // document.querySelector('.form-column form').reset();
}

function renderProductList() {
    const tableBody = document.querySelector('#product-table tbody');
    tableBody.innerHTML = ''; // Очищаем таблицу

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
    if (productList.length === 0) {
        alert("Список товаров пуст!");
        return;
    }

    // Преобразуем наш массив объектов в формат, понятный библиотеке
    const worksheetData = productList.map(p => ({
        "Наименование": p.name,
        "Артикул": p.sku,
        "Бренд": p.brand,
        "Цвет": p.color,
        "Размер": p.size,
        "Состав": p.composition,
        "Страна": p.country,
        "Производитель": p.manufacturer,
        "Штрихкод": p.barcode
        // Добавьте другие колонки по шаблону Lamoda
    }));
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(wb, ws, "Товары для Lamoda");

    // Генерируем и скачиваем файл
    XLSX.writeFile(wb, "Lamoda_Products.xlsx");
}

function printLabels() {
    alert("Функция печати этикеток в разработке!");
    // Здесь будет код для генерации подробных этикеток
}

function printBarcodes() {
    alert("Функция печати штрихкодов в разработке!");
    // Здесь будет код для генерации простых штрихкодов
}