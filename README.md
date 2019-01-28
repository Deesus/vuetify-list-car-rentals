# vuetify-car-list


## Using Docker:
##### Running the app via Docker:
1. Unsure you have downloaded Docker
2. In Bash, run the following (which will fetch the image from the public repo):
```bash
$ docker run -it -p 8080:80 --rm --name vuetify-car-list-prod deesus/vuetify-car-list:prod-1
```
3. In your browser, you can access the app on `http://localhost:8080`


## Local Development:
###### Repo setup:
1. Clone this repo and `cd` to the project directory.
2. Install npm packages: `$ npm install`.

###### Firebase Setup:
1. This app utilizes [Firebase](https://firebase.google.com/) for db operations; create a new Google Dev account if you don't already have one.
2. In the Firebase console, create a new project and select the *Realtime Database* option.
3. Rename the default node for your database to `rentals`.
4. You can choose to 'import JSON' files to populate the Firebase store. A mock JSON file (`MOCK_DATA.json`) is provided for you in the `/data` folder. Optionally, if your data is in CSV format, a `csv_to_json` Python script is provided.
5. In the Firebase console, click *Authentication > Web setup* to access your db's api keys and copy the contents from the *config* object . Replace the object in `SECRETS_sample.js` with the contents you just copied. 
6. Rename the `SECRETS_sample.js` file to `SECRETS.js` (this file will be ignored by Git). You are now ready for development.

###### Local Development Options:
* Compile and serve (hot-reloads for development): `$ npm run serve`
* Builds for production: `$ npm run build`
* Run unit tests: `$ npm run test:unit`


### Technologies Used:
* Vue
* Vuex
* Vue Router
* Vuetify
* vuex-persist
* Firebase
* Lodash
* Sass
* Jest
* Webpack
* Docker
* Nginx


### License:
Copyright 2019 Dee Reddy. BSD-2 License.

Icons by <https://twitter.com/webalys> | Source: <http://emoji.streamlineicons.com> | Creative Common 4.0

Main image by Patrick Tomasso <https://unsplash.com/@impatrickt> | From Wikimedia Commons | CC0 1.0 (Public Domain Dedication)
