import React, { useEffect, useState } from "react";
import { Board, Stage } from "../../types/boardTypes";
import { getBoardById, listStages } from "../../utils/apiUtils";
import LoadingSpinner from "../LoadingSpinner";
import Modal from "../common/modal";
import CreateStage from "../CreateStage";
import EditBoard from "../Boards/EditBoard";
import { navigate } from "raviger";
import { StageCard } from "./StageCard";


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
) => {
  getBoardById(id).then((data) => {  
    if (!data) {
      navigate("/boards");
      return;
    } else setBoard(data);
  });
};


export default function Stages({ id }: { id: number }) {
  const [stages, setStages] = useState<Stage[]>([]);
  const [openStage, setOpenStage] = useState(false);
  const [openEditBoard, setOpenEditBoard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState<Board>({
    id: Number(new Date()),
    title: "",
    description: "",
  });

  const createStageCB = (stage: Stage) => {
    setStages((stages) => [...stages, stage]);
    setOpenStage(false);
  };


  useEffect(() => fetchBoard(id, setBoard), [id]);

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
          <StageCard stages={stages}/>
        )}

        <Modal Open={openStage} closeCB={() => setOpenStage(false)}>
          <CreateStage addNewStage={createStageCB} />
        </Modal>

        <Modal Open={openEditBoard} closeCB={() => setOpenEditBoard(false)}>
        <EditBoard oldBoard={board} />
      </Modal>
        
      </div>
    </div>
  );
}
