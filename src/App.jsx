import { useState, useEffect, useRef } from "react";



function PredictApp() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const fetchNationality = async () => {
    if (!name.trim()) {
      setError("Please enter a name.");
      return;
    }

    try {
      setError(null);
      const response = await fetch(`https://api.nationalize.io?name=${name}`);
      const data = await response.json();

      if (data.country.length > 0) {
        setCountry(data.country[0]); // Taking the first prediction
      } else {
        setCountry(null);
        setError("No nationality data found for this name.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Error fetching data. Try again.");
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">Nationality Predictor</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          ref={inputRef}
          className="form-control"
          placeholder="Enter a name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchNationality}>
          Predict
        </button>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}

      {country && (
        <div className="mt-3">
          <h4>Prediction:</h4>
          <p>
            <strong>Country:</strong> {country.country_id} <br />
            <strong>Probability:</strong> {(country.probability * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}

export default PredictApp;
