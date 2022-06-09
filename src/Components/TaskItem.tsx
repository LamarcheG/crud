import { ITask } from "interfaces/interface";
import React, { useState } from "react";

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
      <div className="taskContainer">
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
            <div className="inputTaskName formEntry">
              <label htmlFor="task" placeholder="Task">
                Task
              </label>
              <input
                type="text"
                name="task"
                id="task"
                value={editedTaskName}
                onChange={onChangeHandler}
              />
            </div>
            <div className="inputDeadline formEntry">
              <label htmlFor="deadline" placeholder="Deadline(days)">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                id="deadline"
                onChange={onChangeHandler}
              />
            </div>
            <button type="submit">Save</button>
          </form>
        )}
      </div>
    </>
  );
};
