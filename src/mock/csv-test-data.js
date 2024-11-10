export const csvWithCommas = 'name,description\n"Alex, Jr.","This is Alex, thanks."';
export const csvWithLeadingSpaces = ' name,age\n "Homer", 39\n"Lisa", 10';
export const csvWithVariousData = 'name,age,salary\nAlex,32,"500,000"\nVova,25,75000.50\n"Homer",50,"100,000"';
export const malformedCsv = 'name,age\nAlex\nVova1';
export const csvWithExtraColumns = 'name,age\nAlex,32,Developer\nVova,25';
export const singleColumnCsv = 'name\nHomer\nAlex\nVova';
export const mismatchedColumnsCsv = 'name,age\nVova\nAlex,30';
export const priorityCsvData = `id,Марка,Модель,Год выпуска,Цена,Описание
0,BMW,3 Series,2000,'500,000',Не на ходу
1,BMW,5 Series,2005,'1,000,000',Проблемы с ДВС
2,Toyota,tlc 200,2016,'5,000,000','Проблем не обнаружено, можно рекомендовать к покупке, есть мелкие "косяки" по лкп'
3,Subaru,WRX,2015,'550,000',Замена подвески`;
