// http://purecss.io/layouts/tucked-menu-vertical/

window.addEventListener("load", function() {

    const menu = document.getElementById('menu');

    document.getElementById('toggle').addEventListener('click', toggleMenu);
    window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', closeMenu);

    function toggleMenu() {
        // set timeout so that the panel has a chance to roll up
        // before the menu switches states
        if (menu.classList.contains('open')) {
            setTimeout(toggleHorizontal, 500);
        }
        else {
            toggleHorizontal();
        }
        menu.classList.toggle('open');
        document.getElementById('toggle').classList.toggle('x');
        localStorage.setItem('menu', menu.classList.contains('open') ? 'open' : 'closed');
    }

    function toggleHorizontal() {
        (toggleHorizontal = function() {
            Array.prototype.forEach.call(
                document.getElementById('menu').querySelectorAll('.tucked-vertical-menu-can-transform'),
                function (el) {
                    el.classList.toggle('pure-menu-horizontal');
                }
            );
        })();
        initStyle();
    }

    function closeMenu() {
        if (menu.classList.contains('open')) {
            toggleMenu();
        }
    }

    const style = document.createElement('style');
    style.type = 'text/css';
    document.querySelector('head').appendChild(style);
    function initStyle() {
        const h = parseInt(window.getComputedStyle(menu.firstElementChild.firstElementChild.firstElementChild, null).getPropertyValue('padding-top'), 10);
        const ch = menu.firstElementChild.firstElementChild.firstElementChild.clientHeight;
        const nh = (ch - h) * 7;
        style.appendChild(document.createTextNode('.tucked-vertical-menu-wrapper.open {height:' + nh + 'px;}'));
    }
    initStyle();

    if (localStorage.getItem('menu') === 'open') {
        // http://stackoverflow.com/a/6850319
        const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (width > 768) {
            localStorage.setItem('menu', 'closed');
        } else {
            toggleMenu();
        }
    }
    setTimeout(function () { menu.classList.add('animated'); }, 0);
});
