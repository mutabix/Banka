# Banka
[![Build Status](https://travis-ci.com/Moise1/Banka.svg?branch=develop)](https://travis-ci.com/Moise1/Banka) 
[![Coverage Status](https://coveralls.io/repos/github/Moise1/Banka/badge.svg)](https://coveralls.io/github/Moise1/Banka)
[![Maintainability](https://api.codeclimate.com/v1/badges/a84eb00f2413f8dae0f2/maintainability)](https://codeclimate.com/github/Moise1/Banka/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a84eb00f2413f8dae0f2/test_coverage)](https://codeclimate.com/github/Moise1/Banka/test_coverage)  



## Get Started 

###  Required features for user: 

* User  can sign up .<br/>
* User can sign in.<br/>
* User can reset password<br/>
* User can create a bank account<br/>
* User can view bank account profile<br/>
* User can view transaction history<br/>

###  Required features for admin: 

* Admin  can activate or deactivate user account.<br/>
* Admin  can create admin or staff user account.<br/>
* Admin  can view list of all bank accounts.<br/>
* Admin can view a specific bank account record <br/>
* Admin can delete a specific account <br/>

###  Required features for cashier:  

* Cashier can credit a user account.
* Cashier can debit a user account.





### Prerequisites 
You must have the following tools installed in order to run this project: <br/>

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git): A distributed version control tool 
* [NodeJS](https://nodejs.org/en/): A  JavaScript runtime environment<br/>
* [Express](https://expressjs.com/): A web application framework for NodeJS <br/>
* [ESLint](https://eslint.org/): A JavaScript linting library <br/>
* [Airbnb](https://github.com/airbnb/javascript): A populr style guide<br/>
* [Mocha](https://mochajs.org/) or [Jasmine](https://jasmine.github.io/): Testing frameworks

### A glance at API-endpoints 

#### User authentication endpoints.


| HTTP Verb     | Endpoint      | Role | Authorized Entity  |
| ------------- | ------------- | ------ |          ----------- |
| POST  | /auth/signup  |    User sign up             | User
| POST  | /auth/login  |  User login             | User



#### Admin activities endpoints 


| HTTP Verb     | Endpoint      | Role | Authorized Entity  |
| ------------- | ------------- | ------ |          ----------- |
| POST  | /api/v1/accounts  |    Create account            | Admin 
| GET   | /api/v1/accounts |   View a list of all accounts  | Admin
| GET   | /api/v1/accounts/:account_number |  Get a single account|Admin 
| PATCH | /api/v1/acounts/:account_number | Edit a single account | Admin 
| DELETE| /api/v1/accounts/:account_number |   Delete a single party| Admin


#### Cashier activities endpoints 

| HTTP Verb     | Endpoint      | Role | Authorized Entity  |
| ------------- | ------------- | ------ |          ----------- |
| POST  | /api/v1/transactions/:account_number/debit  |    Debit an account             | Cashier 
| POST  | /api/v1/transactions/:account_number/credit |  Credit an account             | Cashier


To get the code in this repo and customize it to your needs, do the following:<br/> 

```
git clone https://github.com/Moise1/Banka.git
cd Banka
npm install

```
### Important scripts 

Start developer server 

`npm start`

Run tests 

`npm test`

### Author 

[Moise1](https://github.com/Moise1)
