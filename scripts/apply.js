function updateText(text, syllableRegex) {
    text = text.trim();
    if (text) {
        newText = "";
        for (const word of text.split(" ")) {
            if (word.includes("<") || word.includes(">")) {
                newText += word+" ";
                continue;
            }
            syllables = word.match(syllableRegex);
            
            if (!syllables) {
                newText += word;

            } else if (syllables.length > 2) {
                firstSyllable = "<b>" + syllables[0]+syllables[1] + "</b>";
                lastSyllables = syllables.slice(2, syllables.length).join("");
                newText += firstSyllable+lastSyllables+" ";

            } else if (syllables.length > 1) {
                firstSyllable = "<b>" + syllables[0] + "</b>";
                lastSyllables = syllables.slice(1, syllables.length).join("");
                newText += firstSyllable+lastSyllables+" ";

            } else if (syllables.length == 1) {
                match = word.match(/[bcdfghjklmnpqrstvwxz]*[aeiouy]/im);

                if (match[0].length == 1) {
                    // newText += word+" ";
                    firstPart = "<b>" + match[0].substr(0, match[0].length) + "</b>";
                    lastPart = word.substr(match[0].length, word.length);
                    newText += firstPart+lastPart+" "
                    
                } else {
                    firstPart = "<b>" + match[0].substr(0, match[0].length-1) + "</b>";
                    lastPart = word.substr(match[0].length-1, word.length);
                    newText += firstPart+lastPart+" "
                }
            }
        }
        return newText
    }
    return "";
}

function replace(syllableRegex) {
    for (const p of document.getElementsByTagName("p")) {
        p.innerHTML = updateText(p.innerHTML, syllableRegex);
    }
}

replace(/[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gim);
