export interface GifImages {
  fixed_width: {
    mp4: string;
    width: string;
    height: string;
  };
}

export interface Gif {
  id: string;
  url: string;
  title: string;
  alt_text: string;
  images: GifImages;
}

export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface GiphyResponse {
  data: Gif[];
  pagination: Pagination;
  meta: {
    status: number;
    msg: string;
  };
}

export interface GiphyRandomResponse {
  data: Gif;
  meta: {
    status: number;
    msg: string;
  };
}
