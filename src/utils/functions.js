/**
 * Filter function that
 *
 * @param searchTerm {String}: keywords in search field
 * @param items {Array}: list of items in table/list
 * @param itemFieldToFilter {String}: field/column/property to be filtered
 *
 * @returns {Array}: filtered list
 */
export const searchFilterFindByKeyword = (searchTerm, items, itemFieldToFilter) => {
    if (searchTerm.trim() === '') {
        return items;
    }
    else {
        return items.filter( (item) => {
            return item[itemFieldToFilter]
                .toLowerCase()
                .includes( searchTerm.toLowerCase() );
        }, searchTerm);
    }
};


/**
 * Checks if input is a valid number.
 * N.b. whitespace is not considered a 'valid' number.
 *
 * @param input: input to check -- n.b. argument can be any type
 * @returns {Boolean}: true if valid number; false if invalid number
 */
export const inputIsValidNumber = (input) => {
    return ((input.toString().trim() !== '') && (isNaN(input) === false));
};
