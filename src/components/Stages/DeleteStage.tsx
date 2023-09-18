import React from "react";

export default function DeleteStage({
  deleteStage,
}: {
  deleteStage: ( ) => void;
}) {
  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2">Delete stage</h1>
      <div className="py-4">
        <p className="text-xl">Do you want to delete the stage?</p>
        <button
          onClick={() => {
            deleteStage();
          }}
          className="w-full px-3 mt-4 py-1  font-semibold rounded-sm  text-center text-md bg-red-500 text-white"
        >
          Delete stage
        </button>
      </div>
    </div>
  );
}
