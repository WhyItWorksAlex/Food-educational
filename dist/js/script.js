/******/ (() => { // webpackBootstrap
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
window.addEventListener('DOMContentLoaded', () => {
  // Табы

  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsParent = document.querySelector('.tabheader__items');
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('fade');
    });
    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    });
  }
  function showTabContent(i = 0) {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('fade');
    tabs[i].classList.add('tabheader__item_active');
  }
  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('tabheader__item')) {
      tabs.forEach((item, index) => {
        if (target === item) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });

  // Таймер

  const deadline = '2025-01-01';
  function getTimeRemaining(endtime) {
    const now = new Date();
    const differenceUTC = now.getTimezoneOffset() * 60 * 1000;
    let t = Date.parse(endtime) - Date.parse(now) + differenceUTC; // Получим разницу в мс между финальной датой и текущей локальной датой и часовой пояс локальный
    let days, hours, minutes, seconds;
    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor(t / (1000 * 60 * 60) % 24);
      minutes = Math.floor(t / (1000 * 60) % 60);
      seconds = Math.floor(t / 1000 % 60);
    }
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  function getZero(num) {
    if (num >= 0 && num <= 9) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000); // Первый запуск будет через 1000мс для этого мы ниже запустим первый раз вручную

    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock('.timer', deadline);

  // Модальное окно

  const modalTriggers = document.querySelectorAll('[data-modal');
  const modal = document.querySelector('.modal');
  const modalCloseBtn = document.querySelector('[data-close]');
  const modalInner = document.querySelector('.modal__dialog');
  function closeModal() {
    modal.classList.remove('modal__open');
    document.body.style.overflow = '';
    modalCloseBtn.removeEventListener('click', closeModal);
  }
  function openModal() {
    if (!modal.classList.contains('modal__open')) {
      modal.classList.add('modal__open');
      modalCloseBtn.addEventListener('click', closeModal);
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);
    }
  }
  ;
  modalTriggers.forEach(item => {
    item.addEventListener('click', openModal);
  });
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('modal__open')) {
      closeModal();
    }
  });
  const modalTimerId = setTimeout(openModal, '15000');

  // document.documentElement.scrollHeight - это полная высота всего контента страницы
  // document.documentElement.clientHeight - то, сколько мы видем на экране
  // window.scrollY - то, сколько мы уже пролистами из общей длины документа

  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);
});
/******/ })()
;
//# sourceMappingURL=script.js.map