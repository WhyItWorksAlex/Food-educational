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

export default cards;