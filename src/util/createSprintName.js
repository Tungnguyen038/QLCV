
const prefix = 'Sprint';

function createSprintName(arrName = []) {
    if (!Array.isArray(arrName)) return;
    if (arrName.length === 0) {
        return `${prefix} 1`;
    } else {
        return `${prefix} ${arrName.length + 1}`;
    }
}
export default createSprintName;