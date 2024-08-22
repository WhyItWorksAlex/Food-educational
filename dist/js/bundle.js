/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc () {

  // Калькулятор по расчету калорий

  const result = document.querySelector('.calculating__result span');

  let heightPerson, weightPerson, agePerson;
  let sex =  localStorage.getItem('sex') || localStorage.setItem('sex', 'female');      
  let ratio = localStorage.getItem('ratio') || localStorage.setItem('ratio', 1.375);

  function calcTotal () {
    if (!sex || !heightPerson || !weightPerson || !agePerson || !ratio) {
      result.textContent = "____";
      return;
    }

    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weightPerson) + (3.1 * heightPerson) - (4.3 * agePerson)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weightPerson) + (4.8 * heightPerson) - (5.7 * agePerson)) * ratio);
    };

  };


  function getStaticInformation (selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio')
          localStorage.setItem('ratio', ratio)
        } else {
          sex = e.target.getAttribute('id')
          localStorage.setItem('sex', sex)
        }
  
        elements.forEach(elem => {
          elem.classList.remove(activeClass)
        });
  
        e.target.classList.add(activeClass)
        calcTotal()
      })
    })
  }


  function getDynamicInformation (selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

      if(input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch(input.getAttribute('id')) {
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
      calcTotal()
    });
  }

  function initLocalSettings (selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.classList.remove(activeClass)

      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio') || elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass)
      }
    })
  }

  function initCalc () {
    calcTotal();
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')
  }

  initCalc();

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards () {

  // Использование классов для создания карточек (аналог функции конструктора)

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
      this.changeToUAH()
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

  // Получение данные через fetch API (async/await) проверка ответа (аналог axios)

  // const getResource = async (url) => {
  //   const res = await fetch(url);

  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  //   }

  //   return res.json();
  // }

  // Парсинг данные и создание карточек через Promises

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

  axios.get('http://localhost:3000/menu')
    .then(data => {
      for (let {img, altimg, title, descr, price} of data.data) {
        if (altimg === 'elite') {
          new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item', 'any-new-class').render(); // Просто для примера if
        } else {
          new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
        }
      };
    })

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");



function forms (formsSelector, modalTimerId) {

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

  const forms = document.querySelectorAll(formsSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
  }

  forms.forEach((form) => {
    bindPostData(form);
  })

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;

      form.insertAdjacentElement('afterend', statusMessage)

      const formData = new FormData(form)

      // Первый способ сделать json из Form Data

      // const object = {};
      // formData.forEach((value, key) => {
      //   object[key] = value;
      // })
      // const json = JSON.stringify(object)

      // Второй способ сделать json из Form Data
      
      const json = JSON.stringify(Object.fromEntries(formData.entries()))

      ;(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
      .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          form.reset();
      })
      .catch(() => {
          showThanksModal(message.failure);
      })
      .finally(() => {
          statusMessage.remove()
      })
    })
  };

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 4000)
  };

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function closeModal (modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('show');
  modal.classList.add('hide');
  document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  if (!modal.classList.contains('show')) {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
      clearInterval(modalTimerId);
    }
  }
};

function modal (triggerSelector, modalSelector, modalTimerId) {

    // Модальное окно

    const modalTriggers = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
  
    modalTriggers.forEach((item) => {
      item.addEventListener('click', () => openModal(modalSelector, modalTimerId))
    });
  
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal__close')) {
        closeModal(modalSelector)
      }
    });
  
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal(modalSelector)
      }
    });
  
    // document.documentElement.scrollHeight - это полная высота всего контента страницы
    // document.documentElement.clientHeight - то, сколько мы видем на экране
    // window.scrollY - то, сколько мы уже пролистами из общей длины документа
  
    function showModalByScroll () {
      if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal(modalSelector, modalTimerId)
        window.removeEventListener('scroll', showModalByScroll);
      }  
    }
  
    window.addEventListener('scroll', showModalByScroll);
  

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

  // Слайдер

  const slider = document.querySelector(container);
  const prevBtn = slider.querySelector(prevArrow);
  const nextBtn = slider.querySelector(nextArrow);
  const numberCurrentSlide = slider.querySelector(currentCounter);
  const totalSlides = slider.querySelector(totalCounter);
  const slides = slider.querySelectorAll(slide);

  // Точки слайдера

  slider.style.position = 'relative';

  const dotsWrapper = document.createElement('ol');
  dotsWrapper.classList.add('carousel-indicators');
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      changeSlide(curSlide = i + 1)
    })
    dotsWrapper.append(dot);
  }
  slider.append(dotsWrapper);

  // Слайдер с прокруткой влево - вправо

  const sliderWrapper = slider.querySelector(wrapper)
  const width = window.getComputedStyle(sliderWrapper).width;
  const sliderContent = slider.querySelector(field);

  sliderWrapper.style.overflow = 'hidden';
  sliderContent.style.display = 'flex';
  sliderContent.style.transition = 'all ease-in-out 0.5s';
  sliderContent.style.width = 100 * slides.length + '%'

  let curSlide = 1;

  slides.forEach(slide => {
    slide.style.width = width;
  })

  function changeSlide (n) {

    if (n > slides.length) {
      curSlide = 1
    } else if (n < 1) { 
      curSlide = slides.length
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
      if (index === (curSlide - 1)) {
        dot.style.opacity = '1'
      } else {
        dot.style.opacity = '0.5';
      }
    })
    
    sliderContent.style.transform = `translateX(${-(width.slice(0,-2)) * (curSlide - 1)}px)`
  }

  changeSlide(curSlide);

  nextBtn.addEventListener('click', () => {
    changeSlide(curSlide += 1)
  })

  prevBtn.addEventListener('click', () => {
    changeSlide(curSlide -= 1)
  })



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


};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs (tabsSelector, tabsContentSelector, tabsparentSelector, activeClass) {

  const tabs = document.querySelectorAll(tabsSelector);
  const tabsContent = document.querySelectorAll(tabsContentSelector);
  const tabsParent = document.querySelector(tabsparentSelector);

  function hideTabContent () {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('fade');
    })

    tabs.forEach(tab => {
      tab.classList.remove(activeClass);
    })
  }

  function showTabContent (i = 0) {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('fade');
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, index) => {
        if (target === item) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  })
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer (id, deadline) {

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
      days = Math.floor( t / (1000 * 60 * 60 * 24));
      hours = Math.floor(( t / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((t / (1000 * 60)) % 60)
      seconds = Math.floor((t / 1000) % 60)
    }

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds,
    }
  }

  function getZero(num) {
    if (num >= 0 && num <= 9) {
      return `0${num}`;
    } else {
      return num
    }
  }


  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000) // Первый запуск будет через 1000мс для этого мы ниже запустим первый раз вручную

    updateClock()

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval)
      }
    }
  }

  setClock(id, deadline)

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {                               // headers нужны только для JSON, для FormData не нужны
      'Content-type': 'application/json'
    },
    body: data,
  });

  return res.json();
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs.js */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal.js */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer.js */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_cards_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards.js */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_calc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc.js */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_forms_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms.js */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider.js */ "./src/js/modules/slider.js");









window.addEventListener('DOMContentLoaded', () => {

  const modalTimerId = setTimeout(() => (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), '10000000');

  (0,_modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal', '.modal', modalTimerId);
  (0,_modules_timer_js__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2025-01-01');
  (0,_modules_cards_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_calc_js__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_forms_js__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
  (0,_modules_slider_js__WEBPACK_IMPORTED_MODULE_6__["default"])({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    slide: '.offer__slide',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
  });
  
});
/******/ })()
;
//# sourceMappingURL=bundle.js.map