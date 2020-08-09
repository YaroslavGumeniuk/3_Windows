const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);

    // проверка инпутов на номер
    numInputs.forEach((item) => {
        item.addEventListener("input", () => {
            item.value = item.value.replace(/\D/, "");
        });
    });
};

export default checkNumInputs;
