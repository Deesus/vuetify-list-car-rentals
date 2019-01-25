import * as ACTION from '../typesActions';
import * as MUTATION from '../typesMutations';
import * as CONST from '../../appConstants';


export default {

    // ==================== state: ====================
    state: {
        listFilterCostLowerBound: CONST.LIST_FILTER.COST_LOWER_BOUND_DEFAULT_VALUE,
        listFilterCostUpperBound: CONST.LIST_FILTER.COST_UPPER_BOUND_DEFAULT_VALUE,
        listFilterCarModel: '',
        listFilterLocation: '',
        // TODO: add sort direction
        // TODO: add rows-per-page
    },

    // ==================== getters: ====================
    getters: {

    },

    // ==================== mutations: ====================
    mutations: {
        [MUTATION.SET_LIST_FILTER_COST_LOWER_BOUND](state, val) {
            // if user input is a number, set state; otherwise, do nothing:
            if ( isNaN(parseFloat(val)) === false){
                state.listFilterCostLowerBound = val;
            }
        },

        [MUTATION.SET_LIST_INPUT_COST_UPPER_BOUND](state, val) {
            // if user input is a number, set state; otherwise, set to default:
            if ( isNaN(parseFloat(val)) === false) {
                state.listFilterCostUpperBound = val;
            }
            // TODO: this is causing issues when field is cleared; perhaps need to do this check in the input update handler instead:
            else if (val.toString().trim() === '') {
                state.listFilterCostUpperBound = CONST.LIST_FILTER.COST_UPPER_BOUND_DEFAULT_VALUE;
            }
        },

        [MUTATION.SET_LIST_INPUT_FILTER_CAR_MODEL](state, val) {
            // only set state if user input is not an empty string:
            let trimmedValue = val.trim();

            if (trimmedValue !== '') {
                state.listFilterCarModel = val;
            }
        },

        [MUTATION.SET_LIST_FILTER_LOCATION](state, val) {
            // only set state if user input is not an empty string:
            let trimmedValue = val.trim();

            if (trimmedValue !== '') {
                state.listFilterLocation = val;
            }
        }
    },

    // ==================== actions: ====================
    actions: {

    }
}
