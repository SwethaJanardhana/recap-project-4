import "../List/List.css";

export default function List({ activities, isGoodWeather, onDeleteActivity }) {
  return (
    <section className="list-section">
      <h2>
        {isGoodWeather ? "The weather is awesome!" : "Bad weather outside!"}
      </h2>
      <h3>
        {isGoodWeather ? "Go outside and:" : "Here's what you can do now:"}
      </h3>
      <ul className="list">
        {activities.map((activity) => (
          <li className="listItem" key={activity.id}>
            {activity.name}{" "}
            <button
              className="delete-button"
              onClick={() => onDeleteActivity(activity.id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
