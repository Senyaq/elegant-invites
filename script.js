document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Обработка отправки формы
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Здесь будет логика отправки формы
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            contactForm.reset();
        });
    }

    // Обработка нажатий на карточки галереи
    const galleryItems = document.querySelectorAll('.gallery-item');
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Сначала убираем active у других карточек
                document.querySelectorAll('.gallery-item.active').forEach(el => {
                    if (el !== item) el.classList.remove('active');
                });

                // Переключаем active на выбранной карточке
                item.classList.toggle('active');
            });
        });
    }
});