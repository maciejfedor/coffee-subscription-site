'use strict';

const nav = document.querySelector('.nav');
const choiceItem = document.querySelectorAll('.nav__choices--item');
const choiceItemText = document.querySelectorAll('.nav__choices--choice');
const choices = document.querySelector('.nav__choices');

// Sticky navigation

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Accordion
const itemEl = document.querySelectorAll('.accordion__header');
const itemContent = document.querySelectorAll('.accordion__hidden');

const openItem = function (i) {
  itemEl[i].classList.add('accordion__hidden-open');
  itemEl[i].classList.add('accordion__header--open');

  if (itemEl[i].classList.contains('accordion__hidden-open'))
    itemContent[i].style.maxHeight = itemContent[i].scrollHeight + 'px';
  else itemContent[i].style.maxHeight = 0;
};

const closecurrentItem = function (j) {
  itemEl[j].classList.remove('accordion__hidden-open');
  itemEl[j].classList.toggle('accordion__header--open');
  itemContent[j].style.maxHeight = 0;
};

const closelatestItem = function () {
  itemEl.forEach((item, i) => {
    item.classList.remove('accordion__hidden-open');
    itemContent[i].style.maxHeight = 0;
  });
};

const accordionOpen = function () {
  itemEl.forEach((item, i) => {
    item.addEventListener('click', function () {
      if (item.classList.contains('accordion__hidden-open')) {
        choiceItemText.forEach(item => {
          item.classList.remove('nav__choices--choice-active');
        });
        closecurrentItem(i);
      } else {
        // closelatestItem();
        openItem(i);
        choiceItemText.forEach(item => {
          item.classList.remove('nav__choices--choice-active');
        });
        choiceItemText[i].classList.add('nav__choices--choice-active');
      }
    });
  });
};

accordionOpen();

const scrollIntoChoice = function (i) {
  const yOffset = -451;
  const choice = itemEl[i];
  const y = choice.getBoundingClientRect().top + window.pageYOffset + yOffset;

  if (i != 0) window.scrollTo({ top: y, behavior: 'smooth' });
};

choiceItem.forEach((item, i) => {
  item.addEventListener('click', function () {
    scrollIntoChoice(i);
    choiceItemText.forEach(item => {
      item.classList.remove('nav__choices--choice-active');
    });
    choiceItemText[i].classList.add('nav__choices--choice-active');
    closelatestItem();
    openItem(i);
  });
});

//Card choice
const cards = document.querySelectorAll('.accordion__card');
const cardDesc = document.querySelectorAll('.accordion__card-header');

itemContent.forEach((card, i) => {
  card.addEventListener('click', function (e) {
    const clicked = e.target.closest('.accordion__card');

    if (clicked.classList.contains('accordion__card')) {
      itemContent[i]
        .querySelectorAll(':scope > .accordion__card')
        .forEach(c => c.classList.remove('accordion__card--active'));

      clicked.classList.add('accordion__card--active');
      let header = clicked.querySelector('.accordion__card-header').textContent;

      summaryUpdate(i, header);
      PaymentUpdate();
    }
    if (i < 4) {
      openItem(i + 1);
      itemEl[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
      choiceItemText.forEach(item => {
        item.classList.remove('nav__choices--choice-active');
      });
      choiceItemText[i + 1].classList.add('nav__choices--choice-active');
    }
  });
});

const summary = document.querySelector('.choices__summary-text');
const modalSummary = document.querySelector('.modal__quote');

const summaryUpdate = function (i, fill) {
  let blank = summary.querySelectorAll(':scope > span');
  let blankModal = modalSummary.querySelectorAll(':scope > span');

  blank[i].textContent = fill;
  blankModal[i].textContent = fill;
};

//Modal

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnOpenModal = document.querySelector('.btn--open-modal');

const openModal = function (e) {
  e.preventDefault();
  if (!summary.textContent.includes('_____')) {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    nav.style.opacity = 0;
  }
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  nav.style.opacity = 1;
};

btnOpenModal.addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// price update
const price = document.querySelector('.modal__price');
let weight = summary.querySelector(':scope > .weight');
let freq = summary.querySelector(':scope > .freq');

const PaymentUpdate = function () {
  if (weight.textContent == '250g') {
    if (freq.textContent == 'Every week') {
      price.textContent = `$${7.2 * 4} / mo`;
    } else if (freq.textContent == 'Every 2 weeks') {
      price.textContent = `$${9.6 * 2} / mo`;
    } else if (freq.textContent == 'Every month') {
      price.textContent = '$12.00  / mo';
    }
  } else if (weight.textContent == '500g') {
    if (freq.textContent == 'Every week') {
      price.textContent = `$${13 * 4} / mo`;
    } else if (freq.textContent == 'Every 2 weeks') {
      price.textContent = `$${17.5 * 2} / mo`;
    } else if (freq.textContent == 'Every month') {
      price.textContent = '$22.00  / mo';
    }
  } else if (weight.textContent == '1000g') {
    if (freq.textContent == 'Every week') {
      price.textContent = `$${22 * 4} / mo`;
    } else if (freq.textContent == 'Every 2 weeks') {
      price.textContent = `$${32 * 2} / mo`;
    } else if (freq.textContent == 'Every month') {
      price.textContent = '$42.00  / mo';
    }
  }
};
