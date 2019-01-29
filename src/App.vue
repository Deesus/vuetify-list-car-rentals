<template>
    <v-app>

        <!-- ==================== toolbar: ==================== -->
        <v-toolbar app
                   dark
                   color="red lighten-1">
            <v-toolbar-title class="headline text-uppercase">
                <span class="font-weight-bold">car</span>&nbsp;<span class="font-weight-light">list</span>
            </v-toolbar-title>

            <v-spacer/>

            <v-btn flat
                   href="https://github.com/deesus"
                   target="_blank">
                <span class="mr-2">About</span>
            </v-btn>
        </v-toolbar>

        <!-- ==================== content: ==================== -->
        <v-content>
            <router-view />
        </v-content>

    </v-app>
</template>



<script>
    export default {
        name: 'App'
    }
</script>
