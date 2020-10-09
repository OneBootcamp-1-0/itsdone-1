const data = require('./data.json');

// Результат смотреть через console.log

// Задача 1. Фильтрация карточек.

const filterCardsStatus = (cards, status) => {
  return cards.filter(card => card.status === status);
};

const cardsStatusInProgress = filterCardsStatus(data.tasks, 'done');
const cardsStatusToDo = filterCardsStatus(data.tasks, 'toDo');
const cardsStatusDone = filterCardsStatus(data.tasks, 'done');

const filterCardsSize = (cards, size) => {
  return cards.filter(card => card.text.length <= size);
}

const cardsShortSize = filterCardsSize(data.tasks, 140);

// Задача 2. Проверкa всех карточек на одинаковый статус.

const isAllCardsDone = (currentValue, index, arr) => {
  return currentValue.status === 'done';
}
const allDone = data.tasks.every(isAllCardsDone);
