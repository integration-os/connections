function parseCSV(payload: string): {
  [key: string]: string
}[] {
  const [headerLine, ...dataLines] = payload.split("\n");

  const delimiter = ",";
  const headers = headerLine.split(delimiter);

  return dataLines.map((line) => {
    const cells = line.split(delimiter);

    return headers.reduce((obj: {
      [key: string]: string
    }, header, index) => {
      obj[header] = cells[index];

      return obj;
    }, {});
  });
}
