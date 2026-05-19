# Country / State / City Manager

 React app to manage countries, states, and cities in a tree structure.

## Folder Structure

```
src/
|-- App.jsx                          ← root component, holds all data
|-- App.css
|-- components/
    |-- CountryList/
    |   |-- CountryList.jsx          <- shows all countries
    |   |-- CountryList.css
    |-- StateList/
|   |-- StateList.jsx                <- shows states under a country
    |   |-- StateList.css
    |-- CityList/
        |-- CityList.jsx             <- shows cities under a state
        |-- CityList.css
```
   

## How to run

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## What it does

- Add / edit / delete countries
- Add / edit / delete states (linked to a country)
- Add / delete cities (linked to a state)
- Deleting a country removes its states and cities too
- Deleting a state removes its cities
- Confirm dialogs before any edit or delete

## Tech

- React 18 with functional components and hooks
- No external UI libraries
- Vite for dev server
