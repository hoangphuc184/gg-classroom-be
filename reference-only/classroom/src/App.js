import { useEffect, useState } from "react";
import classroomAPI from "./api/classroomAPI";
import "./App.css";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ClassroomCard from "./components/classCard/classCard";
import Header from "./components/header/header";
function App() {
  const [classesList, setClassesList] = useState([]);

  useEffect(() => {
    const fetchClassesList = async () => {
      try {
        const response = await classroomAPI.getAllClasses();
        setClassesList(response);
      } catch (error) {
        console.log("Fail to fetch", error);
      }
    };

    fetchClassesList();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        {classesList.map((item) => (
          <ClassroomCard item={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
