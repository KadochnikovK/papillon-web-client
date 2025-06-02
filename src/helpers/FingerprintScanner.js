// FingerprintScanner.js
import { adisTagByCmd, clear_scan_btn, scanner_connect, start_scan_btn, select_finger } from "webscan-lib/wserver.js";

class FingerprintScanner {
  constructor() {
    this.conn = 0;
    this.activeFinger = 0;
    this.fingers = new Map();
    this.isConnected = false;
    this.isPngSet = false;
  }

  connect(fingerDataCallback, statusCallback) {
    if (this.conn === 0) {
      scanner_connect(
        (img, final, error) => this.handleFingerData(img, final, error, fingerDataCallback),
        (message, currTag) => this.handleStatusUpdate(message, currTag, statusCallback)
      );
      this.conn = 1;
    }
  }

  selectFinger(fingerNum) {
    select_finger(fingerNum);
    this.activeFinger = fingerNum;
  }

  startScan(fingerNum) {
    start_scan_btn(fingerNum);
  }

  clearScanner() {
    clear_scan_btn();
  }

  addFingerprint(tag, img, img_png, isChanged, isAmputate = false) {
    this.fingers.set(tag, {
      img,
      img_png,
      isChanged,
      isAmputate,
    });
  }

  deleteFingerprint(fingerNum) {
    const tag = String(adisTagByCmd(fingerNum));
    this.fingers.delete(tag);
  }

  getActiveFinger() {
    return this.activeFinger;
  }

  getFingerprints() {
    return new Map(this.fingers);
  }

  isScannerConnected() {
    return this.isConnected;
  }

  handleFingerData(img, final, error, callback) {
    if (!img) {
      callback(null, false, null);
      return;
    }

    if (!final) {
      const blob = new Blob(img.link, { type: "image/png" });
      const src1 = URL.createObjectURL(blob);
      callback(src1, false, null);
      this.isPngSet = false;
    } else {
      if (!this.isPngSet) {
        const blob = new Blob(img.link, { type: "image/jpg" });
        const reader = new FileReader();
        reader.onloadend = () => {
          callback(reader.result, true, null);
          this.isPngSet = true;
        };
        reader.readAsDataURL(blob);
      } else {
        let wsqImg = "";
        const imgArr = img.link[0];
        for (let i = 0; i < imgArr.length; i++) {
          wsqImg += String.fromCharCode(imgArr[i]);
        }
        callback(wsqImg, true, null);
        this.isPngSet = false;
      }
    }
  }

  handleStatusUpdate(message, currTag, callback) {
    this.isConnected = true;
    setTimeout(() => {
      this.activeFinger = currTag;
    });
    callback(message, currTag);
  }
}

export default FingerprintScanner;
