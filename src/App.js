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

  const URL = "https://example-apis.vercel.app/api/weather";

  const [isGoodWeather, setIsGoodWeather] = useState(false);
  const [condition, setCondition] = useState("");
  const [temperature, setTemperature] = useState(0);

  async function fetchWeather() {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setIsGoodWeather(data.isGoodWeather);
      setCondition(data.condition);
      setTemperature(data.temperature);
    } catch (error) {
      console.log("Error :", error);
    }
  }

  function handleAddActivity(newActivity) {
    setActivities([{ id: uid(), ...newActivity }, ...activities]);
  }

  useEffect(() => {
    fetchWeather();
    setFilteredActivities(
      activities.filter(
        (activity) => activity.isForGoodWeather === isGoodWeather
      )
    );
  }, [isGoodWeather, activities]);

  return (
    <>
      <h1>
        {condition}
        {temperature}
      </h1>
      <List activities={filteredActivities} isGoodWeather={isGoodWeather} />
      <Form onAddActivity={handleAddActivity} />
    </>
  );
}

export default App;
