import { Upload } from "lucide-react";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

// interface UploadImageProps {
//   onChange: (file: File | null) => void; // Change here to accept a single File
//   placeholder?: string; // Optional placeholder for the image
// }

// const UploadImage: React.FC<UploadImageProps> = ({ onChange, placeholder }) => {
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       onChange(e.target.files[0]); // Call the onChange function with the selected file
//     } else {
//       onChange(null); // Call with null if no file is selected
//     }
//   };

//   return (
//     <label className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer">
//       <input
//         name='image'
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         className="hidden" // Hide the default input
//       />
//       {placeholder ? (
//         <img
//           alt="Upload placeholder"
//           className="aspect-square w-full rounded-md object-cover"
//           src={placeholder} // Display the placeholder image
//         />
//       ) : (
//         // <span className="text-muted-foreground">Upload Image</span>
//         <Upload/>
//       )}
//     </label>
//   );
// };

// export default UploadImage;

interface UploadImageProps {
  onChange: (files: FileList | null) => void; // Handle file changes
  placeholder?: string; // Optional placeholder image
}

const UploadImage: React.FC<UploadImageProps> = ({ onChange, placeholder }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange(e.target.files); // Pass the selected files to the parent handler
    }
  };

  return (
    <label className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer">
      <input
        name="images"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden" // Hide the native input
        multiple // Allow multiple images to be selected
      />
      {placeholder ? (
        <LazyLoadImage
          alt="Upload placeholder"
          className="aspect-square w-full rounded-md object-cover"
          src={placeholder} // Display placeholder if provided
          effect="blur"
          loading="lazy"
        />
      ) : (
        // <span className="text-muted-foreground">Upload Images</span>
        <Upload />
      )}
    </label>
  );
};

export default UploadImage;
