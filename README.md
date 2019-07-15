# Unitedremote

The coding challenge is about implementing an app that lists shops nearby.
- As a User, I can sign up using my email & password
- As a User, I can sign in using my email & password
- As a User, I can display the list of shops sorted by distance
- As a User, I can like a shop, so it can be added to my preferred shops

Acceptance criteria: liked shops shouldn’t be displayed on the main page

Bonus point:

[BONUS] As a User, I can dislike a shop, so it won’t be displayed within “Nearby Shops” list during the next 2 hours

[BONUS] As a User, I can display the list of preferred shops

[BONUS] As a User, I can remove a shop from my preferred shops list

# Technologies

The application uses the following technologies :

## Frontend :

Angular 8.0.2 using CoreUI as a template.

## Backend :

Spring boot with Spring Security.
This project uses H2 as an embedded database.

## Prerequisites

You got to install npm and node, you can check their versions with :
```
node -v
npm -v
```
To install npm and node :
https://www.npmjs.com/get-npm

## Run the project

Once downloaded, run the following in the BACKEND folder :
```
./mvnw spring-boot:run
```
Then browse to the FRONTEND folder and run :
```
npm install
npm start
```

Open http://localhost:4200/ and you're good to go!
