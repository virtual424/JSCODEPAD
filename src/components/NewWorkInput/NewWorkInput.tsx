import styles from "./NewWorkInput.module.css";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import Modal from "../shared/Modal/Modal";
import Input from "../shared/Input/Input";
import Backdrop from "../shared/Backdrop/Backdrop";
import { uiActions } from "../../state/reducers/uiReducer";
import { createWork } from "../../state/action-creators";

const NewWorkInput: React.FC = () => {
  const newWorkRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const submitHandler = (event: any) => {
    event.preventDefault();
  };

  const content = (
    <Modal>
      <form onSubmit={submitHandler} className={styles["new-chat"]}>
        <h2>Create new work</h2>
        <Input placeholder="Enter work name" ref={newWorkRef} />
        <button
          className={styles.button}
          onClick={() => dispatch(uiActions.closeModal())}
        >
          Cancel
        </button>
        <button
          className={styles.button}
          onClick={() => {
            if (newWorkRef.current && newWorkRef.current.value) {
              dispatch(createWork(newWorkRef.current.value));
              dispatch(uiActions.closeModal());
            }
          }}
        >
          Done
        </button>
      </form>
    </Modal>
  );

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        content,
        document.getElementById("modal-root") as HTMLDivElement
      )}
      {ReactDOM.createPortal(
        <Backdrop onCancel={() => dispatch(uiActions.closeModal())} />,
        document.getElementById("backdrop-root") as HTMLDivElement
      )}
    </React.Fragment>
  );
};

export default NewWorkInput;
