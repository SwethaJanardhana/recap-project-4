import { useState } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import { uid } from "uid";

function App() {
  const [activities, setActivities] = useState([]);

  function handleAddActivity(newActivity) {
    setActivities([{ id: uid(), ...newActivity }, ...activities]);
    console.log("New Entry ", newActivity);
  }

  return (
    <>
      <Form onAddActivity={handleAddActivity} />
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
