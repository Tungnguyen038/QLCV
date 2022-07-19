
const createKey = (name) => {
    if(!name) return;
    let result = '';
    let words = name.trim().split(' ');
    words = words.map(word => word.trim());
    if(words.length === 1) {
        if(words[0].length === 1) {
            result = words[0].slice(0, 1).toUpperCase() + 'P';
        }else {
            result = words[0].slice(0, 2).toUpperCase();
        }
    }else {
        // eslint-disable-next-line array-callback-return
        result = words.reduce((initValue, word) => {
            return initValue + word.slice(0, 1).toUpperCase();
        }, result)
    }
    return result;
}
export default createKey;