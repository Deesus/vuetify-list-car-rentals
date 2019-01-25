const FIREBASE = Object.freeze({
    LIMIT_RESULTS_TO_DEFAULT_NUMBER: 25,
    REFERENCE_NODE:                  'rentals/',   // the name of the node we specified for our project (from our Firebase console)
    SORT_ASCENDING:                  'ASC',
    SORT_DESCENDING:                 'DESC'
});

const DATA_ITEM_PROPERTY = Object.freeze({
    CAR_MODEL:      'car_model',
    CAR_MODEL_YEAR: 'car_model_year',
    CAR_COLOR:      'car_color',
    COST:           'cost',
    LOCATION:       'location_city'
});

const LIST_FILTER = Object.freeze({
    // names of search filters:
    FILTER_CAR_MODEL:          'searchFilterCarModelChanged',
    FILTER_CAR_MODEL_YEAR:     'searchFilterCarModelYear',
    FILTER_CAR_COLOR:          'searchFilterCarColor',
    FILTER_COST_LOWER_BOUND:   'filterCostLowerBound',
    FILTER_COST_UPPER_BOUND:   'filterCostUpperBound',
    FILTER_LOCATION:           'searchFilterLocation',

    // misc. filter-related constants:
    COST_UPPER_BOUND_DEFAULT_VALUE: 9999999999, // don't use `Infinity` because Vuex(?) gets confused and returns `null`
    COST_LOWER_BOUND_DEFAULT_VALUE: 0
});


// ==================== exports: ====================
export {
    DATA_ITEM_PROPERTY,
    FIREBASE,
    LIST_FILTER
};
