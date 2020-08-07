# BankAccount kata
Think of your personal bank account experience When in doubt, go for the simplest solution

# Requirements
- Deposit and Withdrawal
- Account statement (date, amount, balance)
- Statement printing
 
# User Storiess
##### US 1:
**In order to** save money  
**As a** bank client  
**I want to** make a deposit in my account  
 
##### US 2: 
**In order to** retrieve some or all of my savings  
**As a** bank client  
**I want to** make a withdrawal from my account  
 
##### US 3: 
**In order to** check my operations  
**As a** bank client  
**I want to** see the history (operation, date, amount, balance)  of my operations  


# React FrontEnd Dependance

[BankAccountkataFront](https://github.com/emilindadie/BankAccountKataFront)

# Angular 2+ FrontEnd Dependance

[BankAccountKataFrontAngularNgrx](https://github.com/emilindadie/BankAccountKataFrontAngularNgrx)


# Others same BackEnd which has been built with NodejS and expressJS

[BankAccountkataApi](https://github.com/emilindadie/BankAccountKataApi)


# Configurations

$ touch .env at root

```sh
echo "
HOST=your_host
DB_PORT=your_port
USERNAME=your_database_username
PASSWORD=your_database_password
DATABASE=your_database_name
JWTACCESSTOKENSECRET=your_secret
JWTREFRESHTOKENSECRET=your_secret
SERVER_PORT=your_server_port
ACCESS_TOKEN_EXPIREIN=your time (1h)
REFRESH_TOKEN_EXPIREIN=your time (6h)  // refresh token must be available longer than access token
NODE_ENV=your_environment (development)
" > .env
```

# Run api
```sh
$ npm run start
```

# Run api in debug mode
```sh
$ npm run start:debug
```

# Run tests
```sh
$ npm run test  
```

# e2e tests
```sh
$ npm run test:e2e 
```

# Run tests with coverage
```sh
$ npm run test:cov 
```

# Access to swagger interface

```sh
http://localhost:${your_server_port}/api
```
