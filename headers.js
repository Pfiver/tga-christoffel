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

    const v = Math.floor(getMinutes() % 3);

    return v === 0 ? "1" : v === 1 ? "2" : "3";
}
function getVariant() {

    const v = Math.floor(getMinutes() % 2);

    return v === 0 ? "a" : "b";
}

function getMinutes() {

    return Math.floor((new Date().getTime() / 1000 / 60) % 60);
}
