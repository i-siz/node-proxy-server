interface DetailsItem {
  message: string;
  type: string;
}

export interface JoiError {
  error: {
    original: object;
  };
  details: DetailsItem[];
}
