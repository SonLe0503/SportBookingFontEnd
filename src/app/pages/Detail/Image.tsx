import { useSelector } from "react-redux";
import type { DynamicKeyObject } from "../../../interface/app";
import { selectListImage } from "../../../store/imageFieldSlice";

interface ImageProps {
  place: DynamicKeyObject;
}

const Image = (props: ImageProps) => {
  const { place } = props;
  const imageList = useSelector(selectListImage);

  // Lọc ra các ảnh có fieldId trùng với sân hiện tại
  const fieldImages = imageList.filter((img) => img.fieldId === place.fieldId);
  if (fieldImages.length === 0) {
    return (
      <div className="text-gray-500 italic">
        Sân này chưa có hình ảnh nào được đăng tải.
      </div>
    );
  }
  return (
    <>
      <div className="w-full flex flex-wrap gap-3">
        {fieldImages.map((img, index) => (
          <img
            key={index}
            src={img.imageUrl || img.imagePath} // tùy backend trả về
            alt={`field-${index}`}
            className="w-40 h-40 object-cover rounded-lg shadow"
          />
        ))}
      </div>
    </>
  );
};
export default Image;
