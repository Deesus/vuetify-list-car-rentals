/**
 * When running unit tests with with Vuetify and testing single file components (.vue files), we get the following console error:
 * ```
 * console.error node_modules/vuetify/dist/vuetify.js:23019
 * [Vuetify] Multiple instances of Vue detected
 * See https://github.com/vuetifyjs/vuetify/issues/4068
 *
 * If you're seeing "$attrs is readonly", it's caused by this
 * ```
 *
 * This is a known bug <https://github.com/vuetifyjs/vuetify/issues/4068> that doesn't affect our unit tests.
 * Thus, this function suppresses the console message.
 *
 *
 * Usage: import and call this function before the `.use(Vuetify)` statement.
 */



export default () => {
    const logError = console.error;
    console.error = (...args) => {
        if (
            (args[0].includes("[Vuetify]")) &&
            (args[0].includes("https://github.com/vuetifyjs/vuetify/issues/4068"))
        ) {
            return;
        }

        logError(...args);
    };
}
