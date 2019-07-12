# PropertyPro-lite

[![Build Status](https://travis-ci.com/alainmateso/PropertyPro-lite.svg?branch=develop)](https://travis-ci.com/alainmateso/PropertyPro-lite) [![Coverage Status](https://coveralls.io/repos/github/alainmateso/PropertyPro-lite/badge.svg?branch=develop)](https://coveralls.io/github/alainmateso/PropertyPro-lite?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/ec00144cb50c5141c715/maintainability)](https://codeclimate.com/github/alainmateso/PropertyPro-lite/maintainability)

Property-Pro Lite is a platform where anyone can find a property to buy according to their wishes.

# How to run the project

#### Tools you need

- Node v12.6.0 [You can get if from here](http://nodejs.org/)
- Npm 6.10.0 and up

#### How to Clone the project from github to your local machine

- Open your terminal
- Run the following command

```
git clone https://github.com/alainmateso/PropertyPro-lite.git
```

#### Install all dependencies used to run the project

```
 $ npm install
```

#### How to run server

- Open your terminal
- Run the following command

```
 $ npm start
```

## Entity Specification

#### User

```js
{
  “id” : Integer,
  “email” : String,
  “first_name” : String,
  “last_name” : String,
  “password” : String,
  “phoneNumber” : String,
  “address” : String,
  “is_admin” : Boolean,
}
```

#### Property

```js
{
    “id” : Integer,
  “owner” : Integer, // user id
  “status” : String, // sold,available - default is available
  “price” : Float,
  “state” : String, // State where property is located
  “city” : String, // City where property is located
  “address” : String,
  “type” : String, // 2 bedroom, 3 bedroom etc
  “created_on” : DateTime,
  “image_url” : String
}
```

## API Endpoints and their respective descriptions

---

### User endpoints

- POST `/api/v1/auth/signin` for user to log in
- POST `/api/v1/auth/signup` for creating a user account

### Properties endpoints

- POST `/api/v1/property` for creating a new propert ad
- GET `/api/v1/properties` for retrieving all properties
- GET `/api/v1/property/<:property_id>` for viewing a particular property
- GET `/api/v1/property?type=propertyType` for viewing a specic property type
- PATCH `/api/v1/property/<:property_id>` for updating a particular property's details
- PATCH `/api/v1/property/<:property_id>/sold` for marking a particular property as sold
- DELETE `/api/v1/property/<:property_id>` for deleting a particular property

#### Testing and code coverage reports

- Open your terminal
- Run the following command

```
 $ npm test
```

#### Deployment and hosting

- The UI template is hosted on Github Pages and can be accessed via this link: https://alainmateso.github.io/PropertyPro-lite/UI/

- The API is hostes on Heroku and can be accessed via this link: https://rocky-hollows-87671.herokuapp.com/

## Project Developer

### Alain MATESO
