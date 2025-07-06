export function StringToURL(string: string) {
    if (string === undefined) return "";
    return string.toLowerCase().split(" ").join('-');
}