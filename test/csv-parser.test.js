import CSVParser from '../src/csv-parser';

describe('CSVParser - Additional Cases', () => {
  // Тест на CSV с запятыми внутри кавычек
  it('parses CSV with commas inside quoted strings correctly', () => {
    const csvString = 'name,description\n"Alex, Jr.","This is Alex, thanks."';
    const parser = new CSVParser(csvString);
    const result = parser.parse();

    expect(result).toEqual([
      { name: 'Alex, Jr.', description: 'This is Alex, thanks.' },
    ]);
  });

  // Тест на строки, которые начинаются с пробелов
  it('parses CSV with lines starting with spaces correctly', () => {
    const csvString = ' name,age\n "Homer", 39\n"Lisa", 10';
    const parser = new CSVParser(csvString);
    const result = parser.parse();

    expect(result).toEqual([
      { name: 'Homer', age: 39 },
      { name: 'Lisa', age: 10 },
    ]);
  });

  // Тест на разные входные данные (большие числа, строки с пробелами, специальные символы)
  it('parses CSV with various data types correctly', () => {
    const csvString = 'name,age,salary\nAlex,32,500000\nVova,25,75000.50\n"Homer",50,"100,000"';
    const parser = new CSVParser(csvString);
    const result = parser.parse();

    expect(result).toEqual([
      { name: 'Alex', age: 32, salary: 500000 },
      { name: 'Vova', age: 25, salary: 75000.50 },
      { name: 'Homer', age: 50, salary: 100000 }
    ]);
  });


  // Тест на кривой CSV (некорректный разделитель, пропущенные запятые)
  it('throws an error when CSV has malformed structure (missing commas)', () => {
    const csvString = 'name,age\nAlex\nVova1';
    const parser = new CSVParser(csvString);

    expect(() => parser.parse()).toThrow('Invalid CSV format');
  });

  // Тест на CSV с большим количеством столбцов, чем в заголовке
  it('throws an error when rows have more columns than headers', () => {
    const csvString = 'name,age\nAlex,32,Developer\nVova,25';
    const parser = new CSVParser(csvString);

    expect(() => parser.parse()).toThrow('Invalid CSV format');
  });

  // Тест на CSV с одной колонкой
  it('parses CSV with only one column correctly', () => {
    const csvString = 'name\nHomer\nAlex\nVova';
    const parser = new CSVParser(csvString);
    const result = parser.parse();

    expect(result).toEqual([
      { name: 'Homer' },
      { name: 'Alex' },
      { name: 'Vova' }
    ]);
  });

  // Тест на несовпадение количества колонок с количеством данных
  it('throws an error when the number of columns does not match the number of data fields', () => {
    const csvString = 'name,age\nVova\nAlex,30';
    const parser = new CSVParser(csvString);

    expect(() => parser.parse()).toThrow('Invalid CSV format');
  });

  //priority test с задачи
  it('correctly parses a valid CSV string into JSON', () => {
    const csvData = `id, Марка, Модель, Год выпуска, Цена, Описание
0, BMW, 3 Series, 2000, '500,000', Не на ходу
1, BMW, 5 Series, 2005, '1,000,000', Проблемы с ДВС
2, Toyota, tlc 200, 2016, '5,000,000', 'Проблем не обнаружено, можно рекомендовать к покупке, есть мелкие "косяки" по лкп'
3, Subaru, WRX, 2015, '550,000', Замена подвески`;

    const parser = new CSVParser(csvData);
    const result = parser.parse();

    expect(result).toEqual([
      {
        id: 0,
        Марка: 'BMW',
        Модель: '3 Series',
        'Год выпуска': 2000,
        Цена: 500000,
        Описание: 'Не на ходу',
      },
      {
        id: 1,
        Марка: 'BMW',
        Модель: '5 Series',
        'Год выпуска': 2005,
        Цена: 1000000,
        Описание: 'Проблемы с ДВС',
      },
      {
        id: 2,
        Марка: 'Toyota',
        Модель: 'tlc 200',
        'Год выпуска': 2016,
        Цена: 5000000,
        Описание: 'Проблем не обнаружено, можно рекомендовать к покупке, есть мелкие "косяки" по лкп',
      },
      {
        id: 3,
        Марка: 'Subaru',
        Модель: 'WRX',
        'Год выпуска': 2015,
        Цена: 550000,
        Описание: 'Замена подвески',
      },
    ]);
  });
});
