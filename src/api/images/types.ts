//image

export interface IImageRequest {
  file: FormData;
}

export interface IUploadedImage {
  id: number;
  imageUrl: string;
  remoteId: string;
  createdAt: string;
}
