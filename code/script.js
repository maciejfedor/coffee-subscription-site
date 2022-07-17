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
// const allSections = document.querySelectorAll('.section');

// const revealSection = function (entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;

//   entry.target.classList.remove('section--hidden');
//   observer.unobserve(entry.target);
// };

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.15,
// });

// allSections.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add('section--hidden');
// });

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
  itemEl[i].classList.toggle('accordion__hidden-open');
  itemEl[i].classList.toggle('accordion__header--open');

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
        closelatestItem();
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

//scroll into view
