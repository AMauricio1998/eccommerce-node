import { Storage } from '@google-cloud/storage';
import { format } from 'util';
import url from 'url';
import { v4 as uuidv4 } from 'uuid';
const uuid = uuidv4();

const storage = new Storage({
    projectId: "delivery-kotlin",
    keyFilename: './serviceAccountKey.json'
});

const bucket = storage.bucket("gs://delivery-kotlin.appspot.com");

export default (file, pathImage, deletePathImage) => {
    return new Promise((resolve, reject) => {
        
        console.log('delete path', deletePathImage)
        if (deletePathImage) {

            if (deletePathImage) {
                const parseDeletePathImage = url.parse(deletePathImage)
                const prefixLength = '/v0/b/delivery-kotlin.appspot.com/o/'.length;
                var urlDelete = parseDeletePathImage.pathname.slice(prefixLength);
                const fileDelete = bucket.file(`${urlDelete}`)
                fileDelete.delete().then(() => {
                    console.log('se borro la imagen con exito')
                }).catch(err => {
                    console.log('Failed to remove photo, error:', err)
                });
            }
        }


        if (pathImage) {
            if (pathImage != null || pathImage != undefined) {

                let fileUpload = bucket.file(`${pathImage}`);
                const blobStream = fileUpload.createWriteStream({
                    metadata: {
                        contentType: 'image/png',
                        metadata: {
                            firebaseStorageDownloadTokens: uuid,
                        }
                    },
                    resumable: false
                });
                
                blobStream.on('error', (error) => {
                    console.log('Error al subir archivo a firebase', error);
                    reject('Something is wrong! Unable to upload at the moment.');
                });
                
                blobStream.on('finish', () => {
                    const url = format(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media&token=${uuid}`);
                    console.log('URL DE CLOUD STORAGE ', url);
                    resolve(url);
                });
                
                blobStream.end(file.buffer);
            }
        }
    });
}