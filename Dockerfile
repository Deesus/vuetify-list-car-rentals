# ---------- Build Step: ----------
# use Node 8.x LTS as base image:
FROM node:8 as build-stage

# create app directory:
WORKDIR /app

# install dependencies:
# copy package.json and package-lock.json (takes advantage of cached Docker layers):
COPY package*.json ./

RUN npm install

# copy project files/folders to working directory (`/app`):
COPY . .

# build for production:
RUN npm run build



# ---------- Production Step: ----------
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

# expose port 80:
EXPOSE 80

# serve the app using Nginx:
CMD ["nginx", "-g", "daemon off;"]
