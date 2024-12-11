import { useState, useCallback } from 'react';

type UploadState = {
  uploading: boolean;
  uploadedUrl: string | null;
  error: string | null;
};

type CloudinaryResponse = {
  secure_url: string;
  // Add other Cloudinary response fields if needed
};

const INITIAL_STATE: UploadState = {
  uploading: false,
  uploadedUrl: null,
  error: null,
};

// Fixed values
const CLOUDINARY_CONFIG = {
  CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  API_KEY: import.meta.env.VITE_CLOUDINARY_API_KEY
} as const;

const useCloudinaryUpload = () => {
  const [state, setState] = useState<UploadState>(INITIAL_STATE);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const uploadImage = useCallback(
    async (file: File): Promise<void> => {
      if (!file) {
        setState(prev => ({ ...prev, error: 'No file provided' }));
        return;
      }

      setState(prev => ({ ...prev, uploading: true, error: null }));

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_CONFIG.UPLOAD_PRESET);
      formData.append('api_key', CLOUDINARY_CONFIG.API_KEY);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Upload failed with status: ${response.status}`);
        }

        const data = (await response.json()) as CloudinaryResponse;

        setState(prev => ({
          ...prev,
          uploadedUrl: data.secure_url,
          error: null,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Upload failed',
          uploadedUrl: null,
        }));
      } finally {
        setState(prev => ({ ...prev, uploading: false }));
      }
    },
    []
  );

  return {
    ...state,
    uploadImage,
    reset,
  };
};

export type { UploadState };
export default useCloudinaryUpload;