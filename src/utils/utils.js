/**
 * Filter function by search keyword
 *
 * @param searchTerm {String}: keywords in search field
 * @param fullList {Array}: entire list of items in table/database
 * @param itemFieldToFilter {String}: field/column/property to be filtered
 *
 * @returns {Array}: filtered list
 */
export const searchFilterFindByKeyword = (searchTerm, fullList, itemFieldToFilter) => {
    const formattedSearchTerm = searchTerm.trim().toLowerCase();

    if (formattedSearchTerm === '') {
        return fullList;
    }
    else {
        return fullList.filter( (item) => {
            return item[itemFieldToFilter]
                   .toLowerCase()
                   .includes(formattedSearchTerm);
        }, formattedSearchTerm);
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

    // only number and string types are valid:
    if ( (typeof input === 'number' ) ||
         (typeof input === 'string')) {

        // cast to string, trim, and remove all commas:
        let inputToValidate = input.toString()
                                   .trim()
                                   .replace(/,/g, '');

        return ((inputToValidate !== '') && (isNaN(inputToValidate) === false));
    }
    else {
        return false;
    }
};
