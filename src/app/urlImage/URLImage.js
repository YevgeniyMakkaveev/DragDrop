import { Image } from "react-konva";
import useImage from "use-image";

const URLImage = ({ image, dragHandle }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      id={image.id}
      image={img}
      x={image.x}
      y={image.y}
      draggable
      onDragEnd={(e) => dragHandle(e)} //console.log(e.target.id())
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};
export default URLImage;
