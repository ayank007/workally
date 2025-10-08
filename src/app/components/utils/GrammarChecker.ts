export function checkBasicGrammar(text: string): string {
    if (!text) return text;
    
    // Convert the entire text to lowercase initially to standardize, 
    // then fix capitalization issues in subsequent steps.
    let fixedText = text.toLowerCase();

    // --- 1. Fix Spacing Issues ---
    
    // Remove unnecessary space before common punctuation (e.g., "word ,")
    fixedText = fixedText.replace(/\s+([.,:;?!])/g, '$1');

    // Ensure there is only a single space between words
    fixedText = fixedText.replace(/\s{2,}/g, ' ');

    // --- 2. Fix Punctuation Spacing Issues ---
    
    // Ensure there is one space after punctuation marks followed by a letter (e.g., "word,word" -> "word, word")
    fixedText = fixedText.replace(/([.,:;?!])(\w)/g, '$1 $2');
    
    // Remove leading/trailing whitespace
    fixedText = fixedText.trim();


    // --- 3. Capitalization Fixes ---

    // Ensure the single-letter pronoun 'i' is always capitalized
    // \b is a word boundary, ensuring only the standalone letter 'i' is matched.
    fixedText = fixedText.replace(/\bi\b/g, 'I');

    // Capitalize the first letter of the entire string (Sentence Start)
    if (fixedText.length > 0) {
        fixedText = fixedText.charAt(0).toUpperCase() + fixedText.slice(1);
    }

    // Capitalize the first letter after sentence-ending punctuation 
    // (e.g., ". word" -> ". Word")
    // Finds .?! followed by optional whitespace and then the start of a word (\w)
    fixedText = fixedText.replace(/([.?!]\s+)([a-z])/g, (_match, separator, letter) => {
        return separator + letter.toUpperCase();
    });

    // --- 4. Ending Punctuation ---
    
    // Add a period if the text doesn't end with a common sentence terminator
    if (!/[.?!]$/.test(fixedText)) {
        fixedText += '.';
    }

    return fixedText;
}
