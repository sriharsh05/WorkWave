import React, { useEffect, useState } from "react";
import { Link, useQueryParams } from "raviger";
import { Board } from "../../types/boardTypes";
import Modal from "../modal";
import CreateBoard from "./CreateBoard";
import { deleteBoard, listBoards } from "../../utils/apiUtils";
import LoadingSpinner from "../LoadingSpinner";
import DeleteBoard from "./DeleteBoard";
import { NextIcon, PreviousIcon, TrashIcon } from "../icons";

const fetchBoards = (
  setBoardsCB: (value: Board[]) => void,
  setCountCB: (count: number) => void,
  setLoading: (loading: boolean) => void,
  offset: number,
  limit: number
) => {
  listBoards({ offset: offset, limit: limit })
    .then((data) => {
      setCountCB(data.count);
      setBoardsCB(data.results);
      setLoading(false);
    })
    .catch((error) => console.log(error));
};

export default function Boards() {
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");
  const [boards, setBoards] = useState<Board[]>([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [deletedBoardID, setDeletedBoardID] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openBoard, setOpenBoard] = useState(false);
  const [deleteBoardModal, setDeleteBoardModal] = useState(false);

  const limit = 4;

  const deleteLocalBoard = () => {
    setBoards((board) => board.filter((board) => board.id !== deletedBoardID));
    deleteBoard(deletedBoardID).then(() =>
      fetchBoards(setBoards, setCount, setLoading, offset, limit)
    );
    setDeleteBoardModal(false);
  };

  useEffect(
    () => fetchBoards(setBoards, setCount, setLoading, offset, limit),
    [offset]
  );

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
              className=" justify-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            >
              <span className="ml-2 font-semibold">Search</span>
            </button>
          </div>
        </form>
        <div className="flex gap-2  mt-4 justify-between items-center">
          <h1 className="font-bold text-2xl">Boards</h1>

          <button
            className="flex justify-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            onClick={() => setOpenBoard(true)}
          >
            Create Board
          </button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            {boards.length > 0 && (
              <div className="flex-col flex justify-center items-center">
                {boards
                  .filter((board) =>
                    board.title
                      .toLowerCase()
                      .includes(search?.toLowerCase() || "")
                  )
                  .map((board) => (
                    <div
                      className="flex w-full my-2 bg-slate-200 border rounded-lg border-gray-600 "
                      key={board.id}
                    >
                      <div className="flex flex-col w-full">
                        <h2 className="flex font-medium text-lg px-2">
                          {board.title}
                        </h2>
                        <h2 className="flex px-2">{board.description}</h2>
                      </div>
                      <Link
                        href={`/boards/${board.id}`}
                        className="bg-slate-700 hover:bg-slate-900 text-white shadow-sm text-sm font-semibold py-2 px-4 m-4 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                      >
                        Open
                      </Link>
                      <button
                        onClick={() => {
                          setDeletedBoardID(board.id);
                          setDeleteBoardModal(true);
                        }}
                        className="bg-slate-700 hover:bg-slate-900 text-white shadow-sm text-sm font-semibold py-2 px-4 m-4 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                <div className="pt-4 w-[95%] fixed bottom-4 rounded-none border min-w-0 text-sm p-2.5 bg-slate-200 border-gray-600 placeholder-gray-400 text-gray-900 focus:ring-gray-500 focus:border-gray-500">
                  <div className="flex">
                    <button
                      onClick={() => {
                        setOffset((offset) => {
                          return offset - limit >= 0 ? offset - limit : offset;
                        });
                      }}
                      className="bg-slate-700 hover:bg-slate-900 text-white shadow-sm text-sm font-semibold py-2 px-4 mx-4 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                    >
                      <span className="font-semibold">
                        <PreviousIcon />
                      </span>
                    </button>
                    <div className="w-full text-sm bg-slate-200 text-gray-900">
                      <p className="text-gray-700 text-center">
                        Showing{" "}
                        <span className="font-medium">{offset + 1}</span> to{" "}
                        <span className="font-medium">
                          {offset + limit < count ? offset + limit : count}
                        </span>{" "}
                        of <span className="font-medium">{count}</span> results
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setOffset((offset) => {
                          return offset + limit < count
                            ? offset + limit
                            : offset;
                        });
                      }}
                      className="bg-slate-700 hover:bg-slate-900 text-white shadow-sm text-sm font-semibold py-2 px-4 mx-4 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                    >
                      <p className="font-semibold">
                        <NextIcon />
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {boards.length === 0 && (
              <p className="text-gray-700 mt-2">There are no boards created!</p>
            )}
          </div>
        )}

        <Modal Open={openBoard} closeCB={() => setOpenBoard(false)}>
          <CreateBoard />
        </Modal>
        <Modal
          Open={deleteBoardModal}
          closeCB={() => setDeleteBoardModal(false)}
        >
          <DeleteBoard deleteBoard={deleteLocalBoard} />
        </Modal>
      </div>
    </div>
  );
}
