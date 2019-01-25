/**
 * Filter function that
 *
 * @param searchTerm {String}: keywords in search field
 * @param items {Array}: list of items in table/list
 * @param itemFieldToFilter {String}: field/column/property to be filtered
 *
 * @returns {Array}: filtered list
 */
const searchFilterFindByKeyword = (searchTerm, items, itemFieldToFilter) => {
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


// ==================== exports: ====================
export {
    searchFilterFindByKeyword
};
