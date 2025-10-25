window.addEventListener("DOMContentLoaded", function () {
    "use strict";

    var form = document.getElementById("order-form");
    var selectProduct = document.getElementById("product");
    var inputQuantity = document.getElementById("quantity");
    var btnCalc = document.getElementById("calc-button");
    var resultEl = document.getElementById("result");
    var errorEl = document.getElementById("error");

    function validateQuantity(str) {
        var trimmed;
        var re;
        var num;

        if (typeof str !== "string") {
            return {message: "Неверный тип данных", valid: false, value: null};
        }

        trimmed = str.trim();
        re = /^\d+$/;

        if (!re.test(trimmed)) {
            return {
                message: "Введите положительное целое число (только цифры).",
                valid: false,
                value: null
            };
        }

        num = parseInt(trimmed, 10);
        if (!Number.isFinite(num) || num <= 0) {
            return {
                message: "Количество должно быть больше нуля.",
                valid: false,
                value: num
            };
        }

        return {message: null, valid: true, value: num};
    }

    function calculateAndShow(event) {
        var priceStr;
        var price;
        var qtyRaw;
        var validation;
        var quantity;
        var total;
        var productName;

        if (event && typeof event.preventDefault === "function") {
            event.preventDefault();
        }

        errorEl.textContent = "";
        resultEl.textContent = "";

        priceStr = selectProduct.value;
        price = parseInt(priceStr, 10);
        if (!Number.isFinite(price) || price < 0) {
            errorEl.textContent = "Ошибка: Товавр не выбран.";
            return;
        }

        qtyRaw = inputQuantity.value;
        validation = validateQuantity(qtyRaw);
        if (!validation.valid) {
            errorEl.textContent = validation.message;
            return;
        }

        quantity = validation.value;
        total = price * quantity;
        productName = selectProduct.options[
            selectProduct.selectedIndex
        ].getAttribute("data-name") || "Товар";

        resultEl.textContent =
            productName + ": " + quantity + " × " + price + " ₽ = " + total + " ₽";
    }

    form.addEventListener("submit", calculateAndShow);
    btnCalc.addEventListener("click", calculateAndShow);
});