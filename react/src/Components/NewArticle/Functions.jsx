// import storage from '../../Firebase/FirebaseConfig'

export const uploadImageToFirebase = async (file) => {
  try {
    const fileName = `article_${Date.now()}`;
    const storageRef = storage.ref(fileName);
    await storageRef.put(file);
    const downloadUrl = await storageRef.getDownloadURL();

    return downloadUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const deleteImageFromFirebase = async (imageUrl) => {
  try {
    const storageRef = storage.refFromURL(imageUrl);
    await storageRef.delete();
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};
