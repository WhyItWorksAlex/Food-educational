'use strict'
window.addEventListener('DOMContentLoaded', () => {
  
  // Табы

  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent () {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('fade');
    })

    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    })
  }

  function showTabContent (i = 0) {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('fade');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('tabheader__item')) {
      tabs.forEach((item, index) => {
        if (target === item) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  })

  // Таймер

  const deadline = '2025-01-01'

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

  setClock('.timer', deadline)

  // Модальное окно

  const modalTriggers = document.querySelectorAll('[data-modal');
  const modal = document.querySelector('.modal');

  function closeModal () {
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
  };

  modalTriggers.forEach((item) => {
    item.addEventListener('click', openModal)
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal__close')) {
      closeModal()
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal()
    }
  });

  const modalTimerId = setTimeout(openModal, '10000000');

  // document.documentElement.scrollHeight - это полная высота всего контента страницы
  // document.documentElement.clientHeight - то, сколько мы видем на экране
  // window.scrollY - то, сколько мы уже пролистами из общей длины документа

  function showModalByScroll () {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal()
      window.removeEventListener('scroll', showModalByScroll);
    }  
  }

  window.addEventListener('scroll', showModalByScroll);

  // Использование классов для создания карточек (аналог функции конструктора)

  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return res.json();
  }

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

  getResource('http://localhost:3000/menu')
    .then(data => {
      for (let {img, altimg, title, descr, price} of data) {
        if (altimg === 'elite') {
          new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item', 'any-new-class').render(); // Просто для примера if
        } else {
          new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
        }
      };
    })

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
    failure: 'Что-то пошло не так...',
  }

  forms.forEach((form) => {
    bindPostData(form);
  })

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

      postData('http://localhost:3000/requests', json)
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
    openModal();

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
      closeModal();
    }, 4000)
  };

  fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res))


});