import React from "react";
import { TaskData } from "../../types/boardTypes";

export const TaskCard = ({
  task,
}: {
  task: TaskData;
}) => {
  return (

        <div
          className="flex flex-col w-full bg-slate-400 rounded-lg  p-3 my-2"
        >
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h4 className="font-semibold text-xl">{task.title}</h4>
              <p className="font-light">{task.description.taskDescription}</p>
            </div>
            <button
                      onClick={() => task.id}
                      className="flex mx-1 text-slate-600 hover:text-slate-800"
                    >
                      Delete
              </button>  
          </div>
          <div className="flex my-2 justify-between ">
            <div
              className={`px-2 rounded-lg 
              ${ task.description.taskPriority === "High" && "bg-red-400 text-gray-900"} 
              ${ task.description.taskPriority === "Medium" && "bg-orange-400 text-gray-900" } 
              ${ task.description.taskPriority === "Low" && "bg-green-400 text-gray-900"}`}
            >
              {task.description.taskPriority}
            </div>
            <div className="flex rounded-lg gap-2 bg-sky-300  text-gray-800 px-2  items-center ">
               {task.description.dueDate}
            </div>
          </div>
        </div>
      )}
