<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center row>
            <v-flex xs12 sm4>

                <v-card min-width="400" max-width="550">
                    <v-layout justify-start>
                        <!-- ==================== card icon: ==================== -->
                        <v-flex class="pa-4 card-icon">
                            <img width="100" :src="getRandomIcon" alt=" ">
                        </v-flex>


                        <!-- ==================== card title: ==================== -->
                        <v-flex>
                            <v-card-title primary-title>
                                <div>
                                    <h2 class="pb-1">
                                        <span>{{ $store.state.selectedItem.car_model_year }}</span>&nbsp;<span>{{ $store.state.selectedItem.car_model }}</span>
                                    </h2>

                                    <div>
                                        <span>Color: </span>
                                        <span class="grey--text">{{ $store.state.selectedItem.car_color }}</span>
                                    </div>
                                    <div>
                                        <span>Location: </span>
                                        <span class="grey--text">{{ $store.state.selectedItem.location_city }}</span>
                                    </div>
                                    <div>
                                        <span>Rental Cost for 1 Day: </span>
                                        <span class="grey--text">${{ $store.state.selectedItem.cost }}</span>
                                    </div>
                                </div>
                            </v-card-title>
                        </v-flex>
                    </v-layout>


                    <!-- ==================== card text: ==================== -->
                    <v-card-text>
                        <div class="grey--text text--darken-1">
                            {{ $store.state.selectedItem.description }}
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


        props: {
            id: {
                type: String
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



<style scoped lang="scss">
    .card-icon {
        width: 148px;
        max-width: 148px;
    }
</style>
