import { inputIsValidNumber } from './utils';


/**
 * Filters a list where the new list's items have a cost less than or equal to the user's upper bound.
 *
 * @param userInputUpperBound {String|Number}: Upper bound/max cost.
 * @param items {Array}: Full list of items from the database.
 *
 * @returns {Array}: Filtered list.
 */
export const filterCostByUpperBound = (userInputUpperBound, items) => {
    // if user input is a number, then filter list:
    if (inputIsValidNumber(userInputUpperBound) === true) {
        items = items.filter( (item) => {
            const itemCost = parseFloat(item.cost);
            return userInputUpperBound >= itemCost;
        });
    }

    return items;
};


/**
 * Filters a list where the new list's items have a cost greater than or equal to the user's upper bound.
 *
 * @param userInputLowerBound {String|Number}: Lower bound/max cost.
 * @param items {Array}: Full list of items from the database.
 *
 * @returns {Array}: Filtered list.
 */
export const filterCostByLowerBound = (userInputLowerBound, items) => {
    // if user input is a number, then filter list:
    if (inputIsValidNumber(userInputLowerBound) === true) {
        return items.filter( (item) => {
            const itemCost = parseFloat(item.cost);
            return userInputLowerBound <= itemCost;
        });
    }

    return items;
};
