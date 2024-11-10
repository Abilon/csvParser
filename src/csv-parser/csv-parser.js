class CSVParser {
  constructor(csvString) {
    this.csvString = csvString;
  }

  isValidCSV(lines) {
    if (lines.length === 0 || (lines.length === 1 && lines[0].trim() === "")) return false;

    const headers = this.splitCSVLine(lines[0]);

    if (headers.length === 0) return false;

    const expectedColumnCount = headers.length;

    for (let i = 1; i < lines.length; i++) {
      const columns = this.splitCSVLine(lines[i]);

      if (columns.length !== expectedColumnCount && columns.some(col => col.trim() !== "")) return false;
    }

    return true;
  }

  splitCSVLine(line) {
    const result = [];
    let currentValue = '';
    let insideQuotes = false;
    let insideSingleQuotes = false;
    let i = 0;

    while (i < line.length) {
      const char = line[i];

      if (char === '"' && !insideQuotes && !insideSingleQuotes) {
        insideQuotes = true;
        i++;
      } else if (char === '"' && insideQuotes && line[i + 1] === '"') {
        currentValue += '"';
        i += 2;
      } else if (char === '"' && insideQuotes) {
        insideQuotes = false;
        i++;
      } else if (char === "'" && !insideQuotes && !insideSingleQuotes) {
        insideSingleQuotes = true;
        i++;
      } else if (char === "'" && insideSingleQuotes) {
        insideSingleQuotes = false;
        i++;
      } else if (char === ',' && !insideQuotes && !insideSingleQuotes) {
        result.push(currentValue.trim());
        currentValue = '';
        i++;
      } else {
        currentValue += char;
        i++;
      }
    }

    if (currentValue.trim() !== '') result.push(currentValue.trim());

    return result;
  }

  sanitizeHeader(header) {
    return header.trim().replace(/^"|"$/g, "");
  }

  sanitizeValue(value) {
    return value.toString();
  }

  parse() {
    const lines = [];
    const rawLines = this.csvString.split("\n");

    for (let i = 0; i < rawLines.length; i++) {
      const trimmedLine = rawLines[i].trim();

      if (trimmedLine.length > 0) lines.push(trimmedLine);
    }

    if (lines.length === 0 || (lines.length === 1 && lines[0].length === 0)) return [];

    if (!this.isValidCSV(lines)) throw new Error('Invalid CSV format');

    this.headers = [];
    const rawHeaders = this.splitCSVLine(lines[0]);
    for (let i = 0; i < rawHeaders.length; i++) {
      this.headers.push(this.sanitizeHeader(rawHeaders[i]));
    }

    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const values = this.splitCSVLine(line);

      if (values.length !== this.headers.length)
        throw new Error('Invalid CSV format');

      const obj = {};
      for (let j = 0; j < this.headers.length; j++) {
        obj[this.headers[j]] = this.sanitizeValue(values[j]);
      }
      result.push(obj);
    }

    return result;
  }
}

export default CSVParser;
