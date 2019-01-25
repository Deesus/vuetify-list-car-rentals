<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <span class="font-weight-bold">car</span>
                <span class="font-weight-light">list</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn
                    flat
                    href="https://github.com/deesus"
                    target="_blank"
            >
                <span class="mr-2">About</span>
            </v-btn>
        </v-toolbar>

        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: 'App',

        data() {
            return {}
        }
    }
</script>
