const section_headers = {
    todo: 0,
    index: 1,
    haus: 2,
    preise: 3,
    aktivitaeten: 4,
    anfahrt: 5,
    kontaktmiete: 6,
    belegungskalender: 7
};

export function go(section) {
    const header = document.getElementsByTagName("header")[0];
    header.className = `header-${section_headers[section]}-1`;
}
