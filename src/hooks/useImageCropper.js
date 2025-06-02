import { useCallback, useState } from "react";

function numberToTags(num) {
  switch (num) {
    case 0:
      return 720;
    case 1:
      return 721;
    case 2:
      return 722;
    case 3:
      return 723;
    case 4:
      return 724;
    case 5:
      return 725;
    case 6:
      return 726;
    case 7:
      return 727;
    case 8:
      return 728;
    case 9:
      return 729;
    case 13:
      return 735;
    case 14:
      return 736;
    case 11:
      return 734;
    case 12:
      return 737;
    default:
      return null;
  }
}

export function useImageCropper() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const processAndCropImage = useCallback(async (base64Image, data) => {
    setIsProcessing(true);
    setError(null);

    try {
      const img = new Image();
      img.src = base64Image;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Реальные размеры изображения
      const ACTUAL_WIDTH = img.width;
      const ACTUAL_HEIGHT = img.height;

      // Заданные размеры в мм
      const EXPECTED_WIDTH_MM = 216;
      const EXPECTED_HEIGHT_MM = 300;

      // Рассчитываем DPI изображения
      const DPI_X = ACTUAL_WIDTH / EXPECTED_WIDTH_MM;
      const DPI_Y = ACTUAL_HEIGHT / EXPECTED_HEIGHT_MM;

      console.log(`Рассчитанный DPI: X = ${DPI_X.toFixed(2)}, Y = ${DPI_Y.toFixed(2)}`);

      // Создаем холст для отображения
      const displayCanvas = document.createElement("canvas");
      displayCanvas.width = ACTUAL_WIDTH;
      displayCanvas.height = ACTUAL_HEIGHT;
      const displayCtx = displayCanvas.getContext("2d");

      if (!displayCtx) {
        throw new Error("Canvas API не поддерживается");
      }

      // Отображаем изображение на холсте
      displayCtx.drawImage(img, 0, 0, ACTUAL_WIDTH, ACTUAL_HEIGHT);

      // Накладываем области на изображение (для визуализации)
      displayCtx.strokeStyle = "red";
      displayCtx.lineWidth = 2;
      for (const area of data) {
        const pxX = Math.round(area.x * DPI_X);
        const pxY = Math.round(area.y * DPI_Y);
        const pxWidth = Math.round(area.width * DPI_X);
        const pxHeight = Math.round(area.height * DPI_Y);
        displayCtx.strokeRect(pxX, pxY, pxWidth, pxHeight);
      }

      // Получаем изображение с разметкой в формате Base64
      const markedImageBase64 = displayCanvas.toDataURL("image/jpeg");

      // Массив для хранения нарезанных изображений
      const croppedImages = [];

      // Добавляем исходное изображение с разметкой первым элементом
      croppedImages.push({
        tag: 0,
        img: markedImageBase64,
      });

      // Создаем холст для нарезки изображения
      const cropCanvas = document.createElement("canvas");
      const cropCtx = cropCanvas.getContext("2d");

      for (const area of data) {
        const pxX = Math.round(area.x * DPI_X);
        const pxY = Math.round(area.y * DPI_Y);
        const pxWidth = Math.round(area.width * DPI_X);
        const pxHeight = Math.round(area.height * DPI_Y);

        cropCanvas.width = pxWidth;
        cropCanvas.height = pxHeight;
        if (cropCtx) {
          cropCtx.clearRect(0, 0, pxWidth, pxHeight);
          cropCtx.drawImage(img, pxX, pxY, pxWidth, pxHeight, 0, 0, pxWidth, pxHeight);
        }

        // Получаем изображение в формате Base64
        const croppedBase64 = cropCanvas.toDataURL("image/jpeg");
        const tag = numberToTags(area.value);
        croppedImages.push({
          tag: tag ? tag : null,
          img: croppedBase64,
        });
      }

      return croppedImages;
    } catch (err) {
      console.error("Ошибка обработки изображения:", err);
      setError(err.message);
      return [];
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return { processAndCropImage, isProcessing, error };
}
