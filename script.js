document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализация скриптов...');
    
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

    // Carousel functionality with swipe support
    function initializeCarousel(carousel) {
        console.log('Инициализация карусели...');
        const images = carousel.querySelectorAll('img, .website-preview');
        console.log(`Найдено изображений в карусели: ${images.length}`);
        
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let currentIndex = 0;
        let startX, startY, endX, endY;
        let isSwiping = false;

        function showSlide(index) {
            console.log(`Показ слайда ${index + 1} из ${images.length}`);
            images.forEach((img, i) => {
                img.style.display = i === index ? 'block' : 'none';
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % images.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showSlide(currentIndex);
        }

        // Touch events for swipe
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwiping = true;
        }, { passive: true });

        carousel.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            
            endX = e.touches[0].clientX;
            endY = e.touches[0].clientY;
            
            const deltaX = Math.abs(endX - startX);
            const deltaY = Math.abs(endY - startY);
            
            if (deltaX > deltaY && deltaX > 10) {
                e.preventDefault();
            }
        }, { passive: false });

        carousel.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = Math.abs(endY - startY);
            
            if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
                if (deltaX > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
            }
            
            isSwiping = false;
        }, { passive: true });

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                prevSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                nextSlide();
            });
        }

        showSlide(0);
    }

    // Initialize all carousels
    const carousels = document.querySelectorAll('.carousel');
    console.log(`Найдено каруселей: ${carousels.length}`);
    carousels.forEach(initializeCarousel);

    // Modal functionality
    function openModal(serviceType) {
        console.log(`Открытие модального окна для: ${serviceType}`);
        
        const modalId = `${serviceType}Modal`;
        const modal = document.getElementById(modalId);
        
        if (!modal) {
            console.error(`Модальное окно не найдено: ${modalId}`);
            return;
        }

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Initialize carousel if exists
        const carousel = modal.querySelector('.carousel');
        if (carousel) {
            const images = carousel.querySelectorAll('img');
            images.forEach((img, i) => {
                img.style.display = i === 0 ? 'block' : 'none';
            });
        }
    }

    function closeModal(modal) {
        if (!modal) return;
        
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Add click handlers to all service blocks
    const serviceBlocks = document.querySelectorAll('.service-block');
    console.log(`Найдено блоков услуг: ${serviceBlocks.length}`);
    
    serviceBlocks.forEach(block => {
        const serviceType = block.getAttribute('data-service');
        const btn = block.querySelector('.view-examples-btn');
        
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openModal(serviceType);
            });
        }
    });

    // Add close functionality to all modals
    document.querySelectorAll('.modal').forEach(modal => {
        // Close on X button click
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }

        // Close on click outside modal content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.style.display === 'flex') {
                    closeModal(modal);
                }
            });
        }
    });

    // Carousel functionality
    document.querySelectorAll('.carousel').forEach(carousel => {
        let currentIndex = 0;
        const items = carousel.querySelectorAll('img, .website-preview');
        const total = items.length;

        if (total <= 1) return;

        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');

        function showSlide(index) {
            items.forEach((item, i) => {
                item.style.display = i === index ? 'block' : 'none';
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + total) % total;
                showSlide(currentIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % total;
                showSlide(currentIndex);
            });
        }

        // Initialize first slide
        showSlide(0);
    });
});