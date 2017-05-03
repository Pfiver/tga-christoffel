const yql = "http://query.yahooapis.com/v1/public/yql";
const yql_url_query = url => "q=" + encodeURIComponent(`select * from html where url="${url}"`);
const savognin_calendar = "http://shop.savognin.ch/Savognin/ukv/ajax/calendar/TDS00020010019636959?date=";

const foot = document.getElementsByTagName("footer")[0];

export function show_calendar() {

    ["2017-05", "2017-07", "2017-09", "2017-11", "2018-01", "2018-03"].forEach(date => {

        let elm = document.createElement("div");
        foot.parentElement.insertBefore(elm, foot);

        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                elm.innerHTML = getElementByXpath(this.responseXML, "//query/results/body").innerHTML;
            }
        };
        request.open('GET', yql + "?" + yql_url_query(savognin_calendar + date), true);
        request.send(null);
    });
}

function getElementByXpath (doc, expr) {
    return doc.evaluate(expr, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
