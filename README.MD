#  Mern Todo App

Basic MERN Authentication where a user can have many todos and a todo can have 1 author/user (1 to many relationships)

## Getting Started

### Installing Packages

Run `npm install` in the root of this folder. Once finished, cd into the `client` folder and run `npm install` again to install the client dependencies.

### Running App

cd back to the root of this folder and run `npm run dev` to run both `backend` and `client` at the same time with the package `concurrently`.

You can run them seperately by following these steps:

- In the root of the project folder run:
```
    npm start
```
- cd to the client folder and run:
```
    npm start
```

(Please note that you should have two terminals open if you are running them seperately)

### Prerequisite
>#### SERVER:

Please make sure you have a `.env` file to store the following enviromental variables:

```
PORT=
DATABASE=
JWT_SECRET=
GOOGLE_CLIENT_ID=
```

* `PORT` represents the PORT on which your server is listening on
* `DATABASE` represents the mongodb local or atlas URL, simple paste the string after the equal sign (=)
* `JWT_SECRET` represents our 'secret' for JWT, this can be filled with anything. Simply smash your hand on the keyboard to fill out some random characthers.
* `GOOGLE_CLIENT_ID` represents the OAuth `Client ID` from Google. Please make sure your `Authorized JavaScript origins` and `Authorized redirect URIs` are the same. 

>Example:

### Authorized JavaScript origins
```
http://localhost:3000
```

### Authorized redirect URIs
```
http://localhost:3000
```

>#### CLIENT:
Please make sure you have a `.env` file to store the following enviromental variables:
>`NOTE:` Whenever using an `.env` file in your React application, you should always prefix the variable name with `REACT_APP`

```
REACT_APP_GOOGLE_CLIENT_ID=
REACT_APP_FACEBOOK_APP_ID=
```
* `REACT_APP_GOOGLE_CLIENT_ID` represent the OAuth `Client ID`, grab this from your backend, it should be there too
* `REACT_APP_FACEBOOK_APP_ID` represents your App ID for facebook auth. Like the Google Auth, please make sure origin and redirect URI's are the same


## Application & Testing

The following routes are defined on the server:

- `/api/signup`
- `/api/signin`
- `/api/google-loggin`
- `/api/facebook-loggin`
- `/api/todos`
- `/api/todos/new`
- `/api/todos/:id`

In postman, you can do the following tests:

>1: Register:

You would first need to register as a user

##### POST http://localhost:8080/api/signup
##### Content-Type: application/json
```
{
    "name": "Imraan",
    "email": "imraan.meyer97@gmail.com",
    "password": "imraan12"
}   
```

>2: Login:

After registering, you can now succesfully login.

In the response, you should get a token. Copy that token, we will use it for the next step!

##### POST http://localhost:8080/api/signin
##### Content-Type: application/json

```
{
    "email": "imraan.meyer97@gmail.com",
    "password": "imraan12"
}
```

>3: Viewing Todos:

After copying the token gotten from the previous step. In postman, go to the authorization tab, under "Type", select "Bearer Token".
You should then see a input field on the right section where it ask you to paste a token. Paste the copied token here.

After that, you should be able to view your todos. (It should be an empty array now)

`GET http://localhost:8080/api/todos`


>4 Add Todo:

Make sure you have a token in your authorization tab.
Simply add a todo by entering JSON body: 

##### POST http://localhost:8080/api/todos/new
##### Content-Type: application/json

```
{
    "todo": "This is a TODO! 😁"
}
```

>5: Delete Todo:

Simply grab the ID of the unwanted todo, pass it inside the URL and make a delete request:
Keep in mind, you should stil have a token in the authorization tab

```
DELETE http://localhost:8080/api/todos/5ee79d6e15951d379cf58695
```