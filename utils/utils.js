export const convertDateToString = (date) => {
    return date.toISOString().slice(0, 10);
}