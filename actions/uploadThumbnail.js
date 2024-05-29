import { storage } from "@/data/firebase";
import { ref, uploadBytes } from "firebase/storage";

// Add thumbnail to Firebase storage from the YouTube url
export default async function uploadImage() {
  try {
    // URL of the image you want to fetch
    const imageUrl = "https://i.ytimg.com/vi/Z88_PSpCPwU/default.jpg";

    // Fetch the image
    const response = await fetch(imageUrl);

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Convert the response to a blob
    const blob = await response.blob();

    const thumbRef = ref(storage, `thumbnails/test-image-2.jpg`);
    await uploadBytes(thumbRef, blob);
  } catch (error) {
    console.error("There was a problem fetching the image:", error);
  }
}
