import "../Form/Form.css";

export default function Form({ onAddActivity }) {
  function handleForm(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = Object.fromEntries(form);
    console.log(data);
    onAddActivity(data);
    event.target.reset();
    event.target.elements.name.focus();
  }

  return (
    <form onSubmit={handleForm}>
      <div className="container">
        <h1>Add new Activity:</h1>
        <span>
          <label htmlFor="name">Name: </label>
          <input id="name" type="text" name="name"></input>
        </span>
        <span>
          <label htmlFor="good">Good-weather activity:</label>
          <input type="checkbox" id="good" name="good"></input>
        </span>
        <span>
          <label htmlFor="bad">Bad-weather activity:</label>
          <input type="checkbox" id="bad" name="bad"></input>
        </span>
        <button className="button">Submit</button>
      </div>
    </form>
  );
}
