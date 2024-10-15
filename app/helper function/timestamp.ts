export const getFormattedTimestamp = (): string => {
  const now = new Date();
  // console.log(now);

  // Convert to GMT format
  const gmtTimestamp = now.toUTCString();
  // ... existing code ...

  // Format the date to 'YYYY-MM-DD HH:mm:ss'
  const formattedTimestamp = now
    .toISOString()
    .replace("T", " ")
    .substring(0, 19);
  // console.log(formattedTimestamp);
  return formattedTimestamp;
};
