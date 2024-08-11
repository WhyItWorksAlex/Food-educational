/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
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
  function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
  }
  function openModal() {
    if (!modal.classList.contains('show')) {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);
    }
  }
  ;
  modalTriggers.forEach(item => {
    item.addEventListener('click', openModal);
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.classList.contains('modal__close')) {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  const modalTimerId = setTimeout(openModal, '10000000');

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

  // Использование классов для создания карточек (аналог функции конструктора)

  const getResource = async url => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return res.json();
  };
  class MenuCard {
    constructor(src, alt, title, descr, price, parent, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parent);
      this.transfer = 27; // курс валюты 
      this.changeToUAH();
    }
    changeToUAH() {
      this.price = this.price * this.transfer;
    }
    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.classes = 'menu__item';
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      element.innerHTML = `
        <img src="${this.src}" alt="${this.alt}">
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  // Получение данные через fetch API

  // getResource('http://localhost:3000/menu')
  //   .then(data => {
  //     for (let {img, altimg, title, descr, price} of data) {
  //       if (altimg === 'elite') {
  //         new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item', 'any-new-class').render(); // Просто для примера if
  //       } else {
  //         new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
  //       }
  //     };
  //   })

  // Получение данных через библиотеку AXIOS

  axios.get('http://localhost:3000/menu').then(data => {
    for (let {
      img,
      altimg,
      title,
      descr,
      price
    } of data.data) {
      if (altimg === 'elite') {
        new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item', 'any-new-class').render(); // Просто для примера if
      } else {
        new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
      }
    }
    ;
  });

  // Отправка формы на сервер через XMLHttpRequest

  // const forms = document.querySelectorAll('form');

  // const message = {
  //   loading: 'img/form/spinner.svg',
  //   success: 'Спасибо! Скоро мы с вами свяжемся',
  //   failure: 'Что-то пошло не так...',
  // }

  // forms.forEach((form) => {
  //   postData(form);
  // })

  // function postData(form) {
  //   form.addEventListener('submit', (e) => {
  //     e.preventDefault();

  //     const statusMessage = document.createElement('img');
  //     statusMessage.src = message.loading;
  //     statusMessage.style.cssText = `
  //       display: block;
  //       margin: 0 auto;
  //     `;

  //     form.insertAdjacentElement('afterend', statusMessage)

  //     const request = new XMLHttpRequest();

  //     request.open('POST', 'server.php');

  //     const formData = new FormData(form)

  //     request.setRequestHeader('Content-type', 'application/json'); // Это не нужно если отправляем FormData в базовом формате

  //     const object = {};
  //     formData.forEach((value, key) => {
  //       object[key] = value;
  //     })

  //     const json = JSON.stringify(object)

  //     request.send(json);

  //     // request.send(formData); // Если мы отправляем сразу объект FormData

  //     request.addEventListener('load', () => {
  //       if(request.status === 200) {
  //         showThanksModal(message.success);
  //         form.reset();
  //       } else {
  //         showThanksModal(message.failure);
  //       }
  //     statusMessage.remove()
  //     })
  //   })
  // };

  // function showThanksModal(message) {
  //   const prevModalDialog = document.querySelector('.modal__dialog');

  //   prevModalDialog.classList.add('hide');
  //   openModal();

  //   const thanksModal = document.createElement('div');
  //   thanksModal.classList.add('modal__dialog');
  //   thanksModal.innerHTML = `
  //     <div class="modal__content">
  //       <div data-close class="modal__close">&times;</div>
  //       <div class="modal__title">${message}</div>
  //     </div>
  //   `

  //   document.querySelector('.modal').append(thanksModal);
  //   setTimeout(() => {
  //     thanksModal.remove();
  //     prevModalDialog.classList.add('show');
  //     prevModalDialog.classList.remove('hide');
  //     closeModal();
  //   }, 4000)
  // };

  // Отправка формы на сервер через Fetch

  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  forms.forEach(form => {
    bindPostData(form);
  });
  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        // headers нужны только для JSON, для FormData не нужны
        'Content-type': 'application/json'
      },
      body: data
    });
    return res.json();
  };
  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form);

      // Первый способ сделать json из Form Data

      // const object = {};
      // formData.forEach((value, key) => {
      //   object[key] = value;
      // })
      // const json = JSON.stringify(object)

      // Второй способ сделать json из Form Data

      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      postData('http://localhost:3000/requests', json).then(data => {
        console.log(data);
        showThanksModal(message.success);
        form.reset();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        statusMessage.remove();
      });
    });
  }
  ;
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }
  ;

  // Слайдер

  const slider = document.querySelector('.offer__slider');
  const prevBtn = slider.querySelector('.offer__slider-prev');
  const nextBtn = slider.querySelector('.offer__slider-next');
  const numberCurrentSlide = slider.querySelector('#current');
  const totalSlides = slider.querySelector('#total');
  const slides = slider.querySelectorAll('.offer__slide');

  // Точки слайдера

  slider.style.position = 'relative';
  const dotsWrapper = document.createElement('ol');
  dotsWrapper.classList.add('carousel-indicators');
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      changeSlide(curSlide = i + 1);
    });
    dotsWrapper.append(dot);
  }
  slider.append(dotsWrapper);

  // Слайдер с прокруткой влево - вправо

  const sliderWrapper = slider.querySelector('.offer__slider-wrapper');
  const width = window.getComputedStyle(sliderWrapper).width;
  const sliderContent = slider.querySelector('.offer__slider-inner');
  sliderWrapper.style.overflow = 'hidden';
  sliderContent.style.display = 'flex';
  sliderContent.style.transition = 'all ease-in-out 0.5s';
  sliderContent.style.width = 100 * slides.length + '%';
  let curSlide = 1;
  slides.forEach(slide => {
    slide.style.width = width;
  });
  function changeSlide(n) {
    if (n > slides.length) {
      curSlide = 1;
    } else if (n < 1) {
      curSlide = slides.length;
    }
    if (curSlide <= 9) {
      numberCurrentSlide.textContent = `0${curSlide}`;
    } else {
      numberCurrentSlide.textContent = curSlide;
    }
    if (slides.length <= 9) {
      totalSlides.textContent = `0${slides.length}`;
    } else {
      totalSlides.textContent = slides.length;
    }
    dotsWrapper.querySelectorAll('.dot').forEach((dot, index) => {
      if (index === curSlide - 1) {
        dot.style.opacity = '1';
      } else {
        dot.style.opacity = '0.5';
      }
    });
    sliderContent.style.transform = `translateX(${-width.slice(0, -2) * (curSlide - 1)}px)`;
  }
  changeSlide(curSlide);
  nextBtn.addEventListener('click', () => {
    changeSlide(curSlide += 1);
  });
  prevBtn.addEventListener('click', () => {
    changeSlide(curSlide -= 1);
  });

  // Обычный слайдер по примеру

  // let curSlide = 1;

  // showSlide(curSlide);

  // function showSlide (n) {
  //   if (n > slides.length) {
  //     curSlide = 1
  //   } else if (n < 1) {
  //     curSlide = slides.length
  //   }

  //   if (curSlide <= 9) {
  //     numberCurrentSlide.textContent = `0${curSlide}`;
  //   } else {
  //     numberCurrentSlide.textContent = curSlide;
  //   }

  //   if (slides.length <= 9) {
  //     totalSlides.textContent = `0${slides.length}`;
  //   } else {
  //     totalSlides.textContent = slides.length;
  //   }

  //   slides.forEach((item, index) => {
  //     item.classList.add('hide')
  //     if (index === (curSlide-1)) {
  //       item.classList.remove('hide');
  //     }
  //   })
  // }

  // nextBtn.addEventListener('click', () => {
  //   showSlide(curSlide += 1)
  // })

  // prevBtn.addEventListener('click', () => {
  //   showSlide(curSlide -= 1)
  // })

  // Базовая реализация слайдера самостоятельно

  // function initSlider () {
  //   countTotalSlides();
  //   numberCurrentSlide.textContent = `0${Number(numberCurrentSlide.textContent) + 1}`
  //   for (let i = 0; i < slides.length; i++) {
  //     if (i >= 1) {
  //       slides[i].classList.add('hide');
  //     }
  //   }
  // }

  // initSlider();

  // function countTotalSlides () {
  //   if (slides.length <= 9) {
  //     totalSlides.textContent = `0${slides.length}`
  //   } else {
  //     totalSlides.textContent = slides.length;
  //   }
  // }

  // function handleNextSlide () {
  //   if(Number(numberCurrentSlide.textContent) !== Number(totalSlides.textContent)) {
  //     if (Number(numberCurrentSlide.textContent) >= 9) {
  //       numberCurrentSlide.textContent = Number(numberCurrentSlide.textContent) + 1
  //     } else {
  //       numberCurrentSlide.textContent = `0${Number(numberCurrentSlide.textContent) + 1}`
  //     }
  //     slides[Number(numberCurrentSlide.textContent) - 1].classList.remove('hide')
  //     slides[Number(numberCurrentSlide.textContent) - 2].classList.add('hide')
  //   } else {
  //     numberCurrentSlide.textContent = `01`
  //     slides[0].classList.remove('hide')
  //     slides[slides.length - 1].classList.add('hide')
  //   }
  // }

  // function handlePrevSlide () {
  //   if (Number(numberCurrentSlide.textContent) !== 1) {
  //     if (Number(numberCurrentSlide.textContent) >= 11) {
  //       numberCurrentSlide.textContent = Number(numberCurrentSlide.textContent) - 1
  //     } else {
  //       numberCurrentSlide.textContent = `0${Number(numberCurrentSlide.textContent) - 1}`
  //     }
  //     slides[Number(numberCurrentSlide.textContent) - 1].classList.remove('hide')
  //     slides[Number(numberCurrentSlide.textContent)].classList.add('hide')
  //   } else {
  //     numberCurrentSlide.textContent = Number(slides.length);
  //     slides[slides.length - 1].classList.remove('hide')
  //     slides[0].classList.add('hide')
  //   }

  // }

  // nextBtn.addEventListener('click', handleNextSlide)
  // prevBtn.addEventListener('click', handlePrevSlide)

  // Калькулятор по расчету калорий

  const result = document.querySelector('.calculating__result span');
  let heightPerson, weightPerson, agePerson;
  let sex = localStorage.getItem('sex') || localStorage.setItem('sex', 'female');
  let ratio = localStorage.getItem('ratio') || localStorage.setItem('ratio', 1.375);
  function calcTotal() {
    if (!sex || !heightPerson || !weightPerson || !agePerson || !ratio) {
      result.textContent = "____";
      return;
    }
    if (sex === 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weightPerson + 3.1 * heightPerson - 4.3 * agePerson) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weightPerson + 4.8 * heightPerson - 5.7 * agePerson) * ratio);
    }
    ;
  }
  ;
  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', ratio);
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', sex);
        }
        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }
  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }
      switch (input.getAttribute('id')) {
        case 'height':
          heightPerson = +input.value;
          break;
        case 'weight':
          weightPerson = +input.value;
          break;
        case 'age':
          agePerson = +input.value;
          break;
      }
      calcTotal();
    });
  }
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio') || elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }
    });
  }
  function initCalc() {
    calcTotal();
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  }
  initCalc();

  // 'https://gateway.marvel.com:443/v1/public/characters?apikey=7750d6729f9a98f9e26a89628b1eac18&limit=100'

  const getData = async () => {
    const response = await fetch('https://gateway.marvel.com:443/v1/public/characters?apikey=7750d6729f9a98f9e26a89628b1eac18');
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }
    return await response.json();
  };
  const getCharacter = async () => {
    const dataHero = await getData();
    const newData = dataHero.data.results[0];
    return console.log(newData);
  };
  getCharacter();

  // getHeroData = (data) => {
  //   const dataHero = data.data.results[0],
  //         reduceDescr = dataHero.description ? dataHero.description.slice(0, 150) + '...' : "does not contain a description",
  //         descr = dataHero.description ? dataHero.description : "does not contain a description";

  //   return {
  //       name: dataHero.name,
  //       reduceDescr,
  //       descr: descr,
  //       thumbnail: dataHero.thumbnail.path + `.${dataHero.thumbnail.extension}`,
  //       wiki: dataHero.urls[0].url,
  //       homepage: dataHero.urls[1].url,
  //       comics: dataHero.comics.items,
  //   }
  // }
});
/******/ })()
;
//# sourceMappingURL=script.js.map