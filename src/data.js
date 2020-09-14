const statusesList = ['toDo', 'inProgress', 'inTesting', 'done'];
const statusesToColumnTitles = {
  toDo: 'TODO',
  inProgress: 'IN PROGRESS',
  inTesting: 'IN TESTING',
  done: 'DONE'
};
const textsList = [
  'Перед выполнением нужно внимательно прочитать документацию.',
  'авно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст..',
  'Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь.', 'Есть много надо'
];
const titlesList = [
  'Не забыть выполнить важную задачу',
  'Постирать кошку',
  'Сделать задание',
  'Найти покемона'
];
const datesList = [
  'Завтра в 14:00',
  'Cегодня в 18:45',
  'Вчера в 3:00',
  ''
];

const getRandomElementFromArray = (arr) => {
  const randomNumber = Math.floor(Math.random() * (arr.length - 0) + 0);

  return arr[randomNumber];
};

export const getCards = (quantity = 20) => {
  return Array.from({ length: quantity }).map((_, i) => {
    return {
      id: i,
      date: getRandomElementFromArray(datesList),
      title: getRandomElementFromArray(titlesList),
      text: getRandomElementFromArray(textsList),
      status: getRandomElementFromArray(statusesList),
      isDone: getRandomElementFromArray([true, false])
    };
  });
};

export const getColumns = () => {
  return statusesList.map(status => {
    return {
      title: statusesToColumnTitles[status],
      status
    };
  });
};
