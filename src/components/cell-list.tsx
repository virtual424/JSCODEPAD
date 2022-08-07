import "./cell-list.css";
import { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { useDispatch } from "react-redux";
import { cellsActions } from "../state/reducers/cellsReducer";

const CellList: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cellsActions.fetchCells());
  }, [dispatch]);

  const cells = useTypedSelector(({ cells: { order, data } }) => {
    if (!order) return null;
    return order.map((id) => data && data[id]);
  });

  const renderedCells =
    cells !== null &&
    cells.map((cell) => {
      if (cell) {
        return (
          <Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell previousCellId={cell.id} />
          </Fragment>
        );
      }
      return [];
    });

  return (
    <div className="cell-list">
      {cells !== null && (
        <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      )}
      {cells === null && (
        <div className="emptyDiv">
          <h4>
            No Work to show
            <br />
            Select a previous work or create new work
          </h4>
        </div>
      )}
      {renderedCells}
    </div>
  );
};

export default CellList;
