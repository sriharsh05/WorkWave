import React, { useEffect, useState } from "react";
import { Board, Stage, TaskData } from "../../types/boardTypes";
import { getBoardById, listStages, deleteStage, listTasks } from "../../utils/apiUtils";
import LoadingSpinner from "../LoadingSpinner";
import Modal from "../common/modal";
import CreateStage from "../CreateStage";
import EditBoard from "../Boards/EditBoard";
import { navigate } from "raviger";
import { StageCard } from "./StageCard";
import DeleteStage from "./DeleteStage";
import EditStage from "./EditStage";
import CreateTask from "../Tasks/CreateTask";


const fetchStages = (
  setStagesCB: (value: Stage[]) => void,
  setLoading: (loading: boolean) => void,
) => {
  listStages()
    .then((data) => {
      setStagesCB(data.results);
      setLoading(false);
    })
    .catch((error) => console.log(error));
};

const fetchBoard = (
  id: number,
  setBoard: (board: Board) => void, 
  setTasks: (tasks: TaskData[]) => void,
) => {
  getBoardById(id).then((data) => {  
    if (!data) {
      navigate("/boards");
      return;
    } else setBoard(data);
  });
  listTasks(id).then((data) => {
    setTasks(data);
  });
};


export default function Stages({ id }: { id: number }) {
  const [stages, setStages] = useState<Stage[]>([]);
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [stageID, setStageID] = useState(0);
  const [openStage, setOpenStage] = useState(false);
  const [openEditStage, setOpenEditStage] = useState(false);
  const [openDeleteStage, setOpenDeleteStage] = useState(false);
  const [openEditBoard, setOpenEditBoard] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState<Board>({
    id: Number(new Date()),
    title: "",
    description: "",
  });

  const editBoardCB = (board: Board) => {
    setBoard((oldBoard) => {
      return {
        ...oldBoard,
        title: board.title,
        description: board.description,
      };
    });
    setOpenEditBoard(false);
  };

  const createStageCB = (stage: Stage) => {
    setStages((stages) => [...stages, stage]);
    setOpenStage(false);
  };

  const addLocalTaskCB = (task: TaskData) => {
    setTasks((tasks) => [...tasks, task]);
    setOpenTask(false);
  };

  const deleteStageByIdCB = (stageID: number) => {
    setStageID(stageID);
    setOpenDeleteStage(true);
  };

  const editStageByIdCB = (stageID: number) => {
    setStageID(stageID);
    setOpenEditStage(true);
  };

  const createTaskCB = (stageID: number) => {
    setStageID(stageID);
    setOpenTask(true);
  }

  const deleteLocalStageCB = async () => {
    await deleteStage(stageID);
    setStages((stages) => stages.filter((stage) => stage.id !== stageID));
    setOpenDeleteStage(false);
  };

  const editLocalStageCB = (stage:Stage) => {
    setStages((stages) =>{
      return stages.map((oldStage) =>{
        return oldStage.id === stageID ? stage : oldStage;
      })
    });
    setOpenEditStage(false);
  }

  useEffect(() => fetchBoard(id, setBoard,setTasks), [id]);

  useEffect(() => fetchStages(setStages, setLoading),[]);
  
  return (
    <div className="mt-12">
      <div className="flex flex-col p-4 m-4 justify-center">
    
        <div className="flex gap-2  mt-4 justify-between items-center">
          <h1 className="font-bold text-2xl">Stages : {board.title}</h1>

          <div className="flex flex-row">
          <button
            className="flex justify-center rounded-md  bg-slate-900 px-3 py-1.5 mr-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            onClick={() => setOpenEditBoard(true)}
          >
            Edit Board
          </button> 

          <button
            className="flex justify-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            onClick={() => setOpenStage(true)}
          >
            Create Stage
          </button>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
     {stages.length > 0 && (
      <div className="p-2">
      <div className="flex flex-row  gap-2">
        {stages
          .map((stage) => (
          <StageCard key={stage.id} stage={stage}  deleteStageById={deleteStageByIdCB} editStageById={editStageByIdCB} 
          createTask={createTaskCB}
          tasks={tasks.filter(
            (task) =>
              task.status_object?.id === stage.id )}
          />
          ))} 

         </div>
     </div>
        )}
        {stages.length === 0 && (
          <p className="text-gray-700 mt-2">There are no stages created!</p>
        )}
      </div> 
        )}

        <Modal Open={openStage} closeCB={() => setOpenStage(false)}>
          <CreateStage addNewStage={createStageCB} />
        </Modal>

        <Modal Open={openEditBoard} closeCB={() => setOpenEditBoard(false)}>
        <EditBoard oldBoard={board} editBoardCB={editBoardCB} />
      </Modal>

      <Modal Open={openDeleteStage} closeCB={() => setOpenDeleteStage(false)}>
        <DeleteStage deleteStage={deleteLocalStageCB} />
      </Modal>

      <Modal Open={openEditStage} closeCB={() => setOpenEditStage(false)}>
        <EditStage oldStage={stages.filter((stage) => stage.id === stageID)[0]} editStageCB ={editLocalStageCB}/>
      </Modal>

      <Modal Open={openTask} closeCB={() => setOpenTask(false)}>
        <CreateTask boardID={id} stageId={stageID} addNewTask={addLocalTaskCB} />
      </Modal>
        
      </div>
    </div>
  );
}
