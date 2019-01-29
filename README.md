# Vuetify Car Rental List
###### A Vue.js App

## Using Docker:
##### Running the app via Docker:
1. Unsure you have installed Docker.
2. In Bash, pull and run the image from the remote public repo:
```bash
$ docker run -it -p 8080:80 --rm deesus/vuetify-car-list:2
```
3. In your browser, you can access the app on `http://localhost:8080`

##### Running unit tests via Docker:
1. Unsure you have installed Docker.
2. In Bash, pull and run the image from the remote public repo:
```bash
$ docker run deesus/vuetify-car-list-tests:2
```
3. Tests will run in the terminal automatically.


## Local Development (without Docker):
##### Repo setup:
1. Clone this repo and `cd` to the project directory.
2. Install npm packages: `$ npm install`.

##### Firebase setup:
1. This app utilizes [Firebase](https://firebase.google.com/) for db operations; create a new Google Dev account if you don't already have one.
2. In the Firebase console, create a new project and select the *Realtime Database* option.
3. Rename the default node for your database to `rentals`.
4. You can choose to 'import JSON' files to populate the Firebase store. A mock JSON file (`MOCK_DATA.json`) is provided for you in the `/data` folder. Optionally, if your data is in CSV format, a `csv_to_json` Python script is provided.
5. In the Firebase console, click *Authentication > Web setup* to access your db's api keys and copy the contents from the *config* object . Replace the object in `SECRETS_sample.js` with the contents you just copied. 
6. Rename the `SECRETS_sample.js` file to `SECRETS.js` (this file will be ignored by Git). You are now ready for development.

##### Local development options:
* Compile and serve (hot-reloads for development): `$ npm run serve`
* Builds for production: `$ npm run build`
* Run unit tests: `$ npm run test:unit`


### Technologies Used:
* [Vue](https://vuejs.org/)
* [Vuex](https://vuex.vuejs.org/)
* [Vue Router](https://router.vuejs.org/)
* [Vuetify](https://vuetifyjs.com/)
* [vuex-persist](https://github.com/championswimmer/vuex-persist)
* [Firebase](https://firebase.google.com/)
* [Lodash](https://lodash.com/)
* [Sass](http://sass-lang.com/)
* [Jest](https://jestjs.io/)
* [Webpack](https://webpack.js.org/)
* [Docker](https://docs.docker.com/)
* [Nginx](https://docs.nginx.com/)


### License:
Copyright (c) 2019 Dee Reddy. BSD-2 License.

Icons by <https://twitter.com/webalys> | Source: <http://emoji.streamlineicons.com> | Creative Common 4.0

Main image by Patrick Tomasso <https://unsplash.com/@impatrickt> | From Wikimedia Commons | CC0 1.0 (Public Domain Dedication)
