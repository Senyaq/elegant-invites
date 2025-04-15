document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 2000; // 2 секунды
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Функция плавности (easeInOutQuad)
                    const ease = progress => {
                        return progress < 0.5
                            ? 2 * progress * progress
                            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                    };

                    window.scrollTo(0, startPosition + (distance * ease(progress)));

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }

                requestAnimationFrame(animation);
            }
        });
    });

    // Анимация текста
    const phrases = [
        "Красивое начало вашей истории — с первого взгляда",
        "Ваша история начинается красиво",
        "Приглашение, в которое влюбляются",
        "Первое слово вашей свадьбы — digital"
    ];
    
    const animatedText = document.querySelector('.animated-text');
    let currentIndex = 0;
    
    function changeText() {
        // Начинаем плавное исчезновение
        animatedText.classList.add('fade-out');
        animatedText.classList.remove('fade-in');
        
        // Ждем полного исчезновения текста
        setTimeout(() => {
            // Меняем текст когда он полностью исчез
            currentIndex = (currentIndex + 1) % phrases.length;
            animatedText.textContent = phrases[currentIndex];
            
            // Делаем паузу перед появлением нового текста
            setTimeout(() => {
                // Запускаем появление нового текста
                animatedText.classList.remove('fade-out');
                animatedText.classList.add('fade-in');
            }, 500); // Пауза 500мс перед появлением
        }, 1200); // Ждем завершения fade-out
    }
    
    // Запускаем смену текста каждые 5 секунд (учитывая длительность анимаций)
    setInterval(changeText, 5000);

    // Обработка отправки формы
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Собираем данные формы
            const formData = new FormData(contactForm);
            
            // Отправляем данные на сервер
            fetch('process_form.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const formMessage = document.getElementById('formMessage');
                    formMessage.textContent = data.message;
                    formMessage.style.color = 'green';
                    contactForm.reset();
                } else {
                    const formMessage = document.getElementById('formMessage');
                    formMessage.textContent = data.message;
                    formMessage.style.color = 'red';
                }
            })
            .catch(error => {
                const formMessage = document.getElementById('formMessage');
                formMessage.textContent = 'Произошла ошибка при отправке формы.';
                formMessage.style.color = 'red';
            });
        });
    }
});