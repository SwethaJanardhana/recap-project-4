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

  const [weatherData, setWeatherData] = useState({
    isGoodWeather: false,
    condition: "",
    temperature: 0,
  });

  const URL = "https://example-apis.vercel.app/api/weather";

  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === weatherData.isGoodWeather
  );

  async function fetchWeather() {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setWeatherData({
        isGoodWeather: data.isGoodWeather,
        condition: data.condition,
        temperature: data.temperature,
      });
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
      className={
        weatherData.isGoodWeather ? "layout weather-good" : "layout weather-bad"
      }
    >
      <Display
        condition={weatherData.condition}
        temperature={weatherData.temperature}
      />
      <List
        activities={filteredActivities}
        isGoodWeather={weatherData.isGoodWeather}
        onDeleteActivity={handleDeleteActivity}
      />
      <Form onAddActivity={handleAddActivity} />
    </main>
  );
}

export default App;
