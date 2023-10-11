import React, { useState } from 'react';
import './ImageModal.css'

interface ImageModalProps {
  onSelectImage: (image: File | null) => void;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ onSelectImage, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageSelect = () => {
    // if (selectedImage !== null) {
    //     onSelectImage(selectedImage);
    //   }
    //   onClose();
    if (selectedImage !== null) {
        onSelectImage(selectedImage);
      }
    };

  return (
    
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3>Choose Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setSelectedImage(e.target.files ? e.target.files[0] : null)
          }
        />
        <button onClick={handleImageSelect}>Select Image</button>
      </div>
    </div>
  );
};

export default ImageModal;
