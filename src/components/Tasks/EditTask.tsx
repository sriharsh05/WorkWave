import React, { useState } from "react";
import { updateTask } from "../../utils/apiUtils";
import { Errors, TaskData, validateTask } from "../../types/boardTypes";

export default function EditTask({
  oldTask,
  boardID,
  editTaskCB,
}: {
  oldTask: TaskData;
  boardID: number;
  editTaskCB: (task:TaskData) => void;
}) {
  const [task, setTask] = useState<TaskData>(oldTask);
  const [errors, setErrors] = React.useState<Errors<TaskData>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateTask(task);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const payloadTask = task.status_object?.id && {
          title: task.title,
          description: task.description,
          id: task.id,
          status: task.status_object.id,
          status_object: {
            id: task.status_object?.id,
          },
        }
        payloadTask && (await updateTask(payloadTask,boardID)) &&
          editTaskCB({
          title: payloadTask.title,
          description: payloadTask.description,
          id:payloadTask.id,
          status: payloadTask.status_object.id,
          status_object: {
            id: payloadTask.status_object.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h2 className="text-2xl my-2 pl-5">Edit Task</h2>
      <form onSubmit={handleSubmit} className="p-5">
        <div className="mb-4">
          <label
            htmlFor="title"
            className={`${errors.title ? "text-red-500" : ""}`}
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={task.title}
            onChange={(e) =>
              setTask({
                ...task,
                title: e.target.value,
              })
            }
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className={`${errors.description ? "text-red-500" : ""}`}
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            value={task.description.taskDescription}
            onChange={(e) =>
              setTask({
                ...task,
                description :{
                  ...task.description,
                      taskDescription: e.target.value
                }
              })
            }
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="priority"
            className={`${errors.description ? "text-red-500" : ""}`}
          >
            Priority
          </label>
            <select
              name="title"
              id="title"
              value={task.description.taskPriority}
              onChange={(event) =>
                setTask({
                  ...task,
                  description: {
                    ...task.description,
                    taskPriority: event.target
                      .value as TaskData["description"]["taskPriority"],
                  },
                })
              }
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className={`${errors.description ? "text-red-500" : ""}`}
          >
            Due Date
          </label>
            <input
              type="date"
              name="date"
              id="date"
              required
              value={task.description.dueDate}
              onChange={(event) =>
                setTask((task) => {
                  return {
                    ...task,
                    description: {
                      ...task.description,
                      dueDate: event.target.value,
                    },
                  };
                })
              }
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
        >
          Update
        </button>
      </form>
    </div>
  );
}
