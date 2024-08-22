import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

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
    openModal('.modal', modalTimerId);

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
      closeModal('.modal');
    }, 4000)
  };

};

export default forms;