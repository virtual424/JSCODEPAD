import { getUser } from "../action-creators";
import { ActionType } from "../action-types";
import { userActions } from "../reducers/User";

export const authMiddleware = ({ api }) => ({ dispatch, getState }) => (
  next
) => async (action) => {
  next(action);
  switch (action.type) {
    case ActionType.SIGN_UP:
      try {
        dispatch(userActions.setLoading(true));
        const { email, password, name } = action.payload;
        if (!email && !password && !name) return;
        const data = await api.auth.signUp(email, password);
        if (data) {
          const { email, uid } = data.user;

          const User = {
            uid,
            name,
            email,
          };
          await api.auth.saveUser(User);
          dispatch(userActions.setUser(User));
        }
      } catch (e) {
        console.log(e);
        dispatch(userActions.setError({ error: e.message }));
      } finally {
        dispatch(userActions.setLoading(false));
      }
      break;
    case ActionType.SIGN_IN:
      try {
        dispatch(userActions.setLoading(true));
        const { email, password } = action.payload;
        if (!email && !password) return;
        const data = await api.auth.signIn(email, password);
        if (data) {
          const id = data.user.uid;
          dispatch(getUser(id));
        }
      } catch (e) {
        console.log(e);
        dispatch(userActions.setError({ error: e.message }));
      } finally {
        dispatch(userActions.setLoading(false));
      }
      break;

    case ActionType.GET_USER:
      try {
        dispatch(userActions.setLoading(true));
        const user = await api.auth.getUser(action.payload);
        if (user) {
          dispatch(userActions.setUser(user));
          dispatch(userActions.setLoading(false));
        }
      } catch (e) {
        dispatch(userActions.setError({ error: e.message }));
        dispatch(userActions.setLoading(false));
      }
      break;

    case ActionType.SIGN_OUT:
      try {
        dispatch(userActions.setLoading(true));
        await api.auth.signOut();
        dispatch(userActions.setUser(null));
      } catch (e) {
        console.log(e);
        dispatch(userActions.setError({ error: e.message }));
      } finally {
        dispatch(userActions.setLoading(false));
      }
      break;
    default:
      break;
  }
};
