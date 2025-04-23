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

    // Carousel functionality with swipe support
    function initializeCarousel(carousel) {
        const images = carousel.querySelectorAll('img, .website-preview');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let currentIndex = 0;
        let startX, startY, endX, endY;
        let isSwiping = false;

        function showSlide(index) {
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
            
            // Prevent vertical scrolling when swiping horizontally
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
            
            // Only handle horizontal swipes
            if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
                if (deltaX > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
            }
            
            isSwiping = false;
        }, { passive: true });

        // Button controls
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

        // Initialize first slide
        showSlide(0);
    }

    // Initialize all carousels
    document.querySelectorAll('.carousel').forEach(initializeCarousel);

    // Modal functionality
    function openModal(serviceType) {
        console.log("Открывается модал для:", serviceType);
        
        const modalId = `${serviceType}Modal`;
        const modal = document.getElementById(modalId);
        
        if (!modal) {
            console.error(`Не найден модал для serviceType: ${serviceType}, искомый ID: ${modalId}`);
            return;
        }

        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.classList.add('modal-open');
            } else {
                console.error(`Не найден .modal-content внутри модала ${modalId}`);
            }
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        if (!modal) return;
        
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.classList.remove('modal-open');
            modalContent.classList.add('modal-close');
        }
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
            if (modalContent) {
                modalContent.classList.remove('modal-close');
            }
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Add click handlers to all service blocks
    document.querySelectorAll('.service-block').forEach(block => {
        const serviceType = block.getAttribute('data-service');
        console.log("Найден блок услуги:", serviceType);
        
        const btn = block.querySelector('.view-examples-btn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const serviceType = block.getAttribute('data-service');
                console.log("Клик по кнопке для услуги:", serviceType);
                openModal(serviceType);
            });
        } else {
            console.error(`Не найдена кнопка .view-examples-btn в блоке ${serviceType}`);
        }
    });

    // Add close functionality to all modals
    ['digital', 'video', 'website'].forEach(serviceType => {
        const modalId = `${serviceType}Modal`;
        const modal = document.getElementById(modalId);
        
        if (!modal) {
            console.error(`Не найден модал с ID: ${modalId}`);
            return;
        }

        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                console.log(`Закрытие модала: ${modalId}`);
                closeModal(modal);
            });
        } else {
            console.error(`Не найдена кнопка закрытия в модале ${modalId}`);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            ['digital', 'video', 'website'].forEach(serviceType => {
                const modal = document.getElementById(`${serviceType}Modal`);
                if (modal && modal.style.display === 'flex') {
                    closeModal(modal);
                }
            });
        }
    });
});