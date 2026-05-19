import { useState } from 'react'
import CountryList from './components/CountryList/CountryList.jsx'
import './App.css'


let idCounter = 1
function makeId() {
  return idCounter++
}

const starterData = [
  {
    id: makeId(),
    name: 'India',
    states: [
      { id: makeId(), name: 'Karnataka', cities: ['Bangalore', 'Mysore'] },
      { id: makeId(), name: 'Maharashtra', cities: ['Mumbai', 'Pune'] },
    ],
  },
  {
    id: makeId(),
    name: 'USA',
    states: [
      { id: makeId(), name: 'California', cities: ['Los Angeles', 'San Francisco'] },
    ],
  },
]

 const App=()=> {
  const [countries, setCountries] = useState(starterData)


  function handleAddCountry() {
    const name = prompt('Country name:')
    if (!name || !name.trim()) return

    const newCountry = {
      id: makeId(),
      name: name.trim(),
      states: [],
    }
    setCountries(prev => [...prev, newCountry])
  }

  function handleEditCountry(countryId) {
    const country = countries.find(c => c.id === countryId)
    if (!confirm(`Edit "${country.name}"?`)) return

    const newName = prompt('New name:', country.name)
    if (!newName || !newName.trim()) return

    setCountries(prev =>
      prev.map(c => (c.id === countryId ? { ...c, name: newName.trim() } : c))
    )
  }

  function handleDeleteCountry(countryId) {
    const country = countries.find(c => c.id === countryId)
    if (!confirm(`Delete "${country.name}" and all its states/cities?`)) return

    setCountries(prev => prev.filter(c => c.id !== countryId))
  }


  function handleAddState(countryId) {
    const name = prompt('State name:')
    if (!name || !name.trim()) return

    const newState = { id: makeId(), name: name.trim(), cities: [] }

    setCountries(prev =>
      prev.map(c =>
        c.id === countryId ? { ...c, states: [...c.states, newState] } : c
      )
    )
  }

  function handleEditState(countryId, stateId) {
    const country = countries.find(c => c.id === countryId)
    const state = country.states.find(s => s.id === stateId)
    if (!confirm(`Edit "${state.name}"?`)) return

    const newName = prompt('New name:', state.name)
    if (!newName || !newName.trim()) return

    setCountries(prev =>
      prev.map(c =>
        c.id === countryId
          ? {
              ...c,
              states: c.states.map(s =>
                s.id === stateId ? { ...s, name: newName.trim() } : s
              ),
            }
          : c
      )
    )
  }

  function handleDeleteState(countryId, stateId) {
    const country = countries.find(c => c.id === countryId)
    const state = country.states.find(s => s.id === stateId)
    if (!confirm(`Delete "${state.name}" and its cities?`)) return

    setCountries(prev =>
      prev.map(c =>
        c.id === countryId
          ? { ...c, states: c.states.filter(s => s.id !== stateId) }
          : c
      )
    )
  }


  function handleAddCity(countryId, stateId) {
    const name = prompt('City name:')
    if (!name || !name.trim()) return

    setCountries(prev =>
      prev.map(c =>
        c.id === countryId
          ? {
              ...c,
              states: c.states.map(s =>
                s.id === stateId
                  ? { ...s, cities: [...s.cities, name.trim()] }
                  : s
              ),
            }
          : c
      )
    )
  }

  function handleDeleteCity(countryId, stateId, cityName) {
    if (!confirm(`Delete "${cityName}"?`)) return

    setCountries(prev =>
      prev.map(c =>
        c.id === countryId
          ? {
              ...c,
              states: c.states.map(s =>
                s.id === stateId
                  ? { ...s, cities: s.cities.filter(city => city !== cityName) }
                  : s
              ),
            }
          : c
      )
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌍 Country / State / City Manager</h1>
        <p>Manage your geographic data in one place</p>
      </header>

      <main className="app-main">
        <CountryList
          countries={countries}
          onAddCountry={handleAddCountry}
          onEditCountry={handleEditCountry}
          onDeleteCountry={handleDeleteCountry}
          onAddState={handleAddState}
          onEditState={handleEditState}
          onDeleteState={handleDeleteState}
          onAddCity={handleAddCity}
          onDeleteCity={handleDeleteCity}
        />
      </main>
    </div>
  )
}
export default App