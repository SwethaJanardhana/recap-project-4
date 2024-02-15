import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });

  const isGoodWeather = true;

  /*  function handleAddActivity(newActivity) {
    setActivities([{ id: uid(), ...newActivity }, ...activities]);

    console.log("New Entry ", newActivity);
  } */
  useEffect(() => {
    setFilteredActivities(
      activities.filter(
        (activity) => activity.isForGoodWeather === isGoodWeather
      )
    );
  }, [isGoodWeather]);

  return (
    <>
      <List activities={filteredActivities} />
      {/* <Form onAddActivity={handleAddActivity} /> */}
    </>
  );
}

export default App;
