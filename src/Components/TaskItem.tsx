import { ITask } from "interfaces/interface";
import React, { useState } from "react";
import styled from "styled-components";

interface TaskItemProps {
  task: ITask;
  onDelete: (id: number) => void;
  onEdit: (id: number, editedTask: ITask) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  onEdit,
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState("");
  const [editedDeadline, setEditedDeadline] = useState<number>(0);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "task") {
      setEditedTaskName(e.target.value);
    } else if (e.target.name === "deadline") {
      setEditedDeadline(Number(e.target.value));
    }
  };
  return (
    <>
      <TaskItemStyled>
        {!isEditing && (
          <TaskInfo>
            <p>{`Task: ${task.name}`}</p>
            <p>{`Deadline (Days): ${task.deadline}`}</p>
            <ButtonGroup>
              <EditButton
                onClick={() => setIsEditing(!isEditing)}
                type="button"
              >
                Edit
              </EditButton>
              <DeleteButton onClick={() => onDelete(task.id)} type="button">
                <span>X</span>
              </DeleteButton>
            </ButtonGroup>
          </TaskInfo>
        )}

        {isEditing && (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              onEdit(task.id, {
                ...task,
                name: editedTaskName,
                deadline: editedDeadline,
              });
              setIsEditing(false);
            }}
          >
            <FormEntry className="inputTaskName">
              <input
                type="text"
                name="task"
                id="task"
                value={editedTaskName}
                onChange={onChangeHandler}
                placeholder={`Task: ${task.name}`}
                required
              />
            </FormEntry>
            <FormEntry className="inputDeadline">
              <input
                type="number"
                name="deadline"
                id="deadline"
                onChange={onChangeHandler}
                placeholder={`Deadline (Days): ${task.deadline}`}
                required
              />
            </FormEntry>
            <ButtonGroup>
              <EditButton
                onClick={() => setIsEditing(!isEditing)}
                type="button"
              >
                Cancel
              </EditButton>
              <SaveButton type="submit">Save</SaveButton>
            </ButtonGroup>
          </Form>
        )}
      </TaskItemStyled>
    </>
  );
};
const TaskItemStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: fit-content;
  border-radius: 10px;
  margin: auto;
  & p {
    padding: 0px 10px;
  }
`;

const TaskInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 2px 0px;
`;

const FormEntry = styled.div`
  padding: 5px;

  & label {
    padding: 0px 5px;
    ::after {
      content: " :";
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  height: 110px;
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
const DeleteButton = styled.button`
  border-color: var(--tertiary-color);
  background-color: var(--background-color);
  border-radius: 50%;
  padding: 0;
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    width: 50px;
    aspect-ratio: unset;
    border-radius: 5px;
    padding: 5px 0px;
    background-color: var(--secondary-color);
    border: none;
    color: var(--text-color);
  }
  &:hover span {
    display: none;
  }
  &:hover::before {
    content: "Delete";
  }
`;
const EditButton = styled.button`
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background-color: var(--secondary-color);
  padding: 5px 10px;
  color: var(--text-color);
  transition: all 0.2s ease-in-out;
  margin: 0px 5px;
  &:hover {
    background-color: var(--secondary-color);
    color: var(--text-color);
    transform: scale(1.02);
  }
`;
const SaveButton = styled.button`
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background-color: var(--secondary-color);
  padding: 5px 10px;
  color: var(--text-color);
  transition: all 0.2s ease-in-out;
  margin: 0px 5px;
  &:hover {
    background-color: var(--secondary-color);
    color: var(--text-color);
    transform: scale(1.02);
  }
`;
