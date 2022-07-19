
function sorter(originArray, sortingArray) {
    if (!Array.isArray(originArray) && !Array.isArray(sortingArray)) {
        throw new Error('Sorter function should be passed two arguments with type of array')
    }
    originArray.sort((a, b) => {
        return sortingArray.indexOf(a.id) - sortingArray.indexOf(b.id);
    })
    return originArray;
}
export default sorter