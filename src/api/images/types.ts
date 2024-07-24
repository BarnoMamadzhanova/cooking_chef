//image

export interface IImage {
  file: string;
}

export interface IDeleteImage {
  imageId: number;
}

export interface IUploadedImage {
  id: number;
  imageUrl: string;
  remoteId: string;
  createdAt: string;
}
