export type IAlbums = IAlbum[];

export type IAlbumPhotos = IAlbumPhoto[];

export interface IAlbum {
  userId: number;
  id: number;
  title: string;
}

export interface IAlbumPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
