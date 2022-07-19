
const getDayBefore = () => {
    const today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1)
    return yesterday;
}
export default getDayBefore;
