import { ActionType } from "../action-types";
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Direction,
  CreateBundleAction,
  SaveCellsAction,
  SignupAction,
  SigninAction,
  SignoutAction,
  GetUserAction,
  CreateWorkAction,
  GetAllWorkNamesAction,
  FetchCellsAction,
} from "../actions";
import { CellTypes } from "../cell";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (
  cellId: string,
  input: string
): CreateBundleAction => {
  return {
    type: ActionType.CREATE_BUNDLE,
    payload: {
      id: cellId,
      input,
    },
  };
};

export const fetchCells = (): FetchCellsAction => {
  return {
    type: ActionType.FETCH_CELLS,
  };
};

export const saveCells = (): SaveCellsAction => {
  return {
    type: ActionType.SAVE_CELLS,
  };
};

export const signUp = (data: { [key: string]: string }): SignupAction => {
  return {
    type: ActionType.SIGN_UP,
    payload: data,
  };
};

export const signIn = (data: { [key: string]: string }): SigninAction => {
  return {
    type: ActionType.SIGN_IN,
    payload: data,
  };
};

export const signOut = (): SignoutAction => {
  return {
    type: ActionType.SIGN_OUT,
  };
};

export const getUser = (id: string): GetUserAction => {
  return {
    type: ActionType.GET_USER,
    payload: id,
  };
};

export const createWork = (workName: string): CreateWorkAction => {
  return {
    type: ActionType.CREATE_WORK,
    payload: workName,
  };
};

export const getAllWorkNames = (): GetAllWorkNamesAction => {
  return {
    type: ActionType.GET_ALL_WORK_NAMES,
  };
};
