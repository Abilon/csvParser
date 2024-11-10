import CSVParser from '../csv-parser/csv-parser';
import { csvWithCommas, csvWithLeadingSpaces, csvWithVariousData, malformedCsv, csvWithExtraColumns, singleColumnCsv, mismatchedColumnsCsv, priorityCsvData } from '../mock/csv-test-data';

describe('CSVParser - Additional Cases', () => {
  it('parses CSV with commas inside quoted strings correctly', () => {
    const parser = new CSVParser(csvWithCommas);
    const result = parser.parse();

    expect(result).toEqual([
      { name: 'Alex, Jr.', description: 'This is Alex, thanks.' },
    ]);
  });

  it('parses CSV with lines starting with spaces correctly', () => {
    const parser = new CSVParser(csvWithLeadingSpaces);
    const result = parser.parse();

    expect(result).toEqual([
      { name: 'Homer', age: '39' },
      { name: 'Lisa', age: '10' },
    ]);
  });

  it('parses CSV with various data types correctly', () => {
    const parser = new CSVParser(csvWithVariousData);
    const result = parser.parse();

    expect(result).toEqual([
      { name: 'Alex', age: '32', salary: '500,000' },
      { name: 'Vova', age: '25', salary: '75000.50' },
      { name: 'Homer', age: '50', salary: '100,000' },
    ]);
  });

  it('throws an error when CSV has malformed structure (missing commas)', () => {
    const parser = new CSVParser(malformedCsv);

    expect(() => parser.parse()).toThrow('Invalid CSV format');
  });

  it('throws an error when rows have more columns than headers', () => {
    const parser = new CSVParser(csvWithExtraColumns);

    expect(() => parser.parse()).toThrow('Invalid CSV format');
  });

  it('parses CSV with only one column correctly', () => {
    const parser = new CSVParser(singleColumnCsv);
    const result = parser.parse();

    expect(result).toEqual([
      { name: 'Homer' },
      { name: 'Alex' },
      { name: 'Vova' },
    ]);
  });

  it('throws an error when the number of columns does not match the number of data fields', () => {
    const parser = new CSVParser(mismatchedColumnsCsv);

    expect(() => parser.parse()).toThrow('Invalid CSV format');
  });

  it('correctly parses a valid CSV string into JSON', () => {
    const parser = new CSVParser(priorityCsvData);
    const result = parser.parse();

    expect(result).toEqual([
      {
        id: '0',
        Марка: 'BMW',
        Модель: '3 Series',
        'Год выпуска': '2000',
        Цена: '500,000',
        Описание: 'Не на ходу',
      },
      {
        id: '1',
        Марка: 'BMW',
        Модель: '5 Series',
        'Год выпуска': '2005',
        Цена: '1,000,000',
        Описание: 'Проблемы с ДВС',
      },
      {
        id: '2',
        Марка: 'Toyota',
        Модель: 'tlc 200',
        'Год выпуска': '2016',
        Цена: '5,000,000',
        Описание: 'Проблем не обнаружено, можно рекомендовать к покупке, есть мелкие "косяки" по лкп',
      },
      {
        id: '3',
        Марка: 'Subaru',
        Модель: 'WRX',
        'Год выпуска': '2015',
        Цена: '550,000',
        Описание: 'Замена подвески',
      },
    ]);
  });
});
