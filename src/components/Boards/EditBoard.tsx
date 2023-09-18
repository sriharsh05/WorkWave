import React, { useState } from "react";
import {  updateBoard } from "../../utils/apiUtils";
import { Board, Errors, validateBoard } from "../../types/boardTypes";

export default function EditBoard({
  oldBoard,
  editBoardCB
}: {
  oldBoard: Board;
  editBoardCB: (board: Board) => void;
}) {
  const [board, setBoard] = useState<Board>(oldBoard);
  const [errors, setErrors] = React.useState<Errors<Board>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateBoard(board);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        board.id && (await updateBoard(board.id, board));
        editBoardCB(board);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h2 className="text-2xl my-2 pl-5">Create Board</h2>
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
            value={board.title}
            onChange={(e) =>
              setBoard({
                ...board,
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
            value={board.description}
            onChange={(e) =>
              setBoard({
                ...board,
                description: e.target.value,
              })
            }
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
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
