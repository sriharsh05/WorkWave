import { navigate } from "raviger";
import React, { useState } from "react";
import { createBoard } from "../../utils/apiUtils";
import { Board, Errors, validateBoard } from "../../types/boardTypes";

export default function CreateBoard() {
  const [board, setBoard] = useState<Board>({
    id: Number(new Date()),
    title: "",
    description: "",
  });
  const [errors, setErrors] = React.useState<Errors<Board>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateBoard(board);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const data = await createBoard(board);
        console.log(data);
        navigate(`/boards/${data.id}`);
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
            className="w-full p-2 my-2 border-2 border-gray-200 rounded-lg"
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
            className="w-full p-2 my-2 border-2 border-gray-200 rounded-lg"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 m-4 rounded-lg"
        >
          Create
        </button>
      </form>
    </div>
  );
}