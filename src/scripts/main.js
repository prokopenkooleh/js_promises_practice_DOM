'use strict';

const body = document.body;
let leftClicked = false;
let rightClicked = false;

function promOne(params) {
  const firstPromise = new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);

    document.addEventListener('click', () => {
      clearTimeout(timeoutId);

      resolve('First promise was resolved');
    });
  });

  return firstPromise;
}

async function promFirst() {
  try {
    const dataOne = await promOne();
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');

    div.textContent = dataOne;
    div.classList.add('success');

    body.append(div);
  } catch (error) {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');

    div.textContent = error.message;
    div.classList.add('error');

    body.append(div);
  }
}
promFirst();

function promTwo(params) {
  const secondPromise = new Promise((resolve) => {
    body.addEventListener('click', () => {
      resolve('Second promise was resolved');
    });

    body.addEventListener('contextmenu', () => {
      resolve('Second promise was resolved');
    });
  });

  return secondPromise;
}

async function promSecond() {
  const dataTwo = await promTwo();
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  div.textContent = dataTwo;
  div.classList.add('success');

  body.append(div);
}
promSecond();

function promThree(params) {
  const thirdPromise = new Promise((resolve, reject) => {
    body.addEventListener('click', () => {
      leftClicked = true;

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
      }
    });

    body.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();

      rightClicked = true;

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
      }
    });
  });

  return thirdPromise;
}

async function promThird() {
  try {
    const dataThree = await promThree();
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');

    div.textContent = dataThree;
    div.classList.add('success');

    body.append(div);
  } catch (error) {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');

    div.classList.add('error');
  }
}
promThird();
