import * as calendar from "./calendar";

let current_link,
    current_section;

(window.onpopstate = event => {

    const hash = event.state || "#";

    if (current_link) {
        current_link.classList.remove("target");
    }
    current_link = document.querySelector(`#menu [href="${hash}"]`);
    current_link.classList.add("target");

    if (current_section) {
        current_section.classList.remove("current");
    }
    current_section = document.getElementById(hash.substring(1) || "index");
    current_section.classList.add("current");

    if (hash === '#belegungskalender') {
        calendar.show(current_section);
    }
})(
    {state: window.location.hash === "" ? "#" : window.location.hash});

document.getElementById("center").classList.add("page-by-page");

[].forEach.call(document.querySelectorAll("#menu a"), a => a.onclick = a.onkeyup = event => {
    if (event.type === "click" || (event.type === "keyup" && event.which === 13)) {
        const hash = event.currentTarget.getAttribute("href");
        window.history.pushState(hash, hash, hash);
        window.onpopstate({state: hash});
    }
    return false;
});

if (location.hash) { window.setTimeout(function() { window.scrollTo(0, 0); }, 0); }
