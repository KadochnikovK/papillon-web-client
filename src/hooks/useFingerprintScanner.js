import { useEffect, useState, useCallback } from "react";
import { adisTagByCmd, clear_scan_btn, scanner_connect, start_scan_btn, select_finger } from "webscan-lib/wserver.js";

export default function useFingerprintScanner() {
  const [conn, setConn] = useState(0);
  const [activeFinger, setActiveFinger] = useState(0);
  const [fingers, setFingers] = useState(new Map());
  const [isConnected, setIsConnected] = useState(false);
  const [isPngSet, setIsPngSet] = useState(false);

  const handleFingerData = useCallback(
    (img, final, error, callback) => {
      if (!img) {
        callback(null, false, null);
        return;
      }

      if (!final) {
        const blob = new Blob(img.link, { type: "image/png" });
        const src1 = URL.createObjectURL(blob);
        callback(src1, false, null);
        setIsPngSet(false);
      } else {
        if (!isPngSet) {
          const blob = new Blob(img.link, { type: "image/jpg" });
          const reader = new FileReader();
          reader.onloadend = () => {
            callback(reader.result, true, null);
            setIsPngSet(true);
          };
          reader.readAsDataURL(blob);
        } else {
          let wsqImg = "";
          const imgArr = img.link[0];
          for (let i = 0; i < imgArr.length; i++) {
            wsqImg += String.fromCharCode(imgArr[i]);
          }
          callback(wsqImg, true, null);
          setIsPngSet(false);
        }
      }
    },
    [isPngSet]
  );

  const handleStatusUpdate = useCallback((message, currTag, callback) => {
    setIsConnected(true);
    setTimeout(() => {
      setActiveFinger(currTag);
    });
    callback(message, currTag);
  }, []);

  const connect = useCallback(
    (fingerDataCallback, statusCallback) => {
      if (conn === 0) {
        scanner_connect(
          (img, final, error) => handleFingerData(img, final, error, fingerDataCallback),
          (message, currTag) => handleStatusUpdate(message, currTag, statusCallback)
        );
        setConn(1);
      }
    },
    [conn, handleFingerData, handleStatusUpdate]
  );

  const selectFinger = useCallback((fingerNum) => {
    select_finger(fingerNum);
    setActiveFinger(fingerNum);
  }, []);

  const startScan = useCallback((fingerNum) => {
    start_scan_btn(fingerNum);
  }, []);

  const clearScanner = useCallback(() => {
    clear_scan_btn();
  }, []);

  const addFingerprint = useCallback((tag, img, img_png, isChanged, isAmputate = false) => {
    setFingers((prevFingers) => {
      const newFingers = new Map(prevFingers);
      newFingers.set(tag, {
        img,
        img_png,
        isChanged,
        isAmputate,
      });
      return newFingers;
    });
  }, []);

  const deleteFingerprint = useCallback((fingerNum) => {
    const tag = String(adisTagByCmd(fingerNum));
    setFingers((prevFingers) => {
      const newFingers = new Map(prevFingers);
      newFingers.delete(tag);
      return newFingers;
    });
  }, []);

  const getActiveFinger = useCallback(() => {
    return activeFinger;
  }, [activeFinger]);

  const getFingerprints = useCallback(() => {
    return new Map(fingers);
  }, [fingers]);

  return {
    connect,
    selectFinger,
    startScan,
    clearScanner,
    addFingerprint,
    deleteFingerprint,
    getActiveFinger,
    getFingerprints,
    isScannerConnected: isConnected,
  };
}
