import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { fetchCells, getAllWorkNames } from "../../state/action-creators";
import { cellsActions } from "../../state/reducers/cellsReducer";
import { uiActions } from "../../state/reducers/uiReducer";
import styles from "./SideBar.module.css";
import { signOut } from "../../state/action-creators/index";
import { useNavigate } from "react-router-dom";

interface WorkTileProps {
  title: string;
}

const SideBar: React.FC = () => {
  const dispatch = useDispatch();
  const workNames = useTypedSelector((state) => state.cells.workNames);

  useEffect(() => {
    dispatch(getAllWorkNames());
  }, [dispatch]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h4>My Work</h4>
        <button className={styles.newWork} onClick={() => dispatch(signOut())}>
          Logout
        </button>
      </div>
      <button
        className={styles.newWork}
        onClick={() => dispatch(uiActions.openModal())}
      >
        <span className={`${styles.plusIcon} icon is-small`}>
          <i className="fas fa-plus" />
        </span>
        Create New Work
      </button>
      <div className={styles.allWorks}>
        {workNames.map((work) => (
          <WorkTile title={work.name} key={work.id} />
        ))}
      </div>
    </div>
  );
};

const WorkTile: React.FC<WorkTileProps> = ({ title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentWork = useTypedSelector((state) => state.cells.currentWork);

  useEffect(() => {
    if (currentWork && currentWork === title) dispatch(fetchCells());
  }, [dispatch, currentWork, title]);

  const tileClass =
    currentWork === title
      ? `${styles.workTile} ${styles.selectedTile}`
      : `${styles.workTile}`;

  return (
    <div className={tileClass}>
      <div className={styles.workName}>
        <h5
          onClick={() => {
            dispatch(cellsActions.setCurrentWork(title));
            navigate(`/works/${title}`);
          }}
        >
          {title}
        </h5>
        <span className={`${styles.delIcon} icon is-small`}>
          <i className="fas fa-solid fa-trash"></i>
        </span>
      </div>
      <div className={styles.deleteIcon}></div>
    </div>
  );
};

export default SideBar;
