import { ActionType } from "../action-types";
import { cellsActions } from "../reducers/cellsReducer";
import { uiActions } from "../reducers/uiReducer";

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export const cellMiddleware = ({ api }) => ({ dispatch, getState }) => (
  next
) => async (action) => {
  next(action);
  const { order } = getState().cells;

  switch (action.type) {
    case ActionType.CREATE_WORK:
      try {
        const user = getState().user.user;
        if (user) {
          const data = await api.cells.createWork(action.payload, user.uid);
          if (data) {
            console.log(data);
          }
        }
      } catch (e) {
        console.log(e);
        dispatch(uiActions.setError({ error: e.message }));
      }
      break;

    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex >= 0 && targetIndex < order.length) {
        dispatch(cellsActions.moveCell({ index, targetIndex }));
      }
      break;

    case ActionType.DELETE_CELL:
      const newArray = order.filter((id) => id !== action.payload);
      dispatch(cellsActions.deleteCell(newArray));
      break;

    case ActionType.INSERT_CELL_AFTER:
      const cell = {
        content: "",
        type: action.payload.type,
        id: randomId(),
      };
      const foundIndex = order.findIndex((id) => id === action.payload.id);
      dispatch(cellsActions.insertCellAfter({ cell, foundIndex }));
      break;
    case ActionType.SAVE_CELLS:
      try {
        const {
          cells: { data, order, currentWork: workName },
          user: {
            user: { uid },
          },
        } = getState();

        const response = await api.cells.saveCells({
          data,
          order,
          uid,
          workName,
        });

        if (response) {
          console.log("Success");
        }
      } catch (e) {
        dispatch(uiActions.setError({ error: e.message }));
      }
      break;

    case ActionType.UPDATE_CELL:
      dispatch(cellsActions.updateCell(action.payload));
      break;

    case ActionType.FETCH_CELLS:
      try {
        const uid = getState().user.user.uid;
        const workName = getState().cells.currentWork;
        const response = await api.cells.fetchCells({
          uid,
          workName,
        });

        if (response) {
          if (response.data()) dispatch(cellsActions.setCells(response.data()));
        }
      } catch (e) {
        uiActions.setError({ error: e.message });
      }
      break;

    case ActionType.GET_ALL_WORK_NAMES:
      try {
        const uid = getState().user.user.uid;
        await api.cells.getAllWorkNames(uid, (workList) => {
          if (workList) {
            const newWorkList = workList.map((work) => {
              return {
                id: randomId(),
                ...work,
              };
            });
            dispatch(cellsActions.setWorkNames(newWorkList));
          }
        });
      } catch (e) {
        dispatch(uiActions.setError({ error: e.message }));
      }
      break;
    default:
      break;
  }
};
