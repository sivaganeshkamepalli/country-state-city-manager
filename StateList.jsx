import { useState } from 'react'
import CityList from '../CityList/CityList.jsx'
import './StateList.css'

 const StateList=({
  countryId,
  states,
  onAddState,
  onEditState,
  onDeleteState,
  onAddCity,
  onDeleteCity,
})=> {
  const [openStates, setOpenStates] = useState(
    () => new Set(states.map(s => s.id))
  )

  function toggleState(id) {
    setOpenStates(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="state-list">
      <div className="state-list-header">
        <span className="state-label">States</span>
        <button className="btn-add-state" onClick={() => onAddState(countryId)}>
          + Add State
        </button>
      </div>

      {states.length === 0 && (
        <p className="state-empty">No states yet.</p>
      )}

      {states.map(state => {
        const isOpen = openStates.has(state.id)

        return (
          <div key={state.id} className="state-card">
            <div className="state-row">
              <button
                className="toggle-btn"
                onClick={() => toggleState(state.id)}
                aria-label={isOpen ? 'Collapse' : 'Expand'}
              >
                {isOpen ? '▼' : '▶'}
              </button>

              <span className="state-name">{state.name}</span>

              <span className="state-meta">
                {state.cities.length} city(ies)
              </span>

              <div className="state-actions">
                <button
                  className="btn-edit-state"
                  onClick={() => onEditState(countryId, state.id)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete-state"
                  onClick={() => onDeleteState(countryId, state.id)}
                >
                  Delete
                </button>
              </div>
            </div>

            {isOpen && (
              <div className="state-body">
                <CityList
                  countryId={countryId}
                  stateId={state.id}
                  cities={state.cities}
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
export default StateList