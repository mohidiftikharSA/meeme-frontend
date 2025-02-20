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
  if (isNaN(timestamp)) {
    throw new Error('Invalid timestamp provided');
  }
  const currentTime = new Date();
  const timeDifference = currentTime - timestamp;
  if (timeDifference < 0) {
    return 'just now';
  }
  const secondsAgo = Math.floor(timeDifference / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);

  // Return the formatted result
  if (daysAgo > 0) {
    return `${daysAgo} d`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo} h`;
  } else if (minutesAgo > 0) {
    return `${minutesAgo} m`;
  } else {
    return `${secondsAgo} s`;
  }
}


export function timeAgo(timestamp) {
  const currentDate = new Date();
  const postDate = new Date(timestamp);
  const timeDifference = currentDate - postDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? 'a year ago' : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? 'a month ago' : `${months} months ago`;
  } else if (days > 0) {
    return days === 1 ? 'a day ago' : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? 'an hour ago' : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? 'a minute ago' : `${minutes} minutes ago`;
  } else {
    return 'just now';
  }
}

export function formatDate(isoDate) {
  const date = new Date(isoDate);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedDate;
}

export const coinConvert = (coins) => {
  let coin = coins;

  if (coin >= 1000000) {
      if (coin % 1000000 == 0) {
          coin = `${coin / 1000000}M`;
          return coin;
      } else {
          coin = `${(coin / 1000000).toFixed(1)}M`;
          return coin;
      }
  } else if (coin >= 1000) {
      if (coin % 1000 == 0) {
          coin = `${coin / 1000}K`;
          return coin;
      } else {
          coin = `${(coin / 1000).toFixed(1)}K`;
          return coin;
      }
  } else {
      return coin;
  }
};
