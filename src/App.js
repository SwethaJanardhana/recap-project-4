import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });
  const [filteredActivities, setFilteredActivities] = useState([...activities]);

  const isGoodWeather = false;

  function handleAddActivity(newActivity) {
    setActivities([{ id: uid(), ...newActivity }, ...activities]);
  }

  useEffect(() => {
    setFilteredActivities(
      activities.filter(
        (activity) => activity.isForGoodWeather === isGoodWeather
      )
    );
  }, [isGoodWeather, activities]);

  return (
    <>
      <List activities={filteredActivities} isGoodWeather={isGoodWeather} />
      <Form onAddActivity={handleAddActivity} />
    </>
  );
}

export default App;
