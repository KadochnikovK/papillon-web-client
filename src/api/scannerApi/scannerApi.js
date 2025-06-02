export const getScanImage = async () => {
  // Запрашиваем изображение в формате Base64
  const response = await fetch("http://kadochnikov.papillon.ru:8080/http://hudjakov.papillon.ru:8080/scan", {
    method: "POST",
    headers: {
      "referrerPolicy": 'strict-origin-when-cross-origin',
      "Content-Type": "application/json", // Указываем тип содержимого, если отправляем JSON
      "X-Requested-With": "XMLHttpRequest", // Заголовок, который может потребоваться для CORS     // Указываем источник запроса (можно заменить на нужный адрес)
    },
    body: JSON.stringify({
      params: {
        deviceId: "genesys:libusb:003:010",
        top: 0,
        left: 0,
        width: 216,
        height: 300,
        resolution: 100, //500
        mode: "Color",
        source: "Flatbed",
        brightness: 60,
        contrast: 30,
        dynamicLineart: false,
      },
      filters: ["filter.auto-level", "filter.threshold"],
      pipeline: "JPG | @:pipeline.high-quality",
      batch: "manual",
      index: 0,
    }),
  });
  const data = await response.json();
  const base64string = `data:image/jpeg;base64,${data.image}`;
  return base64string;
};
 
