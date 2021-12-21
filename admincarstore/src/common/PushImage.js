import {app, storage} from '../boot/firebase';
import 'firebase/storage';
import {
  ref,
  getStorage,
  uploadBytesResumable,
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
    await fetch(path)
      .then(response => {
        return response.blob();
      })
      .then(blob => {
        const storageRef = ref(storage, `Car/${imageName}`);
        const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          'state_changed',
          snapshot => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          error => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;

              // ...

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              console.log('File available at', downloadURL);
              return downloadURL;
            });
          },
        );
      });
  } catch (err) {
    console.log('ERR', err);
  }
};
