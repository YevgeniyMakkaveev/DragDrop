import React from "react";
import { Stage, Layer } from "react-konva";
import URLImage from "./urlImage";
import { useSelector, useDispatch, Provider } from "react-redux";
import store from "../store";
import { getImg, changeXY, loadState, clear } from "../store/imageSlicer";
import chair from "../data/chair.png";
import table from "../data/table.png";
import tumba from "../data/tumba.png";
import carpet from "../data/carpet.png";
import bed from "../data/bed.png";
import wardrobe from "../data/wardrobe.png";
import wall from "../data/wall.png";
import oven from "../data/oven.png";
import "./App.css";

const App = () => {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.imgList);

  const makeImg = (src, alt) => {
    return (
      <img
        alt={alt}
        src={src}
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
        }}
      />
    );
  };

  const dragEnd = (e) => {
    dispatch(changeXY({ id: e.target.id(), x: e.target.x(), y: e.target.y() }));
  };

  const getJSON = () => {
    localStorage.setItem("table-planner-2000", JSON.stringify(images));
  };

  const loadJSON = () => {
    const res = localStorage.getItem("table-planner-2000");
    dispatch(loadState(JSON.parse(res)));
  };

  const exportToAlert = () => {
    alert(JSON.stringify(images));
  };

  const downloadURI = (uri, name) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleIMGExport = () => {
    const uri = stageRef.current.toDataURL();
    downloadURI(uri, "stage.png");
  };

  const getImport = () => {
    let getData = prompt("import");
    dispatch(loadState(JSON.parse(getData)));
  };

  return (
    <div>
      {makeImg(tumba, "tumba")}
      {makeImg(table, "table")}
      {makeImg(chair, "chair")}
      {makeImg(bed, "bed")}
      {makeImg(carpet, "carpet")}
      {makeImg(wall, "wall")}
      {makeImg(wardrobe, "wardrobe")}
      {makeImg(oven, "oven")}
      <div
        onDrop={(e) => {
          e.preventDefault();
          stageRef.current.setPointersPositions(e);
          dispatch(
            getImg({
              ...stageRef.current.getPointerPosition(),
              src: dragUrl.current,
              id: Date.now().toString(),
            })
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <button className="btn" onClick={() => getJSON()}>
          Save
        </button>

        <button className="btn" onClick={() => loadJSON()}>
          Load
        </button>

        <button className="btn" onClick={() => exportToAlert()}>
          Export
        </button>

        <button className="btn" onClick={() => getImport()}>
          Import
        </button>

        <button className="btn" onClick={() => handleIMGExport()}>
          SaveImg
        </button>

        <button className="btn" onClick={() => dispatch(clear())}>
          Clear
        </button>

        <Stage
          width={window.innerWidth}
          height={650}
          style={{ border: "1px solid grey" }}
          ref={stageRef}
        >
          <Provider store={store}>
            <Layer>
              {images.map((image) => {
                return (
                  <URLImage key={image.id} image={image} dragHandle={dragEnd} />
                );
              })}
            </Layer>
          </Provider>
        </Stage>
      </div>
    </div>
  );
};
export default App;
