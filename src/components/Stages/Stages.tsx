import React, { useEffect, useState } from "react";
import { Board, Stage, TaskData } from "../../types/boardTypes";
import {
  getBoardById,
  listStages,
  deleteStage,
  listTasks,
  deleteTask,
  dropTask,
} from "../../utils/apiUtils";
import LoadingSpinner from "../LoadingSpinner";
import Modal from "../modal";
import CreateStage from "./CreateStage";
import EditBoard from "../Boards/EditBoard";
import { navigate } from "raviger";
import { StageCard } from "./StageCard";
import DeleteStage from "./DeleteStage";
import EditStage from "./EditStage";
import CreateTask from "../Tasks/CreateTask";
import DeleteTask from "../Tasks/DeleteTask";
import EditTask from "../Tasks/EditTask";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
  isDueLater,
  isDueTomorrow,
  isOverDue,
  isToday,
} from "../../utils/filterTasksUtils";

const fetchStages = (
  setStagesCB: (value: Stage[]) => void,
  setLoading: (loading: boolean) => void
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
  setTasks: (tasks: TaskData[]) => void
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
  const [taskID, setTaskID] = useState(0);
  const [openStage, setOpenStage] = useState(false);
  const [openEditStage, setOpenEditStage] = useState(false);
  const [openDeleteStage, setOpenDeleteStage] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const [openOverdue, setOpenOverdue] = useState(false);
  const [openDueToday, setOpenDueToday] = useState(false);
  const [openDueTomorrow, setOpenDueTomorrow] = useState(false);
  const [openDueLater, setOpenDueLater] = useState(false);
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState<Board>({
    id: Number(new Date()),
    title: "",
    description: "",
  });
  const [openEditBoard, setOpenEditBoard] = useState(false);

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

  const editStageByIdCB = (stageID: number) => {
    setStageID(stageID);
    setOpenEditStage(true);
  };

  const deleteStageByIdCB = (stageID: number) => {
    setStageID(stageID);
    setOpenDeleteStage(true);
  };

  const createTaskCB = (stageID: number) => {
    setStageID(stageID);
    setOpenTask(true);
  };

  const editTaskByIdCB = (taskID: number) => {
    setTaskID(taskID);
    setOpenEditTask(true);
  };

  const deleteTaskByIdCB = (taskID: number) => {
    setTaskID(taskID);
    setOpenDeleteTask(true);
  };

  const editLocalStageCB = (stage: Stage) => {
    setStages((stages) => {
      return stages.map((oldStage) => {
        return oldStage.id === stageID ? stage : oldStage;
      });
    });
    setOpenEditStage(false);
  };

  const deleteLocalStageCB = async () => {
    await deleteStage(stageID);
    setStages((stages) => stages.filter((stage) => stage.id !== stageID));
    setOpenDeleteStage(false);
  };

  const addLocalTaskCB = (task: TaskData) => {
    setTasks((tasks) => [...tasks, task]);
    setOpenTask(false);
  };

  const deleteLocalTaskCB = async () => {
    await deleteTask(taskID, id);
    setTasks((tasks) => tasks.filter((task) => task.id !== taskID));
    setOpenDeleteTask(false);
  };

  const updateLocalTaskCB = (task: TaskData) => {
    setTasks((tasks) => {
      return tasks.map((oldTask) => {
        if (oldTask.id === taskID) {
          return task;
        } else {
          return oldTask;
        }
      });
    });
    setOpenEditTask(false);
  };

  const dropLocalTask = (draggableId: number, droppableId: number) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === draggableId) {
          return {
            ...task,
            status: droppableId,
            status_object: {
              id: droppableId,
            },
          };
        } else {
          return task;
        }
      })
    );
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;
    dropTask(Number(draggableId), id, Number(destination.droppableId));
    dropLocalTask(Number(draggableId), Number(destination.droppableId));
  };

  const filterTasks = (tasks: TaskData[], stage: Stage) => {
    return tasks.filter(
      (task) =>
        task.status_object?.id === stage.id &&
        (openOverdue || openDueToday || openDueTomorrow || openDueLater
          ? (openOverdue && isOverDue(new Date(task.description.dueDate))) ||
            (openDueToday && isToday(new Date(task.description.dueDate))) ||
            (openDueTomorrow &&
              isDueTomorrow(new Date(task.description.dueDate))) ||
            (openDueLater && isDueLater(new Date(task.description.dueDate)))
          : true)
    );
  };

  useEffect(() => fetchBoard(id, setBoard, setTasks), [id]);
  useEffect(() => fetchStages(setStages, setLoading), []);

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

        <div className="my-3">
          <div
            className={`inline-block hover:cursor-pointer rounded-full bg-slate-500 mr-3 px-2 py-1 text-sm font-semibold select-none ${
              openOverdue
                ? "border-2 border-slate-900 bg-slate-700 text-gray-200"
                : " text-gray-800"
            }`}
            onClick={() => setOpenOverdue((prev) => !prev)}
          >
            <p className="inline pl-1">Overdue</p>
          </div>
          <div
            className={`inline-block hover:cursor-pointer rounded-full bg-slate-500 mr-3 px-2 py-1 text-sm font-semibold select-none ${
              openDueToday
                ? "border-2 border-slate-900 bg-slate-700 text-gray-200"
                : "text-gray-800"
            }`}
            onClick={() => setOpenDueToday((prev) => !prev)}
          >
            <p className="inline pl-1">Due Today</p>
          </div>
          <div
            className={` inline-block hover:cursor-pointer rounded-full bg-slate-500 mr-3 px-2 py-1 text-sm font-semibold select-none ${
              openDueTomorrow
                ? "border-2 border-slate-900 bg-slate-700 text-gray-200"
                : "text-gray-800"
            }`}
            onClick={() => setOpenDueTomorrow((prev) => !prev)}
          >
            <p className="inline pl-1">Due Tomorrow</p>
          </div>
          <div
            className={`inline-block hover:cursor-pointer rounded-full bg-slate-500 mr-3 px-2 py-1 text-sm font-semibold select-none ${
              openDueLater
                ? "border-2 border-slate-900 bg-slate-700 text-gray-200"
                : "text-gray-800"
            }`}
            onClick={() => setOpenDueLater((prev) => !prev)}
          >
            <p className="inline pl-1">Due Later</p>
          </div>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
              {stages.length > 0 && (
                <div className="p-2">
                  <div className="flex flex-row  gap-2">
                    {stages.map((stage) => (
                      <StageCard
                        key={stage.id}
                        stage={stage}
                        deleteStageById={deleteStageByIdCB}
                        editStageById={editStageByIdCB}
                        createTask={createTaskCB}
                        deleteTaskById={deleteTaskByIdCB}
                        editTaskByIdCB={editTaskByIdCB}
                        tasks={filterTasks(tasks, stage)}
                      />
                    ))}
                  </div>
                </div>
              )}
              {stages.length === 0 && (
                <p className="text-gray-700 mt-2">
                  There are no stages created!
                </p>
              )}
            </DragDropContext>
          </div>
        )}

        <Modal Open={openEditBoard} closeCB={() => setOpenEditBoard(false)}>
          <EditBoard oldBoard={board} editBoardCB={editBoardCB} />
        </Modal>

        <Modal Open={openStage} closeCB={() => setOpenStage(false)}>
          <CreateStage addNewStage={createStageCB} />
        </Modal>

        <Modal Open={openDeleteStage} closeCB={() => setOpenDeleteStage(false)}>
          <DeleteStage deleteStage={deleteLocalStageCB} />
        </Modal>

        <Modal Open={openEditStage} closeCB={() => setOpenEditStage(false)}>
          <EditStage
            oldStage={stages.filter((stage) => stage.id === stageID)[0]}
            editStageCB={editLocalStageCB}
          />
        </Modal>

        <Modal Open={openTask} closeCB={() => setOpenTask(false)}>
          <CreateTask
            boardID={id}
            stageId={stageID}
            addNewTask={addLocalTaskCB}
          />
        </Modal>

        <Modal Open={openDeleteTask} closeCB={() => setOpenDeleteTask(false)}>
          <DeleteTask deleteTask={deleteLocalTaskCB} />
        </Modal>
        <Modal
          Open={openEditTask && taskID !== 0}
          closeCB={() => setOpenEditTask(false)}
        >
          <EditTask
            oldTask={tasks.filter((task) => task.id === taskID)[0]}
            editTaskCB={updateLocalTaskCB}
            boardID={id}
          />
        </Modal>
      </div>
    </div>
  );
}
