import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useFileUploader } from './FileUploaderContext';
import { useNavigate } from 'react-router-dom';
import './FileUploader.css';

interface FileDetails {
  _id: string;
  originalname: string;
  size: number;
  path: string;
}

const FileUploader = () => {
  // const { selectedImage, setSelectedImage } = useFileUploader();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Array<FileDetails>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImageStyle, setSelectedImageStyle] = useState<React.CSSProperties>({});
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>();


  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      setSelectedImageStyle({ border: '2px solid blue' });
     
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post<FileDetails>('http://localhost:3000/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // setSelectedImage(response.data.path);
      setUploadedFiles((prevFiles) => [...prevFiles, response.data]);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (selectedImage) {
  //     setSelectedImageStyle({
  //       border: '2px solid green',
  //     });
  //   } else {
  //     setSelectedImageStyle({});
  //   }
  // }, [selectedImage]);

  const deleteFile = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/file/${id}`);
      setUploadedFiles((prevFiles) => prevFiles.filter((file) => file._id !== id));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get<FileDetails[]>('http://localhost:3000/file');
        setUploadedFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index); 
    const selectedImage = selectedImages[index];
    // setSelectedImage(selectedImage);
    console.log(selectedImage);
    
    // navigate('/products')
  };
  return (
    <div className="container">
      <h2>Upload file</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile} disabled={!selectedFile || loading}>
        Upload
      </button>

      <h2>List of uploaded files</h2>
      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={file._id}>
            <p>File name: {file.originalname}</p>
            <img
              src={`http://localhost:3000/${file.path}`}
              alt={file.originalname}
              style={{
                border: selectedImageIndex === index ? '2px solid blue' : '2px solid green',
                backgroundColor: selectedImageIndex === index ? 'lightblue' : 'white',
              }}
              onClick={() => handleImageClick(index)}
            />
            <button onClick={() => deleteFile(file._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Thumbnails</h2>
      <div className="thumbnails">
        {selectedImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            width="100"
            height="100"
            style={{ marginRight: '10px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
