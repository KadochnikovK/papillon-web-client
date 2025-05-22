export const findFingerprint = (fingerprints, tag) => {
    console.log('fingerprints', fingerprints)
    return fingerprints?.find((el) => el.tag === tag);
};
export const chooseColor = (fingerprints, tag) => {
  const fingerprint = findFingerprint(fingerprints, tag);
  if (fingerprint) return fingerprint.isAmputate === "1" ? "red" : "green";
  else return "lightGrey";
};
