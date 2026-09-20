const currentYear = new Date().getFullYear();
const lastModified = document.lastModified;

document.querySelector("#currentyear").textContent = currentYear;
document.querySelector("#lastModified").textContent =
    `Last Modified: ${lastModified}`;

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-label", "Close navigation menu");
    } else {
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }
});