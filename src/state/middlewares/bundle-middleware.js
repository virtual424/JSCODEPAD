import { ActionType } from "../action-types";
import bundle from "../../bundler";
import { bundlesActions } from "../reducers/bundlesReducer";

export const bundleMiddlewares = ({ dispatch }) => (next) => async (action) => {
  next(action);
  switch (action.type) {
    case ActionType.CREATE_BUNDLE:
      const { id, input } = action.payload;
      dispatch(bundlesActions.bundleStart(id));
      const result = await bundle(input);
      dispatch(bundlesActions.bundleComplete({ id, bundle: result }));
      break;
    default:
      break;
  }
};
