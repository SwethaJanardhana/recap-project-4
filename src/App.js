import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import Display from "./components/Display/Display";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });

  const URL = "https://example-apis.vercel.app/api/weather";

  const [isGoodWeather, setIsGoodWeather] = useState(false);
  const [condition, setCondition] = useState("");
  const [temperature, setTemperature] = useState(0);

  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === isGoodWeather
  );

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

  function handleDeleteActivity(id) {
    const updatedActivitiesList = activities.filter(
      (activity) => activity.id !== id
    );
    localStorage.removeItem(activities);
    localStorage.setItem("activities", JSON.stringify(updatedActivitiesList));
    setActivities(updatedActivitiesList);
  }

  useEffect(() => {
    fetchWeather();

    const interval = setInterval(() => {
      fetchWeather();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main
      className={isGoodWeather ? "layout weather-good" : "layout weather-bad"}
    >
      <Display condition={condition} temperature={temperature} />
      <List
        activities={filteredActivities}
        isGoodWeather={isGoodWeather}
        onDeleteActivity={handleDeleteActivity}
      />
      <Form onAddActivity={handleAddActivity} />
    </main>
  );
}

export default App;
