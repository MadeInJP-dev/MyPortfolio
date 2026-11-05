const menuButton = document.querySelector(".mobile-menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuLinks = mobileMenu.querySelectorAll("a");

// メニューを閉じる
function closeMenu() {
    menuButton.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "メニューを開く");
    mobileMenu.setAttribute("aria-hidden", "true");
}

// メニューボタンの開閉
menuButton.addEventListener("click", () => {
    const isOpen = menuButton.classList.toggle("is-open");

    mobileMenu.classList.toggle("is-open", isOpen);

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "メニューを閉じる" : "メニューを開く"
    );

    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
});

// 項目を選択したらメニューを閉じる
mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

// Escapeキーでも閉じる
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});