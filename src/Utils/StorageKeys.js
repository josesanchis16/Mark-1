
var characters = '_ABEJKRVyz01245WXYZaDfghijklSTUmnopqebcdC3rstuFGHIvwx6789';
const getKey = (key) => {
    let newString = '';
    window.btoa(key).split('').forEach(letter => {
        let index = characters.indexOf(letter);
        newString += characters[(index + 16) % characters.length];
    });
    return newString;
};

export const StorageKeys = {
    TOKEN: getKey('token'),
    ROLE: getKey('role'),
};