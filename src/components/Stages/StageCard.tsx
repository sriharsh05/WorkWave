import { Stage } from "../../types/boardTypes";

export const StageCard = ({
    stages
}:{
    stages : Stage[];
}) =>{
   return (
    <div>
    {stages.length > 0 && (
      <div className="p-2">
      <div className="flex flex-row  gap-2">
        {stages
          .map((stage) => (
            <div
              className="flex flex-col min-w-[25%] my-2 bg-slate-200 border rounded-lg border-gray-600 "
              key={stage.id}
            >
              <div className="flex flex-col w-full">
                <h2 className="flex font-medium text-lg px-2">
                  {stage.title}
                </h2>
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