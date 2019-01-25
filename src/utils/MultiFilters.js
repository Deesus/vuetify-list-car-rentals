/**
 * Allows multiple filters on Vuetify data-tables
 *
 * N.b. parameters should already be bound to `v-data-table`; thus, usage should always be the same.
 */
export default class {

    constructor(items, filters, filter, headers) {
        this.items           = items;
        this.filter          = filter;
        this.headers         = headers;
        this.filters         = filters;
        this.filterCallbacks = {};
    }


    // ==================== methods: ====================
    /**
     * Updates filter values.
     *
     * @param filters {Object}: filter object
     * @param val {Object}: JSON chunk to be updated
     *
     * @returns {Object}: Updated filter object
     */
    static updateFilters(filters, val) {
        return Object.assign({}, filters, val);
    }

    /**
     * Registers a new filter.
     *
     * @param filterName {String}: Filter name from which the information will be extracted
     * @param filterCallback {Function}: Filter function that computes what gets filtered
     */
    registerFilter(filterName, filterCallback) {
        this.filterCallbacks[filterName] = filterCallback;
    }

    /**
     * Run all filters.
     *
     * @returns {Object}: Object of filters
     */
    runFilters() {
        const self = this;
        let filteredItems = self.items;

        Object.entries(this.filterCallbacks)
            .forEach(([entity, cb]) => {
                filteredItems = cb.call(self, self.filters[entity], filteredItems);
            });

        return filteredItems;
    }
};
