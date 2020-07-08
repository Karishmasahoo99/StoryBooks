# StoryBooks
An website to store your private as well as public stories

Here, we are going to install:

Express:The framework

Mongoose:To work with the database

Connect-mongo: MongoDB session store for Connect and Express

Express-session: For session and cookies

Express-handlebars: Template engine

Dotenv:Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

method-override: By default we can only do post and get but by using this we can perform put and delete also

moment: to format dates

morgan: to login

passport: for authentication

passport-google-oauth20: for google authentication

While using dotenv configuration , do not put .env at the end otherwise it will show error.

In order to run the app in development/production mode ,we have to write
"scripts": {
    "start": "cross-env NODE_ENV=production node app",
    "dev":"cross-env NODE_ENV=development nodemon app"
}
And for this we have to install npm install --global cross-env

And in the command prompt we have to use npm run start or else npm run dev

For google-oauth we have to first login to google cloud console and create Oauth Client Id
for that you have to fill all the details:
creating name, upload pics, google link , its service and policy


