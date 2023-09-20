import { Board, Stage, Task, TaskData } from "../types/boardTypes";
import { PaginationParams } from "../types/common";

const API_BASE_URL = "https://reactforall.onrender.com/api/";

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

export const request = async (
  endpoint: string,
  method: RequestMethod = "GET",
  data: any = {}
) => {
  let url: string;
  let payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `?${Object.entries(data)
          .map((entry) => `${entry[0]}=${entry[1]}`)
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  // Token Authentication
  const token = localStorage.getItem("token");
  const auth = token ? "Token " + token : "";
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: method !== "GET" ? payload : null,
  });
  if (response.ok) {
    try {
      const json = await response.json();
      return json;
    } catch (error) {
      return null;
    }
  } else {
    const errorJson = await response.json();
    throw Error(errorJson);
  }
};

export const login = (username: string, password: string) => {
  return request("auth-token/", "POST", { username, password });
};

export const me = () => {
  return request("users/me/", "GET", {});
};

export const signup = (
  username: string,
  email: string,
  password1: string,
  password2: string
) => {
  return request("auth/registration/", "POST", {
    username,
    email,
    password1,
    password2,
  });
};

export const createBoard = (board: Board) => {
  return request("boards/", "POST", board);
};

export const listBoards = (pageParams: PaginationParams) => {
  return request("boards/", "GET", pageParams);
};

export const listAllBoards = () => {
  return request("boards/", "GET");
};

export const deleteBoard = (boardID: number) => {
  return request(`boards/${boardID}/`, "DELETE");
};

export const getBoardById = (id: number) => {
  return request(`boards/${id}/`, "GET");
};

export const updateBoard = (boardID: number, board: Partial<Board>) => {
  return request(`boards/${boardID}/`, "PATCH", board);
};

export const createStage = (stage: Stage) => {
  return request("status/", "POST", stage);
};

export const listStages = () => {
  return request("status/", "GET");
};

export const deleteStage = (stageID: number) => {
  return request(`status/${stageID}/`, "DELETE");
};

export const updateStage = (stage: Stage) => {
  return request(`status/${stage.id}/`, "PATCH", stage);
};

export const listTasks = async (boardID: number) => {
  const { results }: { results: Task[] } = await request(
    `boards/${boardID}/tasks/`,
    "GET"
  );
  return results.map((task) => {
    return {
      ...task,
      description: JSON.parse(task.description),
    };
  });
};

export const createTask = (boardID: number, payloadTask: Task) => {
  return request(`boards/${boardID}/tasks/`, "POST", payloadTask);
};

export const deleteTask = (taskID: number, boardID: number) => {
  return request(`boards/${boardID}/tasks/${taskID}/`, "DELETE");
};

export const updateTask = (task: TaskData, boardID: number) => {
  const stringifiedTask = {
    ...task,
    description: JSON.stringify(task.description),
  };
  return request(
    `boards/${boardID}/tasks/${task.id}/`,
    "PATCH",
    stringifiedTask
  );
};

export const dropTask = (taskID: number, boardID: number, statusID: number) => {
  return request(`boards/${boardID}/tasks/${taskID}/`, "PATCH", {
    status: statusID,
  });
};
