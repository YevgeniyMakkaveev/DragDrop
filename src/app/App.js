import React from "react";
import { Stage, Layer } from "react-konva";
import URLImage from "./urlImage/URLImage";
import { useSelector, useDispatch, Provider } from "react-redux";
import store from "../store";
import { getImg, changeXY } from "../store/imageSlicer";
import chair from "../data/chair.png";
import table from "../data/table.png";
import tumba from "../data/tumba.png";

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
  return (
    <div>
      Try to trag and image into the stage:
      {makeImg(tumba, "tumba")}
      {makeImg(table, "table")}
      {makeImg(chair, "chair")}
      <div
        onDrop={(e) => {
          e.preventDefault();
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
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
        <button
          onClick={() => {
            console.log(images);
          }}
        >
          Глянуть
        </button>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
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
