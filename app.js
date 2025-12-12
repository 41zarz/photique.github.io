// Слайдер с автоматическим перелистыванием
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slides = Array.from(slider.querySelectorAll('img'));
const slideCount = slides.length;
const goTopBtn = document.querySelector(".go-top");
let slideIndex = 0;
let autoSlideInterval;
let isAutoSlideEnabled = true;

goTopBtn.addEventListener('click', goTop);

function goTop() {
    if (window.pageYOffset > 0) {
        window.scrollBy(0, -75);
        setTimeout(goTop, 0);
    }
}

// Инициализация слайдера
function initSlider() {
    updateSlider();
    
    // Запуск автоматического перелистывания (каждые 5 секунд)
    if (isAutoSlideEnabled) {
        startAutoSlide();
    }
}

// Показать предыдущий слайд
function showPreviousSlide() {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    updateSlider();
    resetAutoSlide();
}

// Показать следующий слайд
function showNextSlide() {
    slideIndex = (slideIndex + 1) % slideCount;
    updateSlider();
    resetAutoSlide();
}

// Обновление отображения слайдера
function updateSlider() {
    slides.forEach((slide, index) => {
        if (index === slideIndex) {
            slide.classList.add('active');
            slide.style.display = 'block';
        } else {
            slide.classList.remove('active');
            slide.style.display = 'none';
        }
    });
}

// Автоматическое перелистывание
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        showNextSlide();
    }, 5000); // 5 секунд
}

// Остановить автопрокрутку
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Сбросить таймер автопрокрутки
function resetAutoSlide() {
    if (isAutoSlideEnabled) {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
}

// Переключение автопрокрутки
function toggleAutoSlide() {
    const toggleBtn = document.getElementById('toggleAutoSlide');
    isAutoSlideEnabled = !isAutoSlideEnabled;
    
    if (isAutoSlideEnabled) {
        toggleBtn.textContent = 'ВКЛ';
        toggleBtn.classList.add('active');
        startAutoSlide();
    } else {
        toggleBtn.textContent = 'ВЫКЛ';
        toggleBtn.classList.remove('active');
        stopAutoSlide();
    }
}

// Обработчики событий для кнопок слайдера
prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

// Кнопка переключения автопрокрутки
document.getElementById('toggleAutoSlide').addEventListener('click', toggleAutoSlide);

// Пауза автопрокрутки при наведении на слайдер
slider.addEventListener('mouseenter', () => {
    if (isAutoSlideEnabled) {
        stopAutoSlide();
    }
});

slider.addEventListener('mouseleave', () => {
    if (isAutoSlideEnabled) {
        startAutoSlide();
    }
});

// Фильтрация галереи
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.column');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Капча
function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 4; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

function refreshCaptcha() {
    const captchaCode = generateCaptcha();
    document.getElementById('captchaCode').textContent = captchaCode;
    document.getElementById('captchaInput').value = '';
    document.getElementById('captchaError').textContent = '';
}

function validateCaptcha() {
    const enteredCode = document.getElementById('captchaInput').value;
    const actualCode = document.getElementById('captchaCode').textContent;
    
    if (enteredCode.toUpperCase() !== actualCode.toUpperCase()) {
        document.getElementById('captchaError').textContent = 'Неверный код проверки';
        return false;
    }
    document.getElementById('captchaError').textContent = '';
    return true;
}

// Открытие полноэкранного изображения
function openFullscreenImage(element) {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    const fullscreenImage = document.getElementById('fullscreen-image');

    fullscreenImage.src = element.src;
    fullscreenImage.alt = element.alt;
    fullscreenContainer.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Пауза автопрокрутки слайдера при открытии изображения
    if (isAutoSlideEnabled) {
        stopAutoSlide();
    }
}

function closeFullscreenImage() {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    fullscreenContainer.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Возобновление автопрокрутки слайдера
    if (isAutoSlideEnabled) {
        startAutoSlide();
    }
}


// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}



// Валидация формы
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация капчи
            if (!validateCaptcha()) {
                return;
            }
            
            // Валидация телефона
            const phoneInput = contactForm.querySelector('input[name="phone"]');
            const phonePattern = /[\+]\d{1}\s[\(]\d{3}[\)]\s\d{3}[\-]\d{2}[\-]\d{2}/;
            
            if (!phonePattern.test(phoneInput.value)) {
                alert('Пожалуйста, введите телефон в формате: +7 (999) 999-99-99');
                phoneInput.focus();
                return;
            }
            
            // Если валидация пройдена, можно отправить форму
            alert('Спасибо! Ваша заявка принята. Я свяжусь с вами в течение 24 часов.');
            
            // Обновление капчи
            refreshCaptcha();
            
            // Очистка формы
            contactForm.reset();
        });
    }
}

// Инициализация всего при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    initGalleryFilters();
    initSmoothScroll();
    initScrollToTop();
    initFormValidation();
    refreshCaptcha(); // Генерация начальной капчи
});