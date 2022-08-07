import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom";
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./state/store";
import Editor from "./components/Editor/Editor";
import NewWorkInput from "./components/NewWorkInput/NewWorkInput";
import { useTypedSelector } from "./hooks/use-typed-selector";
import Auth from "./components/Auth/Auth";
import Progress from "./components/shared/ProgressBar/Progress";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
import { getUser } from "./state/action-creators";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const openModal = useTypedSelector((state) => state.ui.openModal);
  const loading = useTypedSelector((state) => state.user.loading);
  const user = useTypedSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUser(user.uid));
        navigate("/works");
      } else {
        navigate("/login");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return loading ? (
    <Progress />
  ) : (
    <>
      <Routes>
        {user && <Route path="/works" element={<Editor />} />}
        {user && <Route path="/works/:id" element={<Editor />} />}
        {!user && <Route path="/login" element={<Auth />} />}
        {(!user || loading) && <Route path="/signup" element={<Auth />} />}
      </Routes>
      {openModal && <NewWorkInput />}
    </>
  );

  // return loading ? (
  //   <Progress />
  // ) : (
  //   <>
  //     {!user && <Auth />}
  //     {user && (
  //       <>
  //         <Editor />
  //         {openModal && <NewWorkInput />}
  //       </>
  //     )}
  //   </>
  // );
};

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.querySelector("#root")
);
