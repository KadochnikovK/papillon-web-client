import { useState } from "react";
import { getScanImage } from "../api/scannerApi/scannerApi";

export const useFlatbedScanner = (areas, processAndCropImage, onFingerprintChange) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedImage, setScannedImage] = useState(null);
  const [error, setError] = useState(null);

  const scanFingers = async () => {
    setIsScanning(true);
    setError(null);

    try {
      const image = await getScanImage();
      const images = await processAndCropImage(image, areas);

      images.forEach((el) => {
        if (el.tag) {
          onFingerprintChange(el.tag, el.img);
        } else if (el.tag === 0) {
          setScannedImage(el.img);
        }
      });

      return images;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsScanning(false);
    }
  };

  return {
    scanFingers,
    isScanning,
    scannedImage,
    error,
    resetScanner: () => {
      setScannedImage(null);
      setError(null);
    },
  };
};
