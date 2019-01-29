export const FIREBASE = Object.freeze({
    REFERENCE_NODE:                  'rentals/',   // the name of the node we specified for our project (from our Firebase console)
    SORT_ASCENDING:                  'ASC',
    SORT_DESCENDING:                 'DESC'
});

export const DATA_ITEM_PROPERTY = Object.freeze({
    CAR_MODEL:      'car_model',
    CAR_MODEL_YEAR: 'car_model_year',
    CAR_COLOR:      'car_color',
    COST:           'cost',
    LOCATION:       'location_city',
    DESCRIPTION:    'description'
});

export const LIST_FILTER = Object.freeze({
    // names of search filters:
    FILTER_CAR_MODEL:          'searchFilterCarModelChanged',
    FILTER_CAR_MODEL_YEAR:     'searchFilterCarModelYear',
    FILTER_COST_LOWER_BOUND:   'filterCostLowerBound',
    FILTER_COST_UPPER_BOUND:   'filterCostUpperBound',
    FILTER_LOCATION:           'searchFilterLocation',

    // misc. filter-related constants:
    COST_UPPER_BOUND_DEFAULT_VALUE: "", // don't use `Infinity` because Vuex(?) gets confused and returns `null`
    COST_LOWER_BOUND_DEFAULT_VALUE: ""
});


// n.b. the pagination property names are given by Vuetify's API, therefore the strings should never be changed:
export const PAGINATION_PROPERTY_NAME = Object.freeze({
    SORT_BY:                'sortBy',
    SHOULD_SORT_DESCENDING: 'descending',
    ROWS_PER_PAGE:          'rowsPerPage'
});


export const IMG_PATH = Object.freeze({
    SPLASH_BACKGROUND:   require('@/assets/inside_car_at_night.jpg'),
    DETAIL_ICON_MINIBUS: require('../src/assets/icons/minibus.svg'),
    DETAIL_ICON_AUTO:    require('../src/assets/icons/automobile.svg'),
    DETAIL_ICON_TRUCK:   require('../src/assets/icons/delivery-truck.svg')
});
