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

export default tabs;