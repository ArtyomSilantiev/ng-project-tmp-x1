export class Utils {
    public static paddy(num, padlen, padchar?) {
        const pad_char = typeof padchar !== 'undefined' ? padchar : '0';
        const pad = new Array(1 + padlen).join(pad_char);
        return (pad + num).slice(-pad.length);
    }

    public static sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    public static stringToUint8Arrau(string) {
        const charList = string.split('');
        const uintArray = [];
        for (let i = 0; i < charList.length; i++) {
            uintArray.push(charList[i].charCodeAt(0));
        }
        return new Uint8Array(uintArray);
    }

    public static uint8ArrauToString(uintArray) {
        const string = String.fromCharCode.apply(null, uintArray);
        return string;
    }
}
