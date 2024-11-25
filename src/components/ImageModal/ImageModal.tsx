import React from "react";
import Modal from "react-modal";
import style from './ImageModal.module.css';
import { Image } from "../../App.types";


Modal.setAppElement("#root");


interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image?: Image | null;
}

const ImageModal:React.FC<ImageModalProps> = ({ isOpen, onRequestClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={style.modal}
      overlayClassName={style.overlay}
    >
      <button className={style.closeButton} onClick={onRequestClose}>
        &times;
      </button>
      <img
        src={image?.urls?.regular}
        alt={image?.alt_description}
        className={style.image}
      />
      <div className={style.info}>
        <h2 className={style.descr}>{image?.description || 'Untitled'}</h2>
        <p className={style.text}>By: {image?.user?.name}</p>
        <p className={style.text}>Likes: {image?.likes}</p>
      </div>
    </Modal>
  );
};


export default ImageModal;