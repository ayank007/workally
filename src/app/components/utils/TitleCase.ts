const MINOR_WORDS = new Set([
    // Minor words (Articles, Coordinating Conjunctions, Short Prepositions)
    'a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'yet', 'so',
    'at', 'by', 'in', 'of', 'on', 'to', 'up', 'as', 'is', 'if', 'off', 'via',
    'per', 'with', 'from'
]);

/**
 * Capitalizes the first letter of a token while preserving trailing punctuation/symbols.
 */
function capitalizeWord(token: string): string {
    if (!token) return token;

    // Separate the word content from trailing punctuation
    const match = token.match(/^([a-z0-9'-]+)(.*)$/i);
    if (!match) return token;

    const word = match[1];
    const punctuation = match[2];

    if (word.length === 0) return token;

    // Capitalize the word part
    const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    // Recombine with original punctuation
    return capitalizedWord + punctuation;
}

/**
 * Converts a string to Title Case based on a specified style guide.
 *
 * @param input The text to convert.
 * @param style 'AP' (Capitalize 4+ letter words) or 'APA' (Capitalize major words).
 * @returns The title-cased string.
 */
export function titleCaseByStyle(input: string, style: string): string {
    if (!input) return input;

    // Convert to lowercase and split the text, keeping the spaces/separators as separate tokens
    const parts = input.toLowerCase().split(/(\s+)/g);

    return parts.map((tok, idx) => {
        // 1. Skip if the token is just whitespace
        if (/^\s+$/.test(tok)) {
            return tok;
        }

        // 2. Extract the core word content for checking against rules
        const wordContentMatch = tok.match(/^([a-z0-9'-]+)/i);
        const lowerWord = wordContentMatch ? wordContentMatch[1].toLowerCase() : '';

        if (lowerWord.length === 0) {
            return tok;
        }
        
        // Define major positions: First word or word immediately after a colon
        const isFirst = idx === 0 || (idx > 0 && parts[idx - 1].includes(':'));
        const isLast = idx === parts.length - 1;

        let shouldCapitalize = true;
        
        // FIX: Always capitalize the single-letter pronoun 'i'
        if (lowerWord === 'i') {
            shouldCapitalize = true;
        } else if (style === 'AP') {
            // AP Style: Capitalize 4+ letter words. Lowercase 3-letter words (unless first/last/after colon).
            if (lowerWord.length < 4 && !isFirst && !isLast) {
                 shouldCapitalize = false;
            }
        } 
        else {
            // APA/Chicago/MLA Style (Major/Minor Word Rule): Lowercase minor words (unless first/last/after colon).
            if (MINOR_WORDS.has(lowerWord) && !isFirst && !isLast) {
                shouldCapitalize = false;
            }
        }
        
        if (shouldCapitalize) {
            return capitalizeWord(tok);
        } else {
            // Keep the word lowercase, preserving the original token's structure
            return tok.toLowerCase();
        }

    }).join('');
}