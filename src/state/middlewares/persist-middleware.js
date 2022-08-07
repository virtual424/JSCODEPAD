import { saveCells } from "../action-creators";
import { ActionType } from "../action-types";

let timer;

export const persistMiddleware = ({ dispatch, getState }) => (next) => (
  action
) => {
  next(action);
  if (
    [
      ActionType.MOVE_CELL,
      ActionType.UPDATE_CELL,
      ActionType.INSERT_CELL_AFTER,
      ActionType.DELETE_CELL,
    ].includes(action.type)
  ) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(saveCells());
    }, 300);
  }
};
