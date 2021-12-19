import getFirebase from '../boot/firebase';
export const uploadImageToStorage = async (path, imageName) => {
  console.log(path, imageName)
  const storageRef = getFirebase.storageRef();
  console.log('stoRef', storageRef)
  const currentRef = storageRef.child(`Car/${imageName}`);
  console.log('curRef',currentRef)
  await currentRef.putFile(path);
  console.log(path, imageName, currentRef.getDownloadURL())
  return currentRef.getDownloadURL();
};
