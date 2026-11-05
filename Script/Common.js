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

// 表示中の項目をヘッダーとメニューで強調する
const pageItemLinks = document.querySelectorAll(".header-nav a, .mobile-menu a");
const pageSections = [...document.querySelectorAll(".header-nav a")]
    .map((link) => document.querySelector(link.hash));

function updateCurrentItem() {
    // 項目へ移動すると、見出しの余白ぶん（ヘッダーの下 100px 強）を空けて止まる
    const currentLine = document.querySelector(".site-header").offsetHeight + 120;
    const isAtBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

    const passedSections = pageSections.filter(
        (section) => section.getBoundingClientRect().top <= currentLine
    );
    const currentSection = isAtBottom ? pageSections.at(-1) : passedSections.at(-1);

    pageItemLinks.forEach((link) => {
        if (currentSection && link.hash === `#${currentSection.id}`) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener("scroll", updateCurrentItem, { passive: true });
window.addEventListener("resize", updateCurrentItem);
updateCurrentItem();