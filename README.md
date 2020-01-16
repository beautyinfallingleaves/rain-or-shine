# Rain or Shine

Rain or Shine is a simple weather app which retrieves a 5-day forecast from AccuWeather.

## Installation

1. Clone the project to your local machine.
2. Install modules and dependencies:
```bash
npm install
```
3. Create Postgres database instance (for instructions on download and setup, go [here](https://www.postgresql.org/)):
```bash
createdb rain-or-shine
```
4. Create a .env file in the project's root directory with the following line of code. Paste your AccuWeather API key into it where indicated:
```bash
ACCUWEATHER_API_KEY = '<your AccuWeather API key>'
```
5. Start the project by running:
```bash
npm run start-dev
```

## Instructions

Visit localhost:8080 in your browser.

Rain or Shine will initially look up your local forecast if you grant permission & your browser supports geolocation.

Otherwise, type 3 or more characters into the location search field to search for locations, and select one to get your forecast.

## Author

[beautyinfallingleaves](https://github.com/beautyinfallingleaves)
