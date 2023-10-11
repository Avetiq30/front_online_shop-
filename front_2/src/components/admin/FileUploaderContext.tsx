import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FileUploaderContextType {
  selectedImage: string | null;
  setSelectedImage: (path: string | null) => void;
}

const FileUploaderContext = createContext<FileUploaderContextType | undefined>(undefined);

export const useFileUploader = () => {
//   const context = useContext(FileUploaderContext);
//   if (context === undefined) {
//     throw new Error('useFileUploader must be used within a FileUploaderProvider');
//   }
//   return context;
// };
// // 
// interface FileUploaderProviderProps {
//   children: ReactNode;
// }

// export const FileUploaderProvider: React.FC<FileUploaderProviderProps> = ({ children }) => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   return (
//     <FileUploaderContext.Provider value={{ selectedImage, setSelectedImage }}>
//       {children}
//     </FileUploaderContext.Provider>
//   );
};
