import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

const FLAG_OFFSET = 127397;

function toFlagEmoji(code) {
  if (!code) return "🏳️";
  return [...code.toUpperCase()]
    .map((char) => String.fromCodePoint(FLAG_OFFSET + char.charCodeAt(0)))
    .join("");
}

function toCountryName(code) {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code.toUpperCase());
  } catch {
    return code;
  }
}

const EXAMPLE_NAMES = ["Yuki Tanaka", "Fatima Al-Sayed", "Liam O'Connor", "Priya Sharma"];
const CONFETTI_COLORS = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff9ff3"];

function makeConfettiPieces() {
  return Array.from({ length: 26 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.3,
    duration: 1.6 + Math.random() * 1,
    rotate: Math.random() * 360,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  }));
}

function PredictApp() {
  const [name, setName] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [burstId, setBurstId] = useState(0);
  const inputRef = useRef(null);
  const confettiPieces = useRef([]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const fetchNationality = useCallback(async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Type a name first! 👀");
      setResults(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.nationalize.io?name=${encodeURIComponent(trimmed)}`);
      const data = await response.json();

      if (data.country && data.country.length > 0) {
        setResults(data.country.slice(0, 3));
        confettiPieces.current = makeConfettiPieces();
        setBurstId((id) => id + 1);
      } else {
        setResults(null);
        setError("Hmm, no guesses for that one. Try another name! 🤔");
      }
    } catch {
      setError("Something went wrong. Try again? 😅");
      setResults(null);
    } finally {
      setLoading(false);
    }
  }, [name]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchNationality();
  };

  const handleExample = (example) => {
    setName(example);
    inputRef.current?.focus();
  };

  const topFlag = results?.[0]?.country_id;

  return (
    <div className="page">
      {results && burstId > 0 && (
        <div className="confetti" key={burstId} aria-hidden="true">
          {confettiPieces.current.map((p) => (
            <span
              key={p.id}
              className="confetti-piece"
              style={{
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                backgroundColor: p.color,
                transform: `rotate(${p.rotate}deg)`,
              }}
            />
          ))}
        </div>
      )}
      <div className="card">
        <div className="hero-emoji" aria-hidden="true">
          {topFlag ? toFlagEmoji(topFlag) : "🌍"}
        </div>
        <h1>Nationality Predictor</h1>
        <p className="subtitle">Type a name and I&rsquo;ll guess where in the world it&rsquo;s from.</p>

        <div className="input-row">
          <input
            ref={inputRef}
            type="text"
            className="name-input"
            placeholder="e.g. Sofia Martinez"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="predict-btn" onClick={fetchNationality} disabled={loading}>
            {loading ? <span className="spinner" /> : "Predict ✨"}
          </button>
        </div>

        <div className="examples">
          {EXAMPLE_NAMES.map((example) => (
            <button key={example} className="chip" onClick={() => handleExample(example)}>
              {example}
            </button>
          ))}
        </div>

        {error && <div className="error-banner shake">{error}</div>}

        {results && (
          <div className="results">
            {results.map((r, i) => (
              <div className="result-row" key={r.country_id} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="flag">{toFlagEmoji(r.country_id)}</span>
                <div className="result-info">
                  <div className="result-name">
                    {toCountryName(r.country_id)} <span className="code">({r.country_id})</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${Math.round(r.probability * 100)}%` }} />
                  </div>
                </div>
                <span className="percent">{Math.round(r.probability * 100)}%</span>
              </div>
            ))}
          </div>
        )}

        {!results && !error && <p className="hint">Try one of the names above, or type your own 👆</p>}
      </div>
    </div>
  );
}

export default PredictApp;
