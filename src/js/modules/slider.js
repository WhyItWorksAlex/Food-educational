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

export default slider;