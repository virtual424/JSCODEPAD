import { configureStore } from "@reduxjs/toolkit";
import cellsReducer from "./reducers/cellsReducer";
import uiReducer from "./reducers/uiReducer";
import { persistMiddleware } from "./middlewares/persist-middleware";
import services from "../services";
import userReducer from "./reducers/User";
import bundlesReducer from "./reducers/bundlesReducer";
import { cellMiddleware } from "./middlewares/cell-middleware";
import { bundleMiddlewares } from "./middlewares/bundle-middleware";
import { authMiddleware } from "./middlewares/auth-middleware";

const middlewares = [persistMiddleware, bundleMiddlewares];
const middlewares2 = [cellMiddleware, authMiddleware].map((f) => f(services));

const store = configureStore({
  reducer: {
    cells: cellsReducer,
    bundles: bundlesReducer,
    ui: uiReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(...middlewares, ...middlewares2),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
