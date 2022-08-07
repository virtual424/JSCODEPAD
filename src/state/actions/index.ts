import { ActionType } from "../action-types";
import { CellTypes } from "../cell";

export type Direction = "up" | "down";

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface FetchCellsAction {
  type: ActionType.FETCH_CELLS;
}

export interface SaveCellsAction {
  type: ActionType.SAVE_CELLS;
}

export interface CreateBundleAction {
  type: ActionType.CREATE_BUNDLE;
  payload: { [key: string]: string };
}

export interface SignupAction {
  type: ActionType.SIGN_UP;
  payload: {
    [key: string]: string;
  };
}

export interface SigninAction {
  type: ActionType.SIGN_IN;
  payload: {
    [key: string]: string;
  };
}

export interface SignoutAction {
  type: ActionType.SIGN_OUT;
}

export interface GetUserAction {
  type: ActionType.GET_USER;
  payload: string;
}

export interface CreateWorkAction {
  type: ActionType.CREATE_WORK;
  payload: string;
}

export interface GetAllWorkNamesAction {
  type: ActionType.GET_ALL_WORK_NAMES;
}

export type Action =
  | GetAllWorkNamesAction
  | CreateWorkAction
  | MoveCellAction
  | SigninAction
  | GetUserAction
  | SignoutAction
  | SignupAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | CreateBundleAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchCellsAction;
