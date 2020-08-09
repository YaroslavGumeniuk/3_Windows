const images = () => {
    const imgPopup = document.createElement("div"),
        workSection = document.querySelector(".works"),
        bigImage = document.createElement("img");

    imgPopup.classList.add("popup");
    workSection.appendChild(imgPopup);

    imgPopup.style.justifyContent = "center";
    imgPopup.style.alignItems = "center";
    imgPopup.style.display = "none";

    imgPopup.appendChild(bigImage);

    workSection.addEventListener("click", (e) => {
        e.preventDefault();

        let target = e.target;
        console.log(target);

        if (target && target.classList.contains("preview")) {
            setTimeout(function () {
                imgPopup.style.opacity = "1";
            }, 20);
            imgPopup.style.display = "flex";
            const path = target.parentNode.getAttribute("href");
            bigImage.setAttribute("src", path);
        }

        if (target && target.matches("div.popup")) {
            setTimeout(function () {
                imgPopup.style.display = "none";
            }, 500);
            imgPopup.style.opacity = "0";
        }
    });
};

export default images;
