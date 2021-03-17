export function RemoveExtension(input) {
    var index = input.indexOf(".");
    return input.slice(0, index);
}
