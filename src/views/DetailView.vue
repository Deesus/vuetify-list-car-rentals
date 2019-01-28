<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center row>
            <v-flex xs12 sm4>

                <v-card>
                    <v-layout>
                        <!-- ==================== card icon: ==================== -->
                        <v-flex xs4 class="pa-4">
                            <img class="card-icon" width="100" :src="getRandomIcon" alt=" ">
                        </v-flex>


                        <!-- ==================== card title: ==================== -->
                        <v-flex xs8>
                            <v-card-title primary-title>
                                <div>
                                    <h2 class="pb-1">
                                        <span>{{ car_model_year }}</span>&nbsp;<span>{{ car_model }}</span>
                                    </h2>

                                    <div>
                                        <span>Color: </span>
                                        <span class="grey--text">{{ car_color }}</span>
                                    </div>
                                    <div>
                                        <span>Location: </span>
                                        <span class="grey--text">{{ location_city }}</span>
                                    </div>
                                    <div>
                                        <span>Rental Cost for 1 Day: </span>
                                        <span class="grey--text">${{ cost }}</span>
                                    </div>
                                </div>
                            </v-card-title>
                        </v-flex>
                    </v-layout>


                    <!-- ==================== card text: ==================== -->
                    <v-card-text>
                        <div class="grey--text text--darken-1">
                            {{ description }}
                        </div>
                    </v-card-text>


                    <!-- ==================== card actions: ==================== -->
                    <v-card-actions class="text-xs-right">
                        <v-spacer/>
                        <v-btn flat color="blue" @click="handleBackButtonClick">Back</v-btn>
                    </v-card-actions>

                </v-card>

            </v-flex>
        </v-layout>
    </v-container>
</template>



<script>
    import * as CONST from "../appConstants";
    import { random } from "lodash";

    export default {
        name: "DetailView",

        iconPath: CONST.IMG_PATH.DETAIL_ICON_AUTO,

        props: {
            id: {
                required: true,
                type: String
            },
            [CONST.DATA_ITEM_PROPERTY.CAR_MODEL]: {
                required: true
            },
            [CONST.DATA_ITEM_PROPERTY.CAR_MODEL_YEAR]: {
                required: true
            },
            [CONST.DATA_ITEM_PROPERTY.CAR_COLOR]: {
                required: true
            },
            [CONST.DATA_ITEM_PROPERTY.LOCATION]: {
                required: true
            },
            [CONST.DATA_ITEM_PROPERTY.COST]: {
                required: true
            },
            [CONST.DATA_ITEM_PROPERTY.DESCRIPTION]: {
                required: true
            }
        },

        methods: {
            /**
             * Handle button back click; navigate back in router's history (i.e. home page)
             */
            handleBackButtonClick() {
                this.$router.go(-1);
            }
        },


        computed: {
            /**
             * Returns a random icon (path) for array of icons
             *
             * @returns {String}: src path of icon
             */
            getRandomIcon() {
                const arrIcons =  [ CONST.IMG_PATH.DETAIL_ICON_AUTO,
                                    CONST.IMG_PATH.DETAIL_ICON_MINIBUS,
                                    CONST.IMG_PATH.DETAIL_ICON_TRUCK ];
                return arrIcons[random(arrIcons.length-1)];
            }
        }
    }
</script>
