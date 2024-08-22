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

export default timer;