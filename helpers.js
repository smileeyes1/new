let innovationCounter = 1;
let creativityActive = false;

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, function(tag) {
        const chars = { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' };
        return chars[tag] || tag;
    });
}

function toEasternArabicDigits(num) {
    if (num === null || num === undefined) return '';
    const id = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return num.toString().replace(/[0-9]/g, function(w){ return id[+w]; });
}

function fromEasternArabicDigits(str) {
    if (!str) return "5";
    let converted = str.replace(/[٠-٩]/g, function(d) {
        return d.charCodeAt(0) - 1632;
    });
    return converted;
}

function formatEasternInput(element) {
    element.value = toEasternArabicDigits(element.value);
}

function seededRandom(seedStr) {
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
        hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const x = Math.sin(hash++) * 10000;
    return x - Math.floor(x);
}

function getRandomIntSeeded(min = 1, max = 10, seed) {
    if (min >= max) return min;
    return min + Math.floor(seededRandom(seed) * (max - min + 1));
}
