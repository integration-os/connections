const parseJSON = (payload: string): {
  [key: string]: string
}[] => {
  try {
    return JSON.parse(payload);
  } catch (e) {
    return [];
  }
};
