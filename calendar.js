export function show(section) {

    if (section.querySelector(".tp-calendar")) {
        return;
    }

    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let div = document.createElement("div");
            div.classList.add("tp-calendar");
            let results = getElementsByXpath(this.responseXML, "/calendar-data/div");
            for (let result = results.iterateNext(); result; result = results.iterateNext()) {
                div.innerHTML += result.outerHTML + " ";
            }
            section.appendChild(div);
        }
    };

    request.open('GET', "calendar-data.xml", true);
    request.send(null);
}

function getElementsByXpath (doc, expr) {
    return doc.evaluate(expr, doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
}
