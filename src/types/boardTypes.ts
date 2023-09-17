export type Board = {
  id: number;
  title: string;
  description: string;
};

export type Stage = {
  id: number;
  title: string;
  description: string;
};

export type Errors<T> = Partial<Record<keyof T, string>>;

export const validateBoard = (board: Board) => {
  const errors: Errors<Board> = {};
  if (board.title.length < 1) {
    errors.title = "Title is required";
  }
  if (board.title.length > 100) {
    errors.title = "Title length must be less than 100 characters";
  }
  if (board.description.length < 1) {
    errors.description = "Description is required";
  }
  return errors;
};

export const validateStage = (stage: Stage) => {
  const errors: Errors<Stage> = {};
  if (stage.title.length < 1) {
    errors.title = "Title is required";
  }
  if (stage.title.length > 100) {
    errors.title = "Title length must be less than 100 characters";
  }
  if (stage.description.length < 1) {
    errors.description = "Description is required";
  }
  return errors;
};