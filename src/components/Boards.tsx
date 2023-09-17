import React, { useEffect, useState } from "react";
import { Link, useQueryParams } from "raviger";
import { Board } from "../types/boardTypes";
import Modal from "./common/modal";
import CreateBoard from "./Boards/CreateBoard";
import { listBoards } from "../utils/apiUtils";

const fetchBoards = (
  setBoardsCB: (value: Board[]) => void,
  setCountCB: (count: number) => void,
  offset: number,
  limit: number
) => {
  listBoards({ offset: offset, limit: limit })
    .then((data) => {
      setCountCB(data.count);
      setBoardsCB(data.results);
    })
    .catch((error) => console.log(error));
};

export function Boards() {
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");
  const [boards, setBoards] = useState<Board[]>([]);
  const [openBoard, setOpenBoard] = useState(false);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const limit = 2;

  useEffect(() => fetchBoards(setBoards, setCount, offset, limit), [offset]);

  return (
    <div className="mt-12">
    <div className="flex flex-col p-4 m-4 justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({ search: searchString });
        }}
      >
        <div className="w-full">
          <input
            type="text"
            id={"search"}
            value={searchString}
            name="search"
            placeholder="Search"
            onChange={(event) => setSearchString(event.target.value)}
            className="border-2 border-gray-400 focus:border-gray-600 bg-white h-10 px-5 pr-1 rounded-lg text-m focus:outline-none m-2"
          />
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold px-2 py-1 my-4 rounded-lg"
          >
            <span className="ml-2 font-semibold">Search</span>
          </button>
        </div>
      </form>
      <div className="flex gap-2  mt-4 justify-between items-center">
        <h1 className="font-bold text-2xl">Boards</h1>

        <button
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-2 m-4 rounded-lg"
          onClick={() => setOpenBoard(true)}
        >
          Create Board
        </button>
      </div>
      {boards.length > 0 && (
        <div className="flex-col flex justify-center items-center">
          {boards
            .filter((board) =>
              board.title.toLowerCase().includes(search?.toLowerCase() || "")
            )
            .map((form) => (
              <div
                className="flex w-full my-2 bg-sky-200 border rounded-lg border-gray-600 "
                key={form.id}
              >
                <div className="flex flex-col w-full">
                  <h2 className="flex font-medium text-lg px-2">
                    {form.title}
                  </h2>
                  <h2 className="flex px-2">{form.description}</h2>
                </div>
                <Link
                  href={`/forms/${form.id}`}
                  className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
                >
                  Open
                </Link>
                <button
                  className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}
          <div className="w-full pt-4 rounded-none border min-w-0 text-sm p-2.5 bg-sky-200 border-gray-600 placeholder-gray-400 text-gray-900 focus:ring-gray-500 focus:border-gray-500">
            <div className="flex">
              <button
                onClick={() => {
                  setOffset((offset) => {
                    return offset - limit >= 0 ? offset - limit : offset;
                  });
                }}
                className="bg-sky-500 hover:bg-sky-700 text-white font-bold px-2 py-1 rounded-lg"
              >
                <span className="font-semibold">Prev</span>
              </button>
              <div className="w-full text-sm bg-sky-200 text-gray-900">
                <p className="text-gray-700 text-center">
                  Showing <span className="font-medium">{offset + 1}</span> to{" "}
                  <span className="font-medium">
                    {offset + limit < count ? offset + limit : count}
                  </span>{" "}
                  of <span className="font-medium">{count}</span> results
                </p>
              </div>
              <button
                onClick={() => {
                  setOffset((offset) => {
                    return offset + limit < count ? offset + limit : offset;
                  });
                }}
                className="bg-sky-500 hover:bg-sky-700 text-white font-bold px-2 py-1 rounded-lg"
              >
                <p className="font-semibold">Next</p>
              </button>
            </div>
          </div>
        </div>
      )}
      {boards.length === 0 && (
        <p className="text-gray-700 mt-2">There are no forms created!</p>
      )}
      <Modal Open={openBoard} closeCB={() => setOpenBoard(false)}>
        <CreateBoard />
      </Modal>
    </div>
    </div> 
  );
}

