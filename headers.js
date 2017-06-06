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
    let classnam = `header-${secnum}`;
    if (secnum === 1) {
        classnam += "-1";
    }
    else {
        classnam += "-a";
    }
    header.className = classnam;
}
