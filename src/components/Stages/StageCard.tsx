import { Stage, TaskData } from "../../types/boardTypes";
import { TaskCard } from "../Tasks/TaskCard";
import { EditIcon, PlusIcon, TrashIcon } from "../icons";

export const StageCard = ({
    stage,
    tasks,
    deleteStageById,
    editStageById,
    createTask,
    deleteTaskById,
}:{
    stage : Stage;
    tasks: TaskData[];
    deleteStageById: (stageID: number) => void;
    editStageById: (stageID: number) => void;
    createTask: (stageID: number) => void;
    deleteTaskById: (taskID: number) => void;
}) =>{
   return (
            <div
              className="flex flex-col min-w-[25%] my-2 bg-slate-200 border rounded-lg border-gray-900 "
              key={stage.id}
                  >
               <div className="flex flex-col w-full mt-2">
                <div className="flex flex-row ">
                      <h2 className="flex font-medium text-lg px-2">
                        {stage.title}
                      </h2>   
                      <button
                      onClick={() => stage.id && createTask(stage.id)}
                      className="flex mx-1 ml-auto text-slate-600 hover:text-slate-800"
                    >
                      <PlusIcon />
                    </button>   
                    <button
                      onClick={() => stage.id && editStageById(stage.id)}
                      className="flex mx-1 text-slate-600 hover:text-slate-800"
                    >
                      <EditIcon />
                    </button>    
                    <button
                      onClick={() => stage.id && deleteStageById(stage.id)}
                      className="flex mx-1 text-slate-600 hover:text-slate-800"
                    >
                      <TrashIcon />
                    </button>
                </div>
                    <h2 className="flex px-2">{stage.description}</h2>
                </div>
                <div className="mt-2">
                {tasks.map((task, index) => (
                  <div className="m-3">
                    <TaskCard
                    key={task.id}
                    task={task}
                    deleteTaskById = {deleteTaskById}
                  />
                  </div>
                  
                ))}
              </div>

            </div>
   )
}