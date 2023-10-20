// Base64 to Image
export function DataURIToBlob(dataURI) {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
}
export function formatNumber(n) {
  if (n >= 1000000) {
    return (n / 1000000).toFixed(1) + "M";
  } else if (n >= 1000) {
    return (n / 1000).toFixed(1) + "k";
  } else {
    return n.toString();
  }
}

export function timeFormat(timestampStr) {
  const timestamp = new Date(timestampStr);

// Current time
  const currentTime = new Date();

// Calculate the time difference in milliseconds
  const timeDifference = currentTime - timestamp;

// Convert milliseconds to seconds
  const secondsAgo = Math.floor(timeDifference / 1000);

// Calculate minutes, hours, and days
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);

// Print the results
  if (daysAgo > 0) {
    return `${daysAgo} d`
  } else if (hoursAgo > 0) {
    return `${hoursAgo} h`
  } else if (minutesAgo > 0) {
    return `${minutesAgo} m`
  } else {
    return `${secondsAgo} s`
  }
}
