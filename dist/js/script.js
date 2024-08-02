/******/ (() => { // webpackBootstrap
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
window.addEventListener('DOMContentLoaded', () => {
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
  tabsParent.addEventListener('change', event => {
    console.log(event.target.offsetHeight);
  });
});
/******/ })()
;
//# sourceMappingURL=script.js.map