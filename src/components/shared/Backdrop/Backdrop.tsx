import styles from "./Backdrop.module.css";
import React from "react";

interface BackdropProps {
  onCancel: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return <div className={styles.backdrop} onClick={props.onCancel} />;
};

export default Backdrop;
