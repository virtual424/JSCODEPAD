import React from "react";
import CellList from "../cell-list";
import SideBar from "../SideBar/SideBar";
import styles from './Editor.module.css'

const Editor = () => {
  return (
    <div className={styles.appContainer}>
      <SideBar />
      <CellList />
    </div>
  );
};

export default Editor;
