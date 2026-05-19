import './CityList.css'

const CityList=({
  countryId,
  stateId,
  cities,
  onAddCity,
  onDeleteCity,
})=> {
  return (
    <div className="city-list">
      <div className="city-list-header">
        <span className="city-label">Cities</span>
        <button
          className="btn-add-city"
          onClick={() => onAddCity(countryId, stateId)}
        >
          + Add City
        </button>
      </div>

      {cities.length === 0 && (
        <p className="city-empty">No cities yet.</p>
      )}

      <div className="city-tags">
        {cities.map((city, index) => (
          <div key={index} className="city-tag">
            <span>{city}</span>
            <button
              className="city-delete-btn"
              onClick={() => onDeleteCity(countryId, stateId, city)}
              aria-label={`Delete ${city}`}
              title={`Delete ${city}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default CityList
