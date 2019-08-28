import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { MdRemoveCircleOutline } from "react-icons/md";

const Done = ({ toDoList, handleMissionStatus, handleDeleteItem }) => {
  const handleSingleDigit = value => {
    return String(value).length > 1 ? value : "0" + value;
  };
  return (
    <>
      <Container className="pt-5 pb-5 pr-3 pl-3">
        <h3>Done</h3>
        {toDoList.map(todo => {
          let parsedDate = new Date(todo.date);
          return (
            todo.status &&
            todo.id !== undefined && (
              <Row key={todo.id}>
                <Col>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        checked
                        onChange={() => handleMissionStatus(todo.id)}
                      />
                    </Label>
                  </FormGroup>
                </Col>
                <Col>{todo.text}</Col>
                <Col>
                  {handleSingleDigit(parsedDate.getMonth() + 1) +
                    "-" +
                    handleSingleDigit(parsedDate.getDate()) +
                    "-" +
                    parsedDate.getFullYear()}
                </Col>
                <Col>
                  {handleSingleDigit(parsedDate.getHours()) +
                    ":" +
                    handleSingleDigit(parsedDate.getMinutes()) +
                    ":" +
                    handleSingleDigit(parsedDate.getSeconds())}
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button onClick={() => handleDeleteItem(todo.id)}>
                    <MdRemoveCircleOutline />
                  </Button>
                </Col>
              </Row>
            )
          );
        })}
      </Container>
    </>
  );
};

export default Done;
