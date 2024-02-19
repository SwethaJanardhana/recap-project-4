import "../List/List.css";

export default function List({ activities, isGoodWeather, onDeleteActivity }) {
  return (
    <section className="list-section">
      <h2>
        {isGoodWeather
          ? "The weather is awesome! Go outside and:"
          : "Bad weather outside! Here's what you can do now:"}
      </h2>
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
