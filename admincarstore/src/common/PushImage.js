import {app, storage} from '../boot/firebase';
import 'firebase/storage';
import {
  ref,
  getStorage,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const metadata = {
  contentType: 'image/jpeg',
};
export const uploadImageToStorage = async (path, imageName) => {
  try {
    let res = '';
    await fetch(path)
      .then(response => {
        return response.blob();
      })
      .then(async blob => {
        const storageRef = ref(storage, `Car/${imageName}`);
        await uploadBytes(storageRef, blob).then(async snapshot => {
          await getDownloadURL(snapshot.ref).then(downloadURL => {
            console.log('File available at', downloadURL);
            res = downloadURL;
            // return downloadURL;
          });
        });
      });
      return res;
  } catch (err) {
    console.log('ERR', err);
  }
};
