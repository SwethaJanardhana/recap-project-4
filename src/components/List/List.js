import "../List/List.css";

export default function List({ activities, isGoodWeather }) {
  return (
    <section>
      <h2>
        {isGoodWeather
          ? "The weather is awesome! Go outside and:"
          : "Bad weather outside! Here's what you can do now:"}
      </h2>
      <ul className="list">
        {activities.map((activity) => (
          <li className="listItem" key={activity.id}>
            {activity.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
