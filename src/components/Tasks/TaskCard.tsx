import React from "react";
import { TaskData } from "../../types/boardTypes";
import { EditIcon, TrashIcon } from "../icons";
import { Draggable } from "react-beautiful-dnd";

export const TaskCard = ({
  task,
  deleteTaskById,
  editTaskByIdCB,
}: {
  task: TaskData;
  deleteTaskById: (taskID: number) => void;
  editTaskByIdCB: (taskID: number) => void;
}) => {
  return (
    <Draggable draggableId={`${task.id}`} index={task.id} key={task.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className=" relative z-0"
        >
          <div
            className={`flex flex-col w-full bg-slate-400 rounded-lg  p-3 my-2 ${
              snapshot.isDragging ? "border border-red-800" : ""
            }`}
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <h4 className="font-semibold text-xl">{task.title}</h4>
                <p className="font-light">{task.description.taskDescription}</p>
              </div>
              <button
                onClick={() => task.id && editTaskByIdCB(task.id)}
                className="flex mx-1 ml-auto text-slate-600 hover:text-slate-800"
              >
                <EditIcon />
              </button>
              <button
                onClick={() => task.id && deleteTaskById(task.id)}
                className="flex mx-1 text-slate-600 hover:text-slate-800"
              >
                <TrashIcon />
              </button>
            </div>
            <div className="flex my-2 justify-between ">
              <div
                className={`px-2 rounded-lg 
              ${
                task.description.taskPriority === "High" &&
                "bg-red-400 text-gray-900"
              } 
              ${
                task.description.taskPriority === "Medium" &&
                "bg-orange-400 text-gray-900"
              } 
              ${
                task.description.taskPriority === "Low" &&
                "bg-green-400 text-gray-900"
              }`}
              >
                {task.description.taskPriority}
              </div>
              <div className="flex rounded-lg gap-2 bg-sky-300  text-gray-800 px-2  items-center ">
                {task.description.dueDate}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
