import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlobService {
  constructor() {}

  getBlobUrl(fileSourceData: any, fileType: string) {
    let mimeType = `image/${fileType}`; // e.g., image/png
    //let imageUrlBase64 = `data:${mimeType};base64,${product.productImage.fileSource}`;
    let byteCharacters = atob(fileSourceData);

    let byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    let blob = new Blob([byteArray], { type: mimeType });
    let imageUrlBlob = URL.createObjectURL(blob);

    return imageUrlBlob;
  }
}
