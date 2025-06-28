export function StringToURL(string: string) {
    return string.toLowerCase().split(" ").join('-');
}