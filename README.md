# Financix

A simple app to organize your finances.

## Contents

- [Demo](#Demo)
- [Installation](#Installation)
- [Features](#Features)
- [Technologies](#Technologies)
- [License](#License)

## Demo

Live app: https://financix.herokuapp.com

![](https://i.imgur.com/cKQL3PE.gif)

## Installation

To run this app on your enviroment you'll need a MongoDB database and a SMTP service to fill in the .env variables.

To install the dependeciens go to the root folder and run:

```
yarn install
```

Once the dependecies are installed you can start the server:

```
yarn workspace @financix/backend run dev
```

To start the React App just run:

```
yarn workspace @financix/web start
```

## Features

- Create transactions (expenses/incomes)
- Filter transactions by month
- Filter by paid transactions
- Create Budgets
- Login, logout and logout from all devices
- Password recovery via email
- Password change

## Technologies

### Backend

- NodeJS
- Express
- MongoDB

### Frontend

- ReactJS
- D3.js
- Styled Components

## License

See the [LICENSE.md](LICENSE) file for details.
