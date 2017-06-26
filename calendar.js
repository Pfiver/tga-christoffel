const yql = "https://query.yahooapis.com/v1/public/yql";
const yql_urls_query = urls => "q=" + encodeURIComponent(
    `select * from htmlstring where url in (${urls.map(JSON.stringify)})`);
const yenv = "env=" + encodeURIComponent("store://datatables.org/alltableswithkeys");

const savognin_calendar = "https://shop.savognin.ch/Savognin/ukv/ajax/calendar/TDS00020010019636959?date=";

export function show(section) {

    if (section.childElementCount > 0) {
        return;
    }

    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let div;
            const results = getElementsByXpath(this.responseXML, "//query/results/result");
            for (let result = results.iterateNext(); result; result = results.iterateNext()) {
                div = document.createElement("div");
                div.setAttribute("class", "tt-cal-legend-hide");
                div.innerHTML = result.innerHTML;
                div.innerHTML = div.innerText;
                section.appendChild(div);
            }
            div.removeAttribute("class");
        }
    };

    // request.open('GET', "calendar-data.xml", true);
    request.open('GET', getQueryUrl(), true);
    request.send(null);
}

function getElementsByXpath (doc, expr) {
    return doc.evaluate(expr, doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
}

function getQueryUrl() {
    const calendar_urls = getDates()
        .map(date => savognin_calendar + date);
    return yql + "?" + yql_urls_query(calendar_urls) + "&" + yenv;
}

function getDates() {
    const y = new Date().getYear() + 1900;
    const m0 = new Date().getMonth();
    const dates = [];
    for (let m = m0; m < m0 + 12; m += 2) {
        dates.push(new Date(Date.UTC(y, m, 1)).toISOString().substring(0, 7));
    }
    return dates;
}
