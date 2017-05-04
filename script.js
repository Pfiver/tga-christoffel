import './fun';
import './menu';

export { show_calendar } from './calendar';

!function() {
    let current_section = document.getElementsByClassName("current")[0];
    window.onhashchange = () => {
        const id = window.location.hash.substring(1);
        current_section.classList.remove("current");
        current_section = document.getElementById(id);
        current_section.classList.add("current");
    };
}();
