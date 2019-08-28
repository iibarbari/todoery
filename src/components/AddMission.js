import React from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { MdEdit } from "react-icons/md";

const AddMission = ({ toDo, handleInputChange, handleSubmit, edit }) => {
  return (
    <>
      <Form onSubmit={e => handleSubmit(e)} className="p-3 bg-dark text-white">
        <FormGroup row className="pt-3 pb-3 pr-5 pl-5">
          <Label for="todo">What is On Your List to Do?</Label>
          <Input
            name="todo"
            id="todo"
            value={toDo}
            onChange={e => handleInputChange(e)}
          ></Input>
        </FormGroup>
        <FormGroup row className="justify-content-center">
          <Button type="submit">
            {edit ? "Edit" : "Add"} <MdEdit />
          </Button>
        </FormGroup>
      </Form>
    </>
  );
};

export default AddMission;
