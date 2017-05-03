import React from "react";
import ReactDOM from "react-dom";
import ColorPicker from "rc-color-picker";
import Less from "less/lib/less-browser";

console.log("OK");

const less = new Less(window, {onReady: false, useFileCache: true});

const custom_vars = {};

const alternative_vars = ((colorChooser, buttons) => [
    {
        name: "Primär-Farbe",
        var: '@primary',
        value: "#ffffff",
        control: colorChooser()
    },
    {
        name: "Header-Text-Schatten-Form",
        var: '@header-text-shadow-shape',
        value: "0 0",
        control: buttons([
            "2px 2px",
            "8px 8px 8px"
        ])
    },
    {
        name: "Header-Text-Schatten-Farbe",
        var: '@header-text-shadow',
        value: "#000000",
        control: buttons([
            "fade(black, 50%)",
            "fade(black, 12%)",
            "white",
            "fade(white, 50%)",
            "fade(white, 12%)",
            "@complement",
            "fade(@complement, 50%)",
            "fade(@complement, 12%)"
        ])
    },
    {
        name: "Seiten-Schatten-Form",
        var: '@page-shadow-shape',
        value: "0 0",
        control: buttons([
            "8px 8px",
            "0 8px 44px 4px"
        ])
    },
    {
        name: "Seiten-Schatten-Farbe",
        var: '@page-shadow',
        value: "#000000",
        control: buttons([
            "fade(black, 50%)",
            "fade(black, 12%)",
            "white",
            "fade(white, 50%)",
            "fade(white, 12%)",
            "@complement",
            "fade(@complement, 50%)",
            "fade(@complement, 12%)"
        ])
    }
])(
    () => function () {
        return mkColorChooser(this);
    }
    , variants => function () {
        return mkVarDropdown(this, variants);
    }
);

function update(var_, val) {
    if (typeof var_ !== 'undefined') {
        custom_vars[var_] = val;
    }
    less.modifyVars(custom_vars);
    current_customizations.innerHTML = Object.keys(custom_vars).map(function (k) {
        return k + ": " + custom_vars[k] + ";";
    }).join("\n");
}

function mkColorChooser(var_) {
    custom_vars[var_.var] = var_.value;
    const elm = document.createElement('span');
    elm.style.vertAlign = 'center';
    ReactDOM.render(React.createElement(ColorPicker, {
        color: var_.value,
        mode: 'RGB', onChange: val => {
            const newVal = `hsva(${val.hsv.h}, ${val.hsv.s}%, ${val.hsv.v}%, ${val.alpha/100})`;
            console.log(`${var_.var}: ${newVal}`);
            update(var_.var, newVal);
        }
    }), elm);
    return elm;
}

function mkVarDropdown(var_, variants) {
    custom_vars[var_.var] = var_.value;
    const elm = document.createElement('select');
    [var_.value].concat(variants).forEach(val => {
        const el = document.createElement('option');
        el.setAttribute("value", val);
        el.innerHTML = val;
        elm.appendChild(el);
    });
    elm.onchange = e => update(var_.var, elm.options[elm.selectedIndex].value);
    return elm;
}

let current_customizations;

document.body.appendChild(function () {
    const elm = document.createElement('div');

    alternative_vars.forEach(function (v) {
        elm.appendChild(document.createTextNode(v.name + ": "));
        elm.appendChild(v.control());
        elm.appendChild(document.createElement('br'));
    });

    elm.appendChild(function () {
        const elm = document.createElement('div');
        elm.appendChild(document.createTextNode("Momentane Konfiguration: "));
        const code = document.createElement('code');
        code.style.display = 'inline-block';
        code.style.verticalAlign = 'top';
        const pre = document.createElement('pre');
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
    .then(() => less.refresh(true, custom_vars)).then(() => update());