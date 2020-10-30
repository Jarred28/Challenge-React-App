# Application Challenge APP
Create a service that fetches and displays a list of contacts. The list should display the name and phone number for each contact.
The user shall be able to:
- See contacts in pages of 20 elements per page (include at least 2 pages)
- Search by name and phone
- Update the contact name or phone (should persist when the page is reloaded)
## Getting Started with Docker
### Prerequisites
Before you start to work with this project, Docker has to be installed
In the project directory, you can run:
### `docker-compose -f docker-compose.dev.yml up --build`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br />
You will also see any lint errors in the console.
### `docker-compose up -build`
Runs the app in the production mode.<br />
Open [http://localhost](http://localhost) to view it in the browser.
### `docker-compose exec api npm run seed`
It allows you to create seed data files in your database.
## Running the tests
### `docker-compose exec client npm run test`
Launches the test runner in the interactive watch mode.

## Getting Started without Docker
### Prerequisites
Before you start to work with this project, Mongodb and Node should be installed.
In the project directory, you can run:
### `npm install && npm run package:install`
it will install all packages for both of backend and client
### `npm run dev`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br />
You will also see any lint errors in the console.
### `npm run seed`
It allows you to create seed data files in your database.
## Running the tests
### `npm run test`
Launches the test runner in the interactive watch mode.


