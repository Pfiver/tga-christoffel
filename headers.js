const section_headers = {
    todo: 0,
    index: 1,
    haus: 2,
    preise: 3,
    aktivitaeten: 4,
    anreise: 5,
    kontaktmiete: 6,
    belegungskalender: 7
};

export function go(section) {
    const header = document.getElementsByTagName("header")[0];
    const secnum = section_headers[section];
    let classnam = `header-${secnum}-`;
    if (secnum === 1) {
        classnam += getSeason();
    }
    else {
        classnam += getVariant();
    }
    header.className = classnam;
    console.log("header: " + classnam);
}

function getSeason() {

    const m = new Date().getMonth() + 1;

    if ([3, 4, 5, 6, 7, 8].indexOf(m)) return "1";
    if ([9, 10, 11].indexOf(m)) return "2";
    if ([12, 1, 2].indexOf(m)) return "3";

    throw new Error("What month is it actually ???");
}
function getVariant() {

    const d = new Date().getDay();

    return (d % 2) === 0 ? "a" : "b";
}
