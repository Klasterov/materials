$('.content_toggle').click(function(){
  $('.content_block_hidden').slideToggle(300, function(){
    if ($(this).is(':hidden')) {
      $('.content_toggle').html('Читать дальше');
      $('.content_toggle').removeClass('open');
    } else {
      $('.content_toggle').html('Скрыть текст');
      $('.content_toggle').addClass('open');
    }
  });
  return false;
});

// ----------------------------------------------------
// Оборачиваем таблицы в блоке content
// ----------------------------------------------------
$('.content table').wrap('<div class="table"><div class="table__body"></div></div>');
// END ------------------------

if($('#product_table')){
	$('#product_table').find('.table__body').append('<button class="button button--micro button--second button_char" type="button" aria-label="Оформить заявку" data-modal-open="#order-modal" style="margin-top:0;height:100%">Заказать</button>');

	if (document.querySelector('#product_table .table__body')) document.querySelector('#product_table .table__body').style.display = 'flex';

	$('.button_char').click(function () {
		document.querySelector('#order-product').value = $('.card__header-title').text() + ' - ' + window.location.href;
		$('.modal__subtitle').text($('.card__header-title').text());
	});

  let firstRow = $('#product_table .table__body tr:first');
  let hasPriceCol = false;
  
  firstRow.find('td, th').each(function() {
      let txt = $(this).text().toLowerCase().replace(/[\s.,]/g, '');
      if (txt.includes('цена')) {
          hasPriceCol = true;
      }
  });

  if (!hasPriceCol) {
    // Копируем последний элемент заголовка и меняем текст на "Цена"
    let headRow = $('#product_table .table__head tr:first');
    let lastHead = headRow.find('th:last').clone();
    lastHead.text('Цена');
    headRow.append(lastHead);

    $('#product_table .table__body tr').each(function(index) {
      let $row = $(this);
      let lastTd = $row.find('td:last').clone();
      lastTd.text(index === 0 ? 'Цена' : 'По запросу'); // первый ряд оставляем как заголовок для визуального отображения, остальные строки — "По запросу"
      $row.append(lastTd);
    });
  }
}


// ----------------------------------------------------
// Настраиваем lazyload
// ----------------------------------------------------
const lazyLoad = function (selector, attr = 'src', width_point = 575) {
  const lazy_elements = document.querySelectorAll(selector);
  if (typeof IntersectionObserver === 'function') {
    const io = new IntersectionObserver(function (entries) {
      for (let index = 0; index < entries.length; index++) {
        const entry = entries[index];
        if (entry.isIntersecting) {
          const elem = entry.target;
          const value_default = elem.getAttribute('data-' + attr);
          const value_mobile = elem.getAttribute('data-' + attr + '-sm');
          const value_desktop = elem.getAttribute('data-' + attr + '-xl');
          if (window.outerWidth < width_point) {
            if (value_mobile) {
              elem.setAttribute(attr, value_mobile);
            } else {
              if (value_default) {
                elem.setAttribute(attr, value_default);
              }
            }
          } else {
            if (value_desktop) {
              elem.setAttribute(attr, value_desktop);
            } else {
              if (value_default) {
                elem.setAttribute(attr, value_default);
              }
            }
          }
          io.unobserve(elem);
        }
      }
    }, {});

    lazy_elements.forEach(function (elem) {
      io.observe(elem);
    });
  } else {
    for (let index = 0; index < lazy_elements.length; index++) {
      const elem = lazy_elements[index];
      const value_default = elem.getAttribute('data-' + attr);
      const value_mobile = elem.getAttribute('data-' + attr + '-sm');
      const value_desktop = elem.getAttribute('data-' + attr + '-xl');
      let value;
      if (value_mobile) {
        value = value_mobile;
      }
      if (value_desktop) {
        value = value_desktop;
      }
      if (value_default) {
        value = value_default;
      }
      elem.setAttribute(attr, value);
    }
  }
};
lazyLoad('.lazy-image');
lazyLoad('.lazy-back', 'style');
// END ------------------------

// ----------------------------------------------------
// Реализация блока lightgallery
// ----------------------------------------------------
const LIGHTGALLERIES = document.querySelectorAll('.lightgallery');
if (LIGHTGALLERIES) {
  for (let index = 0; index < LIGHTGALLERIES.length; index++) {
    const LIGHTGALLERY = LIGHTGALLERIES[index];
    lightGallery(LIGHTGALLERY, {
      thumbnail: true,
    });
  }
}
// END ------------------------

// ----------------------------------------------------
// Реализация блока mobile-left
// ----------------------------------------------------
if (document.querySelector('.mobile-left')) {
  let mobile_left__OPEN = document.querySelector('.mobile-left__open'); // кнопка открытия
  let mobile_left__OPEN_CLASS = 'mobile-left__open--pushed'; // класс активной кнопки
  let mobile_left__CLOSE = document.querySelector('.mobile-left__close'); // кнопка закрытия
  let mobile_left__CLOSE_CLASS = 'mobile-left__close--visible'; // класс активной кнопки
  let mobile_left__BODY = document.querySelector('.mobile-left__body'); // раскрывающееся меню
  let mobile_left__BODY_CLASS = 'mobile-left__body--opened'; // класс раскрытого меню
  let mobile_left__NOSCROLL = document.querySelector('.template'); // элемент для отключения скролла
  let mobile_left__NOSCROLL_CLASS = 'template--noscroll'; // класс отключения скролла

  mobile_left__OPEN.addEventListener('click', function (e) {
    e.preventDefault();
    mobile_left__OPEN.classList.add(mobile_left__OPEN_CLASS); // активируем класс нажатия текущей кнопки
    mobile_left__CLOSE.classList.add(mobile_left__CLOSE_CLASS); // активируем кнопку
    mobile_left__BODY.classList.add(mobile_left__BODY_CLASS); // переключаем класс
    mobile_left__NOSCROLL.classList.add(mobile_left__NOSCROLL_CLASS); // отключаем скролл у элемента-цели
  });

  mobile_left__CLOSE.addEventListener('click', function (e) {
    e.preventDefault();
    mobile_left__OPEN.classList.remove(mobile_left__OPEN_CLASS); // активируем класс нажатия текущей кнопки
    mobile_left__CLOSE.classList.remove(mobile_left__CLOSE_CLASS); // активируем кнопку
    mobile_left__BODY.classList.remove(mobile_left__BODY_CLASS); // переключаем класс
    mobile_left__NOSCROLL.classList.remove(mobile_left__NOSCROLL_CLASS); // возвращаем скролл элементу-цели
  });
}
// END ------------------------

// ----------------------------------------------------
// Реализация блока mobile-menu
// ----------------------------------------------------
if (document.querySelector('.mobile-menu')) {
  let mobile_menu__OPEN = document.querySelector('.open-mobile-menu'); // кнопка открытия
  let mobile_menu__OPEN_CLASS = 'open-mobile-menu--pushed'; // класс активной кнопки
  let mobile_menu__CLOSE = document.querySelector('.mobile-menu__close'); // кнопка закрытия
  let mobile_menu__CLOSE_CLASS = 'mobile-menu__close--visible'; // класс активной кнопки
  let mobile_menu__BODY = document.querySelector('.mobile-menu__body'); // раскрывающееся меню
  let mobile_menu__BODY_CLASS = 'mobile-menu__body--opened'; // класс раскрытого меню
  let mobile_menu__NOSCROLL = document.querySelector('.template'); // элемент для отключения скролла
  let mobile_menu__NOSCROLL_CLASS = 'template--noscroll'; // класс отключения скролла

  mobile_menu__OPEN.addEventListener('click', function (e) {
    e.preventDefault();
    mobile_menu__OPEN.classList.add(mobile_menu__OPEN_CLASS); // активируем класс нажатия текущей кнопки
    mobile_menu__CLOSE.classList.add(mobile_menu__CLOSE_CLASS); // активируем кнопку
    mobile_menu__BODY.classList.add(mobile_menu__BODY_CLASS); // переключаем класс
    mobile_menu__NOSCROLL.classList.add(mobile_menu__NOSCROLL_CLASS); // отключаем скролл у элемента-цели
  });

  mobile_menu__CLOSE.addEventListener('click', function (e) {
    e.preventDefault();
    mobile_menu__OPEN.classList.remove(mobile_menu__OPEN_CLASS); // активируем класс нажатия текущей кнопки
    mobile_menu__CLOSE.classList.remove(mobile_menu__CLOSE_CLASS); // активируем кнопку
    mobile_menu__BODY.classList.remove(mobile_menu__BODY_CLASS); // переключаем класс
    mobile_menu__NOSCROLL.classList.remove(mobile_menu__NOSCROLL_CLASS); // возвращаем скролл элементу-цели
  });
}
// END ------------------------

// ----------------------------------------------------
// Реализация блока modal
// ----------------------------------------------------
if (document.querySelector('.modal')) {
  let modal__OPENS = document.querySelectorAll('[data-modal-open]'); // кнопки открытия модалек
  let modal__CLOSES = document.querySelectorAll('[data-modal-close]'); // кнопки закрытия модалек
  let modal__OPEN_CLASS = 'modal--opened'; // класс активации модалек
  let modal__NOSCROLL = document.querySelector('.template'); // элемент для отключения скролла
  let modal__NOSCROLL_CLASS = 'template--noscroll'; // класс отключения скролла
  let modal__CLOSE_TARGET; // элемент-цель — будет вставляться текущая открытая модалька
  let modal__WINDOW_SCROLL; // ширина скролл-бара — будет вставляться при открывании модпльки

  for (let index = 0; index < modal__OPENS.length; index++) {
    let modal__OPEN = modal__OPENS[index]; // кнопка открытия
    let modal__OPEN_TARGET = document.querySelector(modal__OPEN.getAttribute('data-modal-open')); // элемент-цель

    modal__OPEN.addEventListener('click', function (e) {
      e.preventDefault();
      modal__WINDOW_SCROLL =
        String(window.innerWidth - document.documentElement.clientWidth) + 'px';
      modal__NOSCROLL.classList.add(modal__NOSCROLL_CLASS); // отключаем скролл у элемента-цели
      modal__NOSCROLL.style.paddingRight = modal__WINDOW_SCROLL;
      modal__OPEN_TARGET.classList.add(modal__OPEN_CLASS); // открываем элемент-цель
      modal__CLOSE_TARGET = modal__OPEN_TARGET;
    });
  }

  for (let index = 0; index < modal__CLOSES.length; index++) {
    let modal__CLOSE = modal__CLOSES[index]; // кнопка закрытия

    modal__CLOSE.addEventListener('click', function (e) {
      e.preventDefault();
      modal__CLOSE_TARGET.classList.remove(modal__OPEN_CLASS); // закрываем элемент-цель
      modal__NOSCROLL.classList.remove(modal__NOSCROLL_CLASS); // возвращаем скролл элементу-цели
      modal__NOSCROLL.style.paddingRight = '';
    });
  }
}
// END ------------------------

// ----------------------------------------------------
// Реализация блока nav-mobile
// ----------------------------------------------------
if (document.querySelector('.nav-mobile')) {
  let nav_mobile__LINKS = document.querySelectorAll('.nav-mobile__link--button');

  for (let index = 0; index < nav_mobile__LINKS.length; index++) {
    const nav_mobile__LINK = nav_mobile__LINKS[index];
    let nav_mobile__LINK_PUSHED = 'nav-mobile__link--pushed';
    let nav_mobile__TARGET = nav_mobile__LINK.nextElementSibling;
    let nav_mobile__TARGET_OPENED = 'nav-mobile__inner--opened';

    nav_mobile__LINK.addEventListener('click', function () {
      nav_mobile__LINK.classList.toggle(nav_mobile__LINK_PUSHED);
      nav_mobile__TARGET.classList.toggle(nav_mobile__TARGET_OPENED);
    });
  }
}
// END ------------------------

// ----------------------------------------------------
// Включаем отрисовку иконок Feather
// ----------------------------------------------------
feather.replace();
// END ------------------------

// ====================================================
// Реализация блока nav-left
// ====================================================
if (document.querySelector('.nav-left')) {
  const nav_left__TOGGLES = document.querySelectorAll('[data-left-toggle]');

  for (let index = 0; index < nav_left__TOGGLES.length; index++) {
    const nav_left__TOGGLE = nav_left__TOGGLES[index];
    const nav_left__INNER_ID = nav_left__TOGGLE.dataset.leftToggle;
    const nav_left__LEVEL = nav_left__TOGGLE.dataset.leftLevel;
    const nav_left__ACTIVE = nav_left__TOGGLE.classList.contains('active');

    nav_left__TOGGLE.addEventListener('click', function () {
      $(nav_left__INNER_ID).slideToggle();
      nav_left__TOGGLE.classList.toggle('pushed');

      const pushed__LEVELS = document.querySelectorAll(
        '[data-left-level="' + nav_left__LEVEL + '"].pushed'
      );
      for (let index = 0; index < pushed__LEVELS.length; index++) {
        const pushed__LEVEL = pushed__LEVELS[index];
        if (pushed__LEVEL !== nav_left__TOGGLE) {
          $(pushed__LEVEL.dataset.leftToggle).slideUp();
          pushed__LEVEL.classList.remove('pushed');
        }
      }
    });

    if (nav_left__ACTIVE) {
      $(nav_left__INNER_ID).show();
      nav_left__TOGGLE.classList.add('pushed');
    }
  }
}
// END ------------------------

// ----------------------------------------------------
// Реализация блока search
// ----------------------------------------------------
if (document.querySelector('[data-search-open]')) {
  let search__OPEN = document.querySelector('[data-search-open]'); // кнопка открытия
  let search__BODY = document.querySelector('[data-search]'); // раскрывающееся меню

  search__OPEN.addEventListener('click', function (e) {
    search__OPEN.classList.toggle('pushed');
    search__BODY.classList.toggle('opened');
  });

  document.addEventListener('click', function (e) {
    if (
      e.target !== search__OPEN &&
      !search__BODY.contains(e.target) &&
      search__BODY.classList.contains('opened')
    ) {
      search__OPEN.classList.remove('pushed');
      search__BODY.classList.remove('opened');
    }
  });
}
// END ------------------------

// ====================================================
// Реализация блока yandex-map
// ====================================================

// функция создания контента в баллунах
const getBaloonContent = function (pin) {
  return (
    '<div class="yandex-map__baloon"><div class="yandex-map__baloon-title">' +
    pin['title'] +
    '</div>' +
    '<div class="yandex-map__baloon-address">' +
    pin['address'] +
    '</div>' +
    '</div>'
  );
};

const addMap = function (map_params) {
  ymaps.ready(function () {
    const map = new ymaps.Map(map_params['id'], {
      // находим блок, в котором создадим карту
      center: map_params['mapCenter'], // координаты центральной точки на карте
      zoom: map_params['mapZoom'], // увеличение карты
      controls: [],
    });

    map_params['mapPins'].forEach(function (pin) {
      const placemark = new ymaps.Placemark(
        pin['coordinates'],
        {
          // Создаем метку
          hintContent: pin['title'], // подсказка при наведении на метку
          balloonContent: getBaloonContent(pin), // контент баллуна
        },
        {
          iconColor: pin['color'], // цвет метки
        }
      );

      map.geoObjects.add(placemark); // Добавляем метку на карту
    });
  });
};
// END ------------------------

// ====================================================
// Реализация блока yandex-map
// ====================================================
$('.card__ancor').click(function (e) {
  e.preventDefault();
  const target = $(this).attr('href');
  $('body, html').animate({ scrollTop: $(target).offset().top - 32 }, 600);
});
// END ------------------------


//START ANCOR LINKS
// add atribute scroll-link, value add offset. And standart #ancor href
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[scroll-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const offset = parseInt(link.getAttribute('scroll-link') || '0', 10);
      const targetSelector = link.getAttribute('href');
      const target = document.querySelector(targetSelector);
      if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
//END

//START перенос строк списков относительно картинок
// $(document).ready(function() {
//   let globalArr = [];
//   let tolerance = 16;

//   function getRealLeft(el) {
//       let textNode = null;

//       for (let node of el[0].childNodes) {
//           if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
//               textNode = node;
//               break;
//           } else if (node.nodeType === Node.ELEMENT_NODE && $(node).text().trim().length > 0) {
//               textNode = node;
//               break;
//           }
//       }

//       if (textNode) {
//           if (textNode.nodeType === Node.TEXT_NODE) {
//               let range = document.createRange();
//               range.selectNodeContents(textNode);
//               let rect = range.getBoundingClientRect();
//               return rect.left;
//           } else {
//               return textNode.getBoundingClientRect().left;
//           }
//       } else {
//           return el.get(0).getBoundingClientRect().left;
//       }
//   }

//   function isSingleLine(el) {
//       let h = el.outerHeight();
//       let lh = parseFloat(el.css('line-height'));
//       if (isNaN(lh) || lh <= 0) lh = h;
//       return h <= (lh + 2);
//   }

//   $('#product_content .content ul').each(function() {
//       let ul = $(this);
//       let subArr = [];

//       let prev = ul.prev();
//       if (prev.length && prev.prop("tagName").toLowerCase() !== "ul" && prev.find('img').length === 0) {
//           if (isSingleLine(prev)) {
//               subArr.push(prev);
//           }
//       }

//       ul.find('li').each(function() {
//           subArr.push($(this));
//       });

//       if (subArr.length) globalArr.push(subArr);
//   });

//   // запускаем проверку с задержкой (даём браузеру применить стили)
//   setTimeout(function() {
//       globalArr.forEach(function(subArr) {
//           if (subArr.length < 2) return;

//           let baseLeft = getRealLeft(subArr[0]);
//           let needClear = false;

//           for (let i = 1; i < subArr.length; i++) {
//               let left = getRealLeft(subArr[i]);
//               if (Math.abs(left - baseLeft) > tolerance) {
//                   needClear = true;
//                   break;
//               }
//           }

//           if (needClear) {
//               subArr[0].css('clear', 'both');
//           }
//       });
//   }, 50); // задержка в 50мс
// });

//END
//START FAQ TOGGLE
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('#faq [button]');

  buttons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();

      const li = button.closest('.nav-left__point');
      const submenu = li.querySelector('[submenu]');
      const isActive = li.hasAttribute('active');

      // Закрываем все открытые
      document.querySelectorAll('#faq .nav-left__point[active]').forEach(openLi => {
        openLi.removeAttribute('active');
        const openSub = openLi.querySelector('[submenu]');
        openSub.style.maxHeight = null;
      });

      // Открываем текущий, если он был закрыт
      if (!isActive) {
        li.setAttribute('active', '');
        submenu.style.maxHeight = submenu.scrollHeight + 'px';
      }
    });
  });
});
//END FAQ TOGGLE
