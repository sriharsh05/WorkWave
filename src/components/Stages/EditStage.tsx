import React, { useState } from "react";
import { updateStage } from "../../utils/apiUtils";
import { Errors, Stage, validateStage } from "../../types/boardTypes";

export default function EditStage({
  oldStage,
  editStageCB,
}: {
  oldStage: Stage;
  editStageCB: (stage:Stage) => void;
}) {
  const [stage, setStage] = useState<Stage>(oldStage);
  const [errors, setErrors] = React.useState<Errors<Stage>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateStage(stage);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        stage.id && (await updateStage(stage));
        editStageCB(stage);
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
            value={stage.title}
            onChange={(e) =>
              setStage({
                ...stage,
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
            value={stage.description}
            onChange={(e) =>
              setStage({
                ...stage,
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
