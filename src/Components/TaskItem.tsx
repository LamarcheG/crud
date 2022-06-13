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
  const [editedDeadline, setEditedDeadline] = useState(new Date());

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "task") {
      setEditedTaskName(e.target.value);
    } else if (e.target.name === "deadline") {
      setEditedDeadline(new Date(e.target.value));
    }
  };
  return (
    <>
      <TaskItemStyled>
        <p>{`Task: ${task.name}`}</p>
        <p>{`Deadline: ${task.deadline.toLocaleDateString()}`}</p>
        <button onClick={() => onDelete(task.id)}>Delete</button>
        <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
        {isEditing && (
          <form
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
              <label htmlFor="task">Task</label>
              <input
                type="text"
                name="task"
                id="task"
                value={editedTaskName}
                onChange={onChangeHandler}
                placeholder={task.name}
              />
            </FormEntry>
            <FormEntry className="inputDeadline">
              <label htmlFor="deadline">Deadline</label>
              <input
                type="date"
                name="deadline"
                id="deadline"
                onChange={onChangeHandler}
              />
            </FormEntry>
            <button type="submit">Save</button>
          </form>
        )}
      </TaskItemStyled>
    </>
  );
};
const TaskItemStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  width: fit-content;
  margin: 0 auto;
  padding: 5px 10px;
  border-radius: 10px;
`;

const FormEntry = styled.div`
  padding: 5px;
`;
