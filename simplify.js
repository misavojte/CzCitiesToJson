/**
 * Simplify Czech text for search.
 * @param text {string} - Czech text.
 * @returns {string} - Simplified text.
 */
const simplifyCzechTextForSearch = text => {
    text = text.replace(/ /g, "");
    text = text.replace(/-/g, "");
    const czechToBasic = {
        'á': 'a', 'č': 'c', 'ď': 'd', 'é': 'e', 'ě': 'e',
        'í': 'i', 'ň': 'n', 'ó': 'o', 'ř': 'r', 'š': 's',
        'ť': 't', 'ú': 'u', 'ů': 'u', 'ý': 'y', 'ž': 'z'
    };
    return Array.from(text.toLowerCase())
               .map(char => czechToBasic[char] || char)
               .join('');
};