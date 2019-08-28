import React, { useState, useEffect } from "react";
import AddMission from "./components/AddMission";
import ViewMissions from "./components/ViewMissions";
import Done from "./components/Done";
import uuid from "uuid/v4";
import { Button, Container, Row } from "reactstrap";
import "./bootstrap.min.css";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDoList, setToDoList] = useState(
    localStorage.getItem("missions")
      ? JSON.parse(localStorage.getItem("missions"))
      : []
  );
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  const handleInputChange = e => {
    setToDo(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (toDo.length > 0) {
      if (edit) {
        let tempMission = toDoList.map(mission => {
          return mission.id === id ? { ...mission, text: toDo } : mission;
        });
        setToDoList(tempMission);
        setEdit(false);
      } else {
        setToDoList([
          ...toDoList,
          {
            date: new Date(),
            id: uuid(),
            text: toDo,
            status: false
          }
        ]);
      }
    }
    setToDo("");
  };

  const handleMissionStatus = id => {
    let tempMission = toDoList.map(mission => {
      let tempStatus = !mission.status;
      return mission.id === id ? { ...mission, status: tempStatus } : mission;
    });
    setToDoList(tempMission);
  };

  const handleDeleteItem = id => {
    let tempMission = toDoList.filter(mission => {
      return mission.id !== id;
    });
    setToDoList(tempMission);
  };

  const handleEditItem = id => {
    let tempMission = toDoList.find(mission => {
      return mission.id === id;
    });
    setToDo(tempMission.text);
    setEdit(true);
    setId(id);
  };

  const handleDeleteAll = () => {
    setToDoList([]);
  };

  useEffect(() => {
    console.log(toDoList);
    localStorage.setItem("missions", JSON.stringify(toDoList));
  }, [toDoList]);

  return (
    <div className="App">
      <AddMission
        toDo={toDo}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        edit={edit}
      />
      {toDoList.length > 0 && (
        <ViewMissions
          toDoList={toDoList}
          handleMissionStatus={handleMissionStatus}
          handleDeleteItem={handleDeleteItem}
          handleEditItem={handleEditItem}
        />
      )}
      {toDoList.length > 0 && (
        <Done
          toDoList={toDoList}
          handleMissionStatus={handleMissionStatus}
          handleDeleteItem={handleDeleteItem}
        />
      )}
      {toDoList.length > 0 && (
        <Container>
          <Row className="justify-content-center">
            <Button onClick={handleDeleteAll}>Clear All</Button>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default App;
