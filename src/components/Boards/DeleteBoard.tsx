import React from "react";

export default function DeleteBoard({
  deleteBoard,
  deletedBoardID
}: {
  deleteBoard: (id: number) => void,
  deletedBoardID: number
}) {

  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2">
        Delete board
      </h1>
      <div className="py-4">
        <p className="text-xl">
          Do you want to delete the board?
        </p>
        <button
          onClick={() => {
             deleteBoard(deletedBoardID);
          }}
          className="w-full px-3 mt-4 py-1  font-semibold rounded-sm  text-center text-md bg-red-500 text-white"
        >
         Delete board
        </button>
      </div>
    </div>
  );
}
