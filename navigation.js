import * as calendar from "./calendar";
import * as headers from "./headers";

let current_link,
    current_section;

window.onpopstate = event => {

    const hash = event.state || "#";
    const section = hash.substring(1) || "index";

    if (current_link) {
        current_link.classList.remove("target");
    }
    current_link = document.querySelector(`#menu [href="${hash}"]`);
    current_link.classList.add("target");

    if (current_section) {
        current_section.classList.remove("current");
    }
    current_section = document.getElementById(section);
    current_section.classList.add("current");

    headers.go(section);

    if (hash === '#belegungskalender') {
        calendar.show(current_section);
    }
};

document.getElementById("center").classList.add("page-by-page");

[].forEach.call(document.querySelectorAll("#menu a"), a => a.onclick = a.onkeyup = event => {
    if (event.type === "click" || (event.type === "keyup" && event.which === 13)) {
        const hash = event.currentTarget.getAttribute("href");
        window.history.pushState(hash, hash, hash);
        window.onpopstate({state: hash});
    }
    return false;
});

let hash = window.location.hash === "" ? "#" : window.location.hash.replace(/&.*$/, "");
window.history.replaceState(hash, hash, window.location.href);
window.onpopstate({state: hash});

window.setTimeout(function() { window.scrollTo(0, 0); }, 0);
