import "../Display/Display.css";

export default function Display({ condition, temperature }) {
  return (
    <header className="header">
      <h1 className="title">Weather App</h1>
      <article>
        <span className="emoji">{condition}</span>
        <span className="temperature">
          {temperature}
          °C
        </span>
      </article>
    </header>
  );
}
