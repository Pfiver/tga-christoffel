import './fun';
import './menu';

import * as calendar from './calendar';

!function() {
    let current_section;

    window.onhashchange = () => {

        if (current_section) {
            current_section.classList.remove("current");
            const id_attr = current_section.getAttribute("id");
            const id = id_attr.substring(0, id_attr.length - 8);
            document.querySelector(`#menu [href="#${id}"]`).classList.remove("target");
        }

        const id = window.location.hash === '' ? 'index' : window.location.hash.substring(1);

        current_section = document.getElementById(id + "-section");
        current_section.classList.add("current");

        document.querySelector(`#menu [href="#${id}"]`).classList.add("target");

        if (id === 'belegungskalender') {
            calendar.show(current_section);
        }
    };
}();

document.getElementById("center").classList.add("page-by-page");

[].forEach.call(document.querySelectorAll("#center > section"), elm => {

    elm.setAttribute("id", elm.getAttribute("id") + "-section");
});

window.onhashchange();
