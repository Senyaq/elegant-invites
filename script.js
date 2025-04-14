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

    // Анимация текста
    const phrases = [
        'Красивое начало вашей истории — с первого взгляда',
        'Ваша история начинается красиво',
        'Приглашение, в которое влюбляются',
        'Первое слово вашей свадьбы — digital'
    ];

    const animatedTextContainer = document.querySelector('.animated-text-container');
    let currentIndex = 0;

    function updateText() {
        const currentText = animatedTextContainer.querySelector('.animated-text');
        currentText.classList.remove('fade-in');
        currentText.classList.add('fade-out');

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % phrases.length;
            currentText.textContent = phrases[currentIndex];
            currentText.classList.remove('fade-out');
            currentText.classList.add('fade-in');
        }, 1000);
    }

    // Запускаем смену текста каждые 4 секунды
    setInterval(updateText, 4000);

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