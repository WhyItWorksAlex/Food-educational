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
export {closeModal, openModal};
export default modal;