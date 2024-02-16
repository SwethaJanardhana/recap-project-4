import "../Form/Form.css";

export default function Form({ onAddActivity }) {
  function handleForm(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = Object.fromEntries(form);
    const isChecked = event.target.elements.isForGoodWeather.checked;

    onAddActivity({ name: data.name, isForGoodWeather: isChecked });
    event.target.reset();
    event.target.elements.name.focus();
  }

  return (
    <form className="container" onSubmit={handleForm}>
      <h3>Add new Activity:</h3>
      <section className="input-section">
        <span className="input-container">
          <label htmlFor="name">Name: </label>
          <input
            className="input-field"
            id="name"
            type="text"
            name="name"
            required
            maxLength="30"
          ></input>
        </span>
        <span className="input-container">
          <label htmlFor="isForGoodWeather">Good-weather activity:</label>
          <input
            className="input-checkbox"
            type="checkbox"
            id="isForGoodWeather"
            name="isForGoodWeather"
          ></input>
        </span>
      </section>

      <button className="button">Submit</button>
    </form>
  );
}
