import MultiFilters from "../src/utils/MultiFilters";
import * as CONST from "../src/appConstants";



describe('MultiFilters', () => {

    // ==================== setup: ====================
    let mfInstance;
    let mockItems;
    let mockHeaders;
    let mockFilter;
    let mockFilters;

    // create a mock Vuex store before each test:
    beforeEach( ()=> {
        mockItems = [];

        mockHeaders = [
            { align: 'right', value: 'location' },
            { align: 'left', value: 'model' },
            { align: 'right', value: 'year' }
        ];

        mockFilter = (searchTerm, items) => {
            return items.filter((item) => item === searchTerm);
        };

        mockFilters = {
            filter1: mockFilter,
            filter2: mockFilter
        };


        mfInstance = new MultiFilters(mockItems, mockFilters, mockFilter, mockHeaders);
    });


    // ==================== tests: ====================
    it('should update filters when "update filters" is called', () => {
        const newObj = MultiFilters.updateFilters(mockFilter, { [CONST.LIST_FILTER.FILTER_COST_UPPER_BOUND]: 1000 });
        expect(mfInstance).not.toEqual(newObj);
    });

    it('should add a new filter to the instance when a filter is registered', () => {
        const newFilterName = 'newFilter';
        const newFilter = () => null;

        expect(mfInstance.filterCallbacks).toEqual({});

        mfInstance.registerFilter(newFilterName, newFilter);

        expect(mfInstance.filterCallbacks).toEqual({
            [newFilterName]: newFilter
        });
    });
});
