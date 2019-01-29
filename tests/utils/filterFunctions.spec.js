import * as CONST from "../../src/appConstants";
import { mockFullDataList } from '../__helpers__/_mockData';
import { filterCostByUpperBound, filterCostByLowerBound } from '../../src/utils/filterFunctions';


describe('filterCostByUpperBound function', () => {

    // ==================== setup: ====================
    let mockFullList;
    let lengthMockFullList;

    beforeEach(() => {
        // use a fresh copy of the full list each time to ensure side effects don't affect our tests:
        mockFullList = [...mockFullDataList];
        lengthMockFullList = mockFullList.length;
    });


    // ==================== tests: ====================
     it("should return all the items whose cost is lower than or equal to the upper bound", () => {
         expect(filterCostByUpperBound('3500', mockFullList).length).toBe(10);
         expect(filterCostByUpperBound('1000', mockFullList).length).toBe(5);
         expect(filterCostByUpperBound('1000', mockFullList)).toContainEqual({
            [CONST.DATA_ITEM_PROPERTY.CAR_COLOR]: 'white',
            [CONST.DATA_ITEM_PROPERTY.CAR_MODEL]: 'Accord',
            [CONST.DATA_ITEM_PROPERTY.CAR_MODEL_YEAR]: '2012',
            [CONST.DATA_ITEM_PROPERTY.LOCATION]: 'St. Petersburg',
            [CONST.DATA_ITEM_PROPERTY.COST]: '917'
        });
     });

     it("should return the entire list of items if the input is an invalid number", () => {
         expect(filterCostByUpperBound('bark bark bark', mockFullList).length).toBe(lengthMockFullList);
         expect(filterCostByUpperBound('', mockFullList).length).toBe(lengthMockFullList);
         expect(filterCostByUpperBound('   ', mockFullList).length).toBe(lengthMockFullList);
     });

     it("should return an empty list if the upper bound is lower than any of the items' cost", () => {
         expect(filterCostByUpperBound('0', mockFullList)).toEqual([]);
         expect(filterCostByUpperBound('1', mockFullList)).toEqual([]);
     });
});


describe('filterCostByLowerBound function', () => {

    // ==================== setup: ====================
    let mockFullList;
    let lengthMockFullList;

    beforeEach(() => {
        // use a fresh copy of the full list each time to ensure side effects don't affect our tests:
        mockFullList = [...mockFullDataList];
        lengthMockFullList = mockFullList.length;
    });


    // ==================== tests: ====================
    it("should return all the items whose cost is greater than or equal to the lower bound", () => {
        expect(filterCostByLowerBound('1000', mockFullList).length).toBe(6);
        expect(filterCostByLowerBound('1000', mockFullList)).toContainEqual(    {
            [CONST.DATA_ITEM_PROPERTY.CAR_COLOR]: 'light blue',
            [CONST.DATA_ITEM_PROPERTY.CAR_MODEL]: 'Roadster',
            [CONST.DATA_ITEM_PROPERTY.CAR_MODEL_YEAR]: '2008',
            [CONST.DATA_ITEM_PROPERTY.LOCATION]: 'Mumbai',
            [CONST.DATA_ITEM_PROPERTY.COST]: '3129'
        });
        expect(filterCostByLowerBound('2335', mockFullList).length).toBe(4);
    });

    it("should return the entire list of items if the input is an invalid number", () => {
        expect(filterCostByLowerBound('woof', mockFullList).length).toBe(lengthMockFullList);
        expect(filterCostByLowerBound('gEJ!)! 158104 14- \n fj', mockFullList).length).toBe(lengthMockFullList);
        expect(filterCostByLowerBound('', mockFullList).length).toBe(lengthMockFullList);
        expect(filterCostByLowerBound('   ', mockFullList).length).toBe(lengthMockFullList);
    });

    it("should return an empty list if the lower bound is greater than any of the items' cost", () => {
        expect(filterCostByLowerBound('9999999', mockFullList)).toEqual([]);
    });
});
