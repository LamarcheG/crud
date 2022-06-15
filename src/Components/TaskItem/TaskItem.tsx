import { ITask } from "interfaces/interface";
import React, { useState } from "react";
import {
  ButtonGroup,
  DeleteButton,
  EditButton,
  Form,
  FormEntry,
  SaveButton,
  TaskInfo,
  TaskItemStyled,
} from "./TaskItem.style";

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
