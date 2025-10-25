'use strict';

window.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('order-form');
  var selectProduct = document.getElementById('product');
  var inputQuantity = document.getElementById('quantity');
  var btnCalc = document.getElementById('calc-button');
  var resultEl = document.getElementById('result');
  var errorEl = document.getElementById('error');

  function validateQuantity(str) {
    if (typeof str !== 'string') {
      return { valid: false, value: null, message: 'Неверный тип данных' };
    }
    var trimmed = str.trim();
    var re = /^\d+$/;
    if (!re.test(trimmed)) {
      return { valid: false, value: null, message: 'Введите положительное целое число (только цифры).' };
    }
    var num = parseInt(trimmed, 10);
    if (!isFinite(num) || num <= 0) {
      return { valid: false, value: num, message: 'Количество должно быть больше нуля.' };
    }
    return { valid: true, value: num, message: null };
  }

  function calculateAndShow(event) {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    errorEl.textContent = '';
    resultEl.textContent = '';

    var priceStr = selectProduct.value;
    var price = parseInt(priceStr, 10);
    if (!isFinite(price) || price < 0) {
      errorEl.textContent = 'Ошибка: некорректная цена товара.';
      return;
    }

    var qtyRaw = inputQuantity.value;
    var validation = validateQuantity(qtyRaw);
    if (!validation.valid) {
      errorEl.textContent = validation.message;
      return;
    }

    var quantity = validation.value;
    var total = price * quantity;

    var productName = selectProduct.options[selectProduct.selectedIndex].getAttribute('data-name') || 'Товар';
    resultEl.textContent = productName + ': ' + quantity + ' × ' + price + ' ₽ = ' + total + ' ₽';
  }

  form.addEventListener('submit', calculateAndShow);
  btnCalc.addEventListener('click', calculateAndShow);
});