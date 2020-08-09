import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll("form");
    const inputs = document.querySelectorAll("input");
    const windows = document.querySelectorAll("[data-modal]");

    // проверка инпутов на номер телефона
    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: "Загрузка...",
        sucsess: "Спасибо, мы с Вами свяжемся",
        failure: "Что-то пошло не так...",
    };

    // отправка запроса
    const postData = async (url, data) => {
        document.querySelector(".status").textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data,
        });

        return await res.text();
    };

    // очистка инпутов
    const clearInputs = () => {
        inputs.forEach((item) => {
            item.value = "";
        });
    };

    form.forEach((item) => {
        item.addEventListener("submit", (e) => {
            e.preventDefault();

            // создаем блок статуса сообщения
            let statusMessage = document.createElement("div");
            statusMessage.classList.add("status");
            item.appendChild(statusMessage);

            //собираем данные из формы
            const formData = new FormData(item);
            if (item.getAttribute("data-calc") === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData("assets/server.php", formData)
                .then((res) => {
                    console.log(res);
                    statusMessage.textContent = message.sucsess;
                })
                .catch(() => (statusMessage.textContent = message.failure))
                .finally(() => {
                    clearInputs();
                    for (let key in state) {
                        delete state[key];
                    }
                    setTimeout(() => {
                        windows.forEach((item) => {
                            item.style.display = "none";
                        });
                        document.body.style.overflow = "";
                        statusMessage.remove();
                    }, 3000);
                });
        });
    });
};

export default forms;
