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

export default calc;