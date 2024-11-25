
import ImageCard from '../ImageCard/ImageCard';
import style from './ImageGallery.module.css';
import { Image } from '../../App.types';

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}


const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <ul className={style.gallery}>
      {images.map(image => (
        <li key={image.id} className={style.item}>
          <ImageCard image={image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;










