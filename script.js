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