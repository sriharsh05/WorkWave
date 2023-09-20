import React, { useEffect, useState } from "react";
import { listAllBoards, listTasks } from "../utils/apiUtils";
import { Board, TaskData } from "../types/boardTypes";
import LoadingSpinner from "./LoadingSpinner";

const fetchBoards = (setBoardsCB: (value: Board[]) => void) => {
  listAllBoards()
    .then((data) => {
      setBoardsCB(data.results);
    })
    .catch((error) => console.log(error));
};

const getBoardNameForTask = (task: TaskData, boards: Board[]) => {
  const board = boards.find((board) => board.id === task.board);
  return board ? board.title : "Unknown";
};

export default function ListTasks() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasksForBoard = (boardId: number) => {
    listTasks(boardId)
      .then((data) => {
        setTasks((prevTasks) => [...prevTasks, ...data]);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchBoards(setBoards);
  }, []);

  useEffect(() => {
    boards.forEach((board) => {
      fetchTasksForBoard(board.id);
    });
  }, [boards]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="my-16 mx-2 h-full text-gray-900">
      <div className="max-w-screen-xl mx-auto text-center w-full">
        <table className="w-full  mx-auto">
          <thead className="p-2 bg-gray-800 text-white">
            <tr>
              <th className="px-4">Task Name</th>
              <th className="px-4">Task Description</th>
              <th className="px-4">Task Priority</th>
              <th className="px-4">Task DueDate</th>
              <th className="px-4">Board Name</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="bg-slate-200 border border-gray-600">
                <td className="px-4 font-small text-lg">{task.title}</td>
                <td className="px-4 font-small text-lg">
                  {task.description.taskDescription}
                </td>
                <td className="px-4 font-small text-lg">
                  {task.description.taskPriority}
                </td>
                <td className="px-4 m-4 font-small">
                  {task.description.dueDate}
                </td>
                <td className="px-4">{getBoardNameForTask(task, boards)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
