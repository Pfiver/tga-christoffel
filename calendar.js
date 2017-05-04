const yql = "http://query.yahooapis.com/v1/public/yql";
const yql_urls_query = urls => "q=" + encodeURIComponent(
    `select * from html where url in (${urls.map(JSON.stringify)})`);

let dates = ["2017-05", "2017-07", "2017-09", "2017-11", "2018-01", "2018-03"];

const savognin_calendar = "http://shop.savognin.ch/Savognin/ukv/ajax/calendar/TDS00020010019636959?date=";

export function show_calendar() {

    const section = document.getElementById("belegungs-kalender");

    if (section.childElementCount > 0) {
        return;
    }

    const calendar_urls = dates.map(date => savognin_calendar + date);
    let query_url = yql + "?" + yql_urls_query(calendar_urls);

    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let div;
            const results = getElementsByXpath(this.responseXML, "//query/results/body");
            for (let result = results.iterateNext(); result; result = results.iterateNext()) {
                div = document.createElement("div");
                div.setAttribute("class", "tt-cal-legend-hide");
                div.innerHTML += result.innerHTML;
                section.appendChild(div);
            }
            div.removeAttribute("class");
        }
    };

    // request.open('GET', query_url, true);
    request.open('GET', "calendar-data.xml", true);
    request.send(null);
}


function getElementsByXpath (doc, expr) {
    return doc.evaluate(expr, doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
}
