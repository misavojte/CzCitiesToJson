/**
 * Simplify Czech text for search. This function removes all diacritics and spaces.
 * Must be used for searching in Czech municipalities.
 * @param text {string} - Czech text.
 * @returns {string} - Simplified text.
 * @example simplifyCzechTextForSearch('Český Těšín') // 'ceskytesin'
 */
const simplifyCzechTextForSearch = text => {
    text = text.replace(/ /g, "");
    text = text.replace(/-/g, "");
    text = text.replace(/–/g, "");
    const czechToBasic = {
        'á': 'a', 'č': 'c', 'ď': 'd', 'é': 'e', 'ě': 'e',
        'í': 'i', 'ň': 'n', 'ó': 'o', 'ř': 'r', 'š': 's',
        'ť': 't', 'ú': 'u', 'ů': 'u', 'ý': 'y', 'ž': 'z'
    };
    return Array.from(text.toLowerCase())
               .map(char => czechToBasic[char] || char)
               .join('');
};

/**
 * Returns array of municipalities that match the search query
 * @param query {string} - Search query - municipality name which went through simplifyCzechTextForSearch() function
 * @param municipalityJson {{id: number, label: string, simpleName: string}[]} - Array of municipalities, provided in output.json
 * @returns {{value: number, label: string}[]} - Array of municipalities that match the search query, where value is the id of the municipality
 * @example searchInMunicipalities('ceskytesin', municipalities) // [{value: 1, label: 'Český Těšín (okres Karviná)'}]
 * @example searchInMunicipalities('adamov', municipalities) // [{value: 581291, label: 'Adamov (okres Blansko)'}, {value: 531367, label: 'Adamov (okres Kutná Hora)'}, {value: 535826, label: 'Adamov (okres České Budějovice)'}]
 */

const searchInMunicipalities = (query, municipalityJson) => {
    return municipalityJson
        .filter(municipality => municipality.simpleName.includes(query))
        .map(municipality => ({value: municipality.id, label: municipality.label}));
}