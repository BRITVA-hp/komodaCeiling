document.addEventListener('DOMContentLoaded', () => {

    // Функция для бургера и меню
    function burgerMenu(burger, menu, menuActive, menuClose) {
        const burger_ = document.querySelector(burger),
              menu_ = document.querySelector(menu),
              menuClose_ = document.querySelector(menuClose);

        burger_.addEventListener('click', () => {
            menu_.classList.add(menuActive);
        });
        menuClose_.addEventListener('click', () => {
            menu_.classList.remove(menuActive);
        });
    }

    burgerMenu('.header__burger', '.header__menu', 'header__menu--active', '.header__menu__close');

    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [53.187893, 50.295667],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 17
        });

        myMap.geoObjects
        .add(new ymaps.Placemark([53.187893, 50.295667],  {
            preset: 'islands#icon',
            iconColor: '#0095b6'
        }));

        myMap.behaviors.disable('scrollZoom');
    }

    // слайдер в секции reviews

    function sliderReviews(window, field, prev, next, slide, width, counterSlides) {
        const window_ = document.querySelector(window),
              field_ = document.querySelector(field),
              prev_ = document.querySelector(prev),
              next_ = document.querySelector(next),
              slides = document.querySelectorAll(slide),
              counterSlides_ = document.querySelector(counterSlides),
              sliderMain = document.querySelectorAll('.slider__main');

        function mainSlider(count) {
            sliderMain.forEach((item, index) => {
                item.classList.remove('fadeIn');
                if (count == index) {
                    item.classList.add('fadeIn');
                }
            });
        }
        
        let counter = 0,
            touchStart,
            touchMove,
            touchEnd;

        const goNext = () => {
            counter++;
            if (counter >= slides.length) {
                counter = 0;
            }
            field_.style.transform = `translateX(-${width * counter}px)`;
            if (counterSlides) {
                counterSlides_.textContent = counter + 1;
            }

            mainSlider(counter);
        };

        const goPrev = () => {
            
            counter--;
            if (counter < 0) {
                counter = slides.length - 1;
            }
            field_.style.transform = `translateX(-${width * counter}px)`;
            if (counterSlides) {
                counterSlides_.textContent = counter + 1;
            }

            mainSlider(counter);
        };
        
        next_.addEventListener('click', () => {
            goNext();
        });

        prev_.addEventListener('click', () => {
            goPrev();
        });

        window_.addEventListener('touchstart', (e) => {
            
            touchStart = e.changedTouches[0].pageX;
        });

        window_.addEventListener('touchmove', (e) => {
            touchMove = e.changedTouches[0].pageX - touchStart;
            field_.style.transform = `translateX(${-(width * counter) + touchMove}px)`;
        });

        window_.addEventListener('touchend', (e) => {
            touchEnd = e.changedTouches[0].pageX;
            if (touchEnd < touchStart && Math.abs(touchStart - touchEnd) > 50) {
                goNext();
            }
            if (touchEnd > touchStart && Math.abs(touchStart - touchEnd) > 50) {
                goPrev();
            }
        });
    }

    sliderReviews('.reviews__window', '.reviews__field', '.reviews__arrow--prev', '.reviews__arrow--next', '.reviews__field .reviews__card', 320, '.reviews__counter span');
    sliderReviews('.slider__window--mobile', '.slider__field--mobile', '.slider__prev--mobile', '.slider__next--mobile', '.slider__card--mobile', 300);
    sliderReviews('.slider__window', '.slider__field', '.slider__prev', '.slider__next', '.slider__card', 365);


    // функция для модалки

    function calcScroll() {
        let div = document.createElement('div');
        
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        
        document.body.appendChild(div);
        let scarollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        
        return scarollWidth;
    }

    let scrollWidth = calcScroll();

    function modal(modal, modalActiveClass, modalClose, triggers) {
        const triggers_ = document.querySelectorAll(triggers),
                modal_ = document.querySelector(modal),
                modalClose_ = document.querySelector(modalClose);

        if (triggers_.length > 0) {
            triggers_.forEach(item => {
                item.addEventListener('click', () => {
                    modal_.classList.add(modalActiveClass);
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scrollWidth}px`;
                });
            });

            modalClose_.addEventListener('click', () => {
                modal_.classList.remove(modalActiveClass);
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
            });
    
            modal_.addEventListener('click', (e) => {
                if (e.target.classList.contains(modal.replace(/\./, ''))) {
                    modal_.classList.remove(modalActiveClass);
                    document.body.style.overflow = '';
                    document.body.style.marginRight = '0px';
                }
            });
        }
    }

    modal('.modal--main', 'modal--visible', '.modal__close--main', '[data-modal]');

    // Закрытие окна благодарности

    function closeSuccess(modal, modalClose, modalActiveClass) {
        const modal_ = document.querySelector(modal),
              modalClose_ = document.querySelector(modalClose);

        modalClose_.addEventListener('click', () => {
            modal_.classList.remove(modalActiveClass);
        });

        modal_.addEventListener('click', (e) => {
            if (e.target.classList.contains(modal.replace(/\./, ''))) {
                modal_.classList.remove(modalActiveClass);
            }
        });
    }

    closeSuccess('.modal--success', '.modal__close--success', 'modal--visible');

});