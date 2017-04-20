import React from "react";
import ReactDOM from "react-dom";
import ColorPicker from "rc-color-picker";
import Less from "less/lib/less-browser";

console.log("OK");

var less = new Less(window, { onReady: false });

var get_style_vars = function (colorChooser, buttons) {
    return [
        {
            var: '@primary',
            name: "Primär-Farbe",
            control: colorChooser()
        },
        {
            var: '@page-shadow',
            name: "Seiten-Schatten-Farbe",
            control: buttons([
                'fade(black, 50%)',
                'fade(black, 12%)',
                'white',
                'fade(white, 50%)',
                'fade(white, 12%)',
                '@complement',
                'fade(@complement, 50%)',
                'fade(@complement, 12%)'
            ])
        }
    ];
};

var custom_vars = {
    // TODO: auto-init
    '@primary': '#daa520',
    '@page-shadow': 'black'
};

function update(var_, val) {
    if (typeof var_ !== 'undefined') {
        custom_vars[var_] = val;
    }
    less.modifyVars(custom_vars);
    current_customizations.innerHTML = Object.keys(custom_vars).map(function (k) {
        return k + ": " + custom_vars[k] + ";";
    }).join("\n");
}

var style_vars = get_style_vars(
    function () {
        return function () {
            return mkColorChooser(this.var, this.name);
        }
    },
    function (variants) {
        return function () {
            return mkModBtns(this.var, this.name, variants);
        }
    }
);

function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            // // hold on to it
            // clearTimeout(deferTimer);
            // deferTimer = setTimeout(function () {
            //     last = now;
            //     fn.apply(context, args);
            // }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}

function toHexByte(zeroToHundred) {
    return (Math.min(Math.floor(zeroToHundred / 100 * 256), 255) + 0x100).toString(16).substring(1, 3);
}

function mkColorChooser(var_, name) {
    // var elm = document.createElement('input');
    // elm.setAttribute('type', 'color');
    // elm.oninput = function() {
    //     console.log(elm.value);
    //     update(var_, elm.value);
    // };
    var elm = document.createElement('span');
    elm.style.vertAlign = 'center';
    ReactDOM.render(React.createElement(ColorPicker, {
        mode: 'RGB', onChange: function (val) {
            console.log(val.color + toHexByte(val.alpha));
            throttle(update)(var_, val.color);
            // update(var_, val.color);
        }
    }), elm);
    return elm;
}

function mkModBtns(v, i) {
    var elm = document.createElement('button');
    elm.onclick = function () {
        if (i < 0) {
            delete custom_vars[v];
            mixin({});
        }
        else {
            var o = {};
            o[v] = style_variants[v][i];
            mixin(o);
        }
    };
    elm.innerHTML = i + 1;
    return elm;
}

var current_customizations;

document.body.appendChild(function () {
    var elm = document.createElement('div');

    style_vars.forEach(function (v) {

        elm.appendChild(document.createTextNode(v.name + ": "));
        elm.appendChild(v.control());
        elm.appendChild(document.createElement('br'));

    });

    elm.appendChild(function () {
        var elm = document.createElement('div');
        elm.appendChild(document.createTextNode("Momentane Konfiguration: "));
        var code = document.createElement('code');
        code.style.display = 'inline-block';
        code.style.verticalAlign = 'top';
        var pre = document.createElement('pre');
        pre.style.backgroundColor = 'lightgrey';
        pre.style.margin = '0';
        current_customizations = pre;
        code.appendChild(pre);
        elm.appendChild(code);
        return elm;
    }());

    elm.style.margin = '1em';

    return elm;
}());

less.registerStylesheets()
    .then(() => less.refresh(true))
    .then(() => update());
