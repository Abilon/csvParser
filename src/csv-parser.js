class CSVParser {
  constructor(csvString) {
    this.csvString = csvString;
  }

  isValidCSV(lines) {
    if (lines.length === 0 || (lines.length === 1 && lines[0].trim() === ""))
      return false;

    const headers = this.splitCSVLine(lines[0]);

    if (headers.length === 0) return false;

    const expectedColumnCount = headers.length;

    for (let i = 1; i < lines.length; i++) {
      const columns = this.splitCSVLine(lines[i]);

      if (columns.length !== expectedColumnCount) return false;
    }

    return true;
  }

  splitCSVLine(line) {
    const regex = /(?:^|,)\s*(?:"([^"]*)"|'([^']*)'|([^",]*))/g;
    const matches = [];
    let match;

    while ((match = regex.exec(line)) !== null) {
      matches.push(match[1] || match[2] || match[3]);
    }

    return matches.map(m => m ? m.trim() : '').filter(Boolean);
  }

  sanitizeHeader(header) {
    return header.trim().replace(/^"|"$/g, "");
  }

  sanitizeValue(value) {
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.slice(1, -1);
    }

    const numberValue = Number(value.replace(/,/g, ""));
    return isNaN(numberValue) ? value : numberValue;
  }

  parse() {
    const lines = this.csvString
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length === 0 || (lines.length === 1 && lines[0].length === 0)) {
      return [];
    }

    if (!this.isValidCSV(lines)) throw new Error('Invalid CSV format');

    this.headers = this.splitCSVLine(lines[0]).map((header) =>
      this.sanitizeHeader(header),
    );

    return lines.slice(1).map((line) => {
      const values = this.splitCSVLine(line);

      if (values.length !== this.headers.length)
        throw new Error('Invalid CSV format');

      return this.headers.reduce((obj, header, index) => {
        obj[header] = this.sanitizeValue(values[index]);

        return obj;
      }, {});
    });
  }
}

export default CSVParser;
