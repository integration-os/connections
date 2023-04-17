function parseJSON(payload: string): {
  [key: string]: unknown
}[] {
  try {
    const parsedPayload = JSON.parse(payload);

    return Object.entries(parsedPayload).map(([key, value]) => ({
      key,
      value,
    }));
  } catch (e) {
    return [];
  }
}
