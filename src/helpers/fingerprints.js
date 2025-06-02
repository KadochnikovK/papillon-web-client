export const findFingerprint = (fingerprints, tag) => {
  return fingerprints?.find((el) => el.tag === tag);
};
export const chooseColor = (fingerprints, tag) => {
  const fingerprint = findFingerprint(fingerprints, tag);
  if (fingerprint) return fingerprint.isAmputate === "1" ? "red" : "green";
  else return "lightGrey";
};

export const createFingerprint = (tag, img, img_png, isChanged, isAmputate = false) => {
  return {
    tag,
    img,
    img_png: img_png ? img_png : img,
    isChanged: isChanged ? true : false,
    isAmputate,
  };
};
