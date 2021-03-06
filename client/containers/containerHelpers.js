/* 
  input: integer and optional decimals integer
  output: float
  this function formats bytes to kilobytes for a cleaner display
*/
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  return parseFloat((bytes / Math.pow(k, 1)).toFixed(dm)) // + ' ' + sizes[i];
}

export default formatBytes