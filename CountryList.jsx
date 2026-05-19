import { useState } from 'react'
import StateList from '../StateList/StateList.jsx'
import './CountryList.css'

const CountryList=({
  countries,
  onAddCountry,
  onEditCountry,
  onDeleteCountry,
  onAddState,
  onEditState,
  onDeleteState,
  onAddCity,
  onDeleteCity,
}) => {
  
  const [openCountries, setOpenCountries] = useState(
    () => new Set(countries.map(c => c.id))
  )

  function toggleCountry(id) {
    setOpenCountries(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="country-list">
      <div className="country-list-header">
        <h2>Countries ({countries.length})</h2>
        <button className="btn-add" onClick={onAddCountry}>
          + Add Country
        </button>
      </div>

      {countries.length === 0 && (
        <p className="empty-msg">No countries added yet. Click "Add Country" to start.</p>
      )}

      {countries.map(country => {
        const isOpen = openCountries.has(country.id)

        return (
          <div key={country.id} className="country-card">
           
            <div className="country-row">
              <button
                className="toggle-btn"
                onClick={() => toggleCountry(country.id)}
                aria-label={isOpen ? 'Collapse' : 'Expand'}
              >
                {isOpen ? '▼' : '▶'}
              </button>

              <span className="country-name">{country.name}</span>

              <span className="country-meta">
                {country.states.length} state(s)
              </span>

              <div className="action-buttons">
                <button
                  className="btn-edit"
                  onClick={() => onEditCountry(country.id)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDeleteCountry(country.id)}
                >
                  Delete
                </button>
              </div>
            </div>

            
            {isOpen && (
              <div className="country-body">
                <StateList
                  countryId={country.id}
                  states={country.states}
                  onAddState={onAddState}
                  onEditState={onEditState}
                  onDeleteState={onDeleteState}
                  onAddCity={onAddCity}
                  onDeleteCity={onDeleteCity}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
export default CountryList