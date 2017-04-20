import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.JSProperty;
import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.css.CSSStyleDeclaration;
import org.teavm.jso.dom.events.Event;
import org.teavm.jso.dom.events.MouseEvent;
import org.teavm.jso.dom.html.HTMLDocument;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.xml.Element;

class Menu {

    private static Window window = Window.current();
    private static HTMLDocument document = window.getDocument();
    private static HTMLElement menu = document.getElementById("menu");

    static void init() {

        System.out.println("OK");

        window.listenLoad(evt -> {

        });

        document.getElementById("toggle").listenClick(Menu::toggle);

        window.addEventListener(hasAttr(window, "onorientationchange") ? "orientationchange" : "resize", Menu::close);

        initStyle();

        menu.getStyle();

        System.out.println(fancy().getFancy().gcs(fececec(menu)).getPropertyValue("clientHeight"));

        System.out.println(fancyCast(menu).getFirstElementChild().getFirstElementChild().getFirstElementChild().getTagName());
    }

    @JSBody(params = { "elm" }, script = "return elm.firstElementChild.firstElementChild.firstElementChild;")
    private static native Element fececec(HTMLElement menu);

    abstract static class Fancy<T extends Window & CustomWindow> implements JSObject {
        @JSBody(params = {}, script = "return window;")
        native T getFancy();
    }

    interface CustomWindow extends JSObject {
        @JSBody(params = {"elm"}, script = "return window.getComputedStyle(elm, null);")
        CSSStyleDeclaration gcs(Element elm);

//        @JSProperty
//        <T extends Window & CustomWindow & HTMLElement> T getFirstElementChild();

        @JSProperty
        CustomWindow getFirstElementChild();

        @JSBody(params = {}, script = "return this;")
        HTMLElement elm();

        @JSProperty
        String getTagName();
    }


    @JSBody(params = {}, script = "return {};")
    private static native Fancy<?> fancy();


    @JSBody(params = { "elm" }, script = "return elm;")
    private static native <T extends Window & CustomWindow & HTMLElement> T fancyCast(JSObject elm);

    /*


    var style = document.createElement('style');
    style.type = 'text/css';
    document.querySelector('head').appendChild(style);
    function initStyle() {
        var h = parseInt(window.getComputedStyle(menu.firstElementChild.firstElementChild.firstElementChild, null).getPropertyValue('padding-top'), 10);
        var ch = menu.firstElementChild.firstElementChild.firstElementChild.clientHeight;
        var nh = (ch - h) * 5;
        style.appendChild(document.createTextNode('.tucked-vertical-menu-wrapper.open {height:' + nh + 'px;}'));
    }
    initStyle();
     */
    private static void initStyle() {
        HTMLElement style = document.createElement("style").withAttr("type", "text/css");
        document.getElementsByTagName("body").get(0).appendChild(style);
//        int h = window.
    }

    private static void toggle(MouseEvent mouseEvent) {
    }

    private static void close(Event event) {
    }

    private static boolean hasAttr(Window window, String attr) {
        return false;
    }

    @JSBody(params = { "obj", "attr" }, script = "return attr in obj;")
    public static native void hasAttr(HTMLElement obj, String attr);

    /*
    private static void toggleMenu() {

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

    if (localStorage.getItem('menu') === 'open') {
        // http://stackoverflow.com/a/6850319
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (width > 768) {
            localStorage.setItem('menu', 'closed');
        } else {
            toggleMenu();
        }
    }
    setTimeout(function () { menu.classList.add('animated'); }, 0);
    */
}
