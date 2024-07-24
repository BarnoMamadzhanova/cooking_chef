//image

export interface IImage {
  file: string;
}

export interface IUploadedImage {
  id: number;
  imageUrl: string;
  remoteId: string;
  createdAt: string;
}
