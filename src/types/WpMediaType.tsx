export type WpMediaType = {

  id: number;
  guid: {
    rendered: string
  },
  media_details: {
    sizes: {
      full: {
        file: string,
        width: number,
        height: number,
        mime_type: string,
        "source_url": string
      }
    }
  }
};
