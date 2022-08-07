import React from "react";
import styles from "./Modal.module.css";
import Card from "../Card/Card";

const Modal: React.FC = (props) => {
  return <Card className={styles.modal}>{props.children}</Card>;
};

export default Modal;
