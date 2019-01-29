import * as CONST from "../../src/appConstants";
import { mockFullDataList } from "../__helpers__/_mockData";
import { searchFilterFindByKeyword, inputIsValidNumber } from "../../src/utils/utils";


describe('searchFilterFindByKeyword function', () => {

    // ==================== setup: ====================
    let mockFullList;
    beforeEach( ()=> {
        // use a fresh copy of the full list each time to ensure side effects don't affect our tests:
        mockFullList = [...mockFullDataList];
    });


    // ==================== tests: ====================
    it("given the 'filter field,' should filter by the user's 'search term' on the 'filter field'", () => {
        expect(searchFilterFindByKeyword('white', mockFullList, CONST.DATA_ITEM_PROPERTY.CAR_COLOR).length)
            .toBe(2);

        expect(searchFilterFindByKeyword('white', mockFullList, CONST.DATA_ITEM_PROPERTY.CAR_COLOR))
            .toContainEqual({
                [CONST.DATA_ITEM_PROPERTY.CAR_COLOR]: 'white',
                [CONST.DATA_ITEM_PROPERTY.CAR_MODEL]: 'Accord',
                [CONST.DATA_ITEM_PROPERTY.CAR_MODEL_YEAR]: '2012',
                [CONST.DATA_ITEM_PROPERTY.LOCATION]: 'St. Petersburg',
                [CONST.DATA_ITEM_PROPERTY.COST]: '917'
            });

        expect(searchFilterFindByKeyword('white', mockFullList, CONST.DATA_ITEM_PROPERTY.CAR_COLOR))
            .toContainEqual({
                [CONST.DATA_ITEM_PROPERTY.CAR_COLOR]: 'white',
                [CONST.DATA_ITEM_PROPERTY.CAR_MODEL]: 'Civic',
                [CONST.DATA_ITEM_PROPERTY.CAR_MODEL_YEAR]: '2004',
                [CONST.DATA_ITEM_PROPERTY.LOCATION]: 'Delhi',
                [CONST.DATA_ITEM_PROPERTY.COST]: '1343'
            });

        expect(searchFilterFindByKeyword('Beijing', mockFullList, CONST.DATA_ITEM_PROPERTY.LOCATION))
            .toEqual([
                {
                    [CONST.DATA_ITEM_PROPERTY.CAR_COLOR]: 'silver',
                    [CONST.DATA_ITEM_PROPERTY.CAR_MODEL]: 'Sonata',
                    [CONST.DATA_ITEM_PROPERTY.CAR_MODEL_YEAR]: '2012',
                    [CONST.DATA_ITEM_PROPERTY.LOCATION]: 'Beijing',
                    [CONST.DATA_ITEM_PROPERTY.COST]: '2108'
                }
            ]);

        expect(searchFilterFindByKeyword('Roadster', mockFullList, CONST.DATA_ITEM_PROPERTY.CAR_MODEL))
            .toEqual([
                {
                    [CONST.DATA_ITEM_PROPERTY.CAR_COLOR]: 'light blue',
                    [CONST.DATA_ITEM_PROPERTY.CAR_MODEL]: 'Roadster',
                    [CONST.DATA_ITEM_PROPERTY.CAR_MODEL_YEAR]: '2008',
                    [CONST.DATA_ITEM_PROPERTY.LOCATION]: 'Mumbai',
                    [CONST.DATA_ITEM_PROPERTY.COST]: '3129'
                }
            ]);

        expect(searchFilterFindByKeyword('1999', mockFullList, CONST.DATA_ITEM_PROPERTY.CAR_MODEL_YEAR))
            .toEqual([
                {
                    [CONST.DATA_ITEM_PROPERTY.CAR_COLOR]: 'yellow',
                    [CONST.DATA_ITEM_PROPERTY.CAR_MODEL]: 'Prius',
                    [CONST.DATA_ITEM_PROPERTY.CAR_MODEL_YEAR]: '1999',
                    [CONST.DATA_ITEM_PROPERTY.LOCATION]: 'San Francisco',
                    [CONST.DATA_ITEM_PROPERTY.COST]: '302'
                }
            ]);
    });

    it("'search term' is not case sensitive", () => {
        expect(searchFilterFindByKeyword('BEIJING', mockFullList, CONST.DATA_ITEM_PROPERTY.LOCATION))
            .toContainEqual({
                [CONST.DATA_ITEM_PROPERTY.CAR_COLOR]: 'silver',
                [CONST.DATA_ITEM_PROPERTY.CAR_MODEL]: 'Sonata',
                [CONST.DATA_ITEM_PROPERTY.CAR_MODEL_YEAR]: '2012',
                [CONST.DATA_ITEM_PROPERTY.LOCATION]: 'Beijing',
                [CONST.DATA_ITEM_PROPERTY.COST]: '2108'
            });
    });

    it("should return the entire list if search term contains only whitespace", () => {
        const originalArray = [...mockFullList];

        expect(searchFilterFindByKeyword(" ", mockFullList, CONST.DATA_ITEM_PROPERTY.CAR_MODEL_YEAR))
            .toEqual(originalArray);

        expect(searchFilterFindByKeyword("        ", mockFullList, CONST.DATA_ITEM_PROPERTY.CAR_COLOR))
            .toEqual(originalArray);

        expect(searchFilterFindByKeyword("\n", mockFullList, CONST.DATA_ITEM_PROPERTY.LOCATION))
            .toEqual(originalArray);

        expect(searchFilterFindByKeyword('    1999     ', mockFullList, CONST.DATA_ITEM_PROPERTY.CAR_MODEL_YEAR).length)
            .toBe(1);
    });

    it("should return an empty array if no matches between the 'search term' and 'filter field' are found in the list", () => {
        expect(searchFilterFindByKeyword("meow meow meow", mockFullList, CONST.DATA_ITEM_PROPERTY.CAR_MODEL))
        .toEqual([]);

        expect(searchFilterFindByKeyword('red', mockFullList, CONST.DATA_ITEM_PROPERTY.LOCATION))
        .toEqual([]);
    });

    it("should not mutate the array obtained from the database (full list)", () => {
        const originalArray = [...mockFullList];

        searchFilterFindByKeyword("Taurus", mockFullList, CONST.DATA_ITEM_PROPERTY.CAR_MODEL);
        searchFilterFindByKeyword("SD F 49$ !$&)!% !J| ==  -1fjf FJ", mockFullList, CONST.DATA_ITEM_PROPERTY.CAR_MODEL_YEAR);
        searchFilterFindByKeyword("  ", mockFullList, CONST.DATA_ITEM_PROPERTY.LOCATION);
        searchFilterFindByKeyword("Boston", mockFullList, CONST.DATA_ITEM_PROPERTY.LOCATION);
        searchFilterFindByKeyword("black", mockFullList, CONST.DATA_ITEM_PROPERTY.CAR_COLOR);

        expect(mockFullList).toEqual(originalArray);
    });
});


describe('inputIsValidNumber function', () => {
    it("should reject everything except String and Number types", () => {
        expect(inputIsValidNumber(null)).toBeFalsy();
        expect(inputIsValidNumber(undefined)).toBeFalsy();
        expect(inputIsValidNumber(NaN)).toBeFalsy();
        expect(inputIsValidNumber({})).toBeFalsy();
        expect(inputIsValidNumber([])).toBeFalsy();
        expect(inputIsValidNumber([1])).toBeFalsy();
    });

    it("should reject non-number strings", () => {
        expect(inputIsValidNumber('')).toBeFalsy();
        expect(inputIsValidNumber('   ')).toBeFalsy();
        expect(inputIsValidNumber('abc')).toBeFalsy();
        expect(inputIsValidNumber('*')).toBeFalsy();
    });

    it("should return only boolean values", () => {
        expect(inputIsValidNumber('abc')).toBeFalsy();
        expect(inputIsValidNumber('123')).toBeTruthy();
    });

    it("should accept string numbers as valid", () => {
        expect(inputIsValidNumber('123.44')).toBeTruthy();
        expect(inputIsValidNumber('0.273')).toBeTruthy();
        expect(inputIsValidNumber('0')).toBeTruthy();
        expect(inputIsValidNumber('-3435')).toBeTruthy();
    });

    it("should accept all integers and floats", () => {
        expect(inputIsValidNumber(0)).toBeTruthy();
        expect(inputIsValidNumber(89873)).toBeTruthy();
        expect(inputIsValidNumber(-345873)).toBeTruthy();
        expect(inputIsValidNumber(34.245)).toBeTruthy();
        expect(inputIsValidNumber(-734.900)).toBeTruthy();
    });

    it("should ignore any commas when deciding if it's a valid number", () => {
        expect(inputIsValidNumber('324234,30')).toBeTruthy();
        expect(inputIsValidNumber('1,000')).toBeTruthy();
        expect(inputIsValidNumber(',000')).toBeTruthy();
        expect(inputIsValidNumber('9,')).toBeTruthy();
        expect(inputIsValidNumber(',')).toBeFalsy();
    });
});
