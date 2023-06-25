import { useState } from "react";
import "./App.css";

type TPoint = {
  x: number;
  y: number;
};

function App() {
  const [points, setPoints] = useState<TPoint[]>([]);
  const [deletedPoints, setDeletedPoints] = useState<TPoint[]>([]);

  function handlePlaceCirle(e: React.MouseEvent<HTMLDivElement>) {
    // set coordinates
    const { clientX, clientY } = e;
    setPoints([...points, { x: clientX, y: clientY }]);

    // update deletedPoints
    setDeletedPoints([]);
  }

  function handleUndo() {
    // alternative to filtering state
    const newPoints = [...points];
    const poppedPoint = newPoints.pop();
    if (!poppedPoint) return;
    setDeletedPoints([...deletedPoints, poppedPoint]);
    setPoints(newPoints);
  }

  function handleRedo() {
    const newPoppeds = [...deletedPoints];
    const poppedPoint = newPoppeds.pop();
    if (!poppedPoint) return;
    setPoints([...points, poppedPoint]);
    setDeletedPoints(newPoppeds);
  }

  return (
    <>
      <button disabled={points.length === 0} onClick={handleUndo}>
        Undo
      </button>
      <button disabled={deletedPoints.length === 0} onClick={handleRedo}>
        Redo
      </button>

      <div className="App" onClick={handlePlaceCirle}>
        {points.map((point, index) => (
          <div
            key={point.x + point.y + index}
            className="point"
            style={{
              left: point.x - 7 + "px",
              top: point.y - 7 + "px",
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
