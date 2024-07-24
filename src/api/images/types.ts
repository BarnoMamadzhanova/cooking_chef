//image

export interface IImage {
  file: FormData;
}

export interface IUploadedImage {
  id: number;
  imageUrl: string;
  remoteId: string;
  createdAt: string;
}
