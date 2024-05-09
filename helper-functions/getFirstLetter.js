export default function getFirstLetter(string) {
  // Check if the input is not empty
  if (string.length === 0) {
    return "";
  }

  // Get the first letter and capitalize it
  return string.charAt(0).toUpperCase();
}
