import { Stage } from "../../types/boardTypes";

export const StageCard = ({
    stages,
    deleteStageById,
    editStageById,
}:{
    stages : Stage[];
    deleteStageById: (stageID: number) => void;
    editStageById: (stageID: number) => void;
}) =>{
   return (
    <div>
    {stages.length > 0 && (
      <div className="p-2">
      <div className="flex flex-row  gap-2">
        {stages
          .map((stage) => (
            <div
              className="flex flex-col min-w-[25%] my-2 bg-slate-200 border rounded-lg border-gray-900 "
              key={stage.id}
                  >
               <div className="flex flex-col w-full">
                <div className="flex flex-row ">
                      <h2 className="flex font-medium text-lg px-2">
                        {stage.title}
                      </h2>          
                    <button
                      onClick={() => stage.id && editStageById(stage.id)}
                      className="flex mx-1 ml-auto text-red-300 hover:text-red-500"
                    >
                      Edit
                    </button>    
                    <button
                      onClick={() => stage.id && deleteStageById(stage.id)}
                      className="flex mx-1 text-red-300 hover:text-red-500"
                    >
                      Delete
                    </button>
                </div>
                    <h2 className="flex px-2">{stage.description}</h2>
                </div>
            </div>
          ))}
      </div>
      </div>
    )}
    {stages.length === 0 && (
      <p className="text-gray-700 mt-2">There are no stages created!</p>
    )}
  </div>
   )
}