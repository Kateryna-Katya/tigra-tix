document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // 1. Изменение хедера
    const header = document.querySelector('#header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('header--scrolled', window.scrollY > 50);
    });

    // 2. Intersection Observer для запуска анимаций (Vanilla Animation Engine)
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Обернем каждое слово в заголовке в span для эффекта появления (по желанию)
    // В данном случае мы используем структуру .reveal-text из HTML

    document.querySelectorAll('.hero, section').forEach(section => {
        observer.observe(section);
    });

    // 3. Эффект движения мыши за фоновыми фигурами (Parallax)
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const moveX = (x - 0.5) * speed;
            const moveY = (y - 0.5) * speed;
            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    // Обработка эффекта прожектора для карточек преимуществ
const cards = document.querySelectorAll('.adv-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
    // Переключение инноваций
const innoItems = document.querySelectorAll('.inno-item');
const innoViews = document.querySelectorAll('.inno-view');

innoItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Убираем активный класс у всех
        innoItems.forEach(i => i.classList.remove('active'));
        innoViews.forEach(v => v.classList.remove('active'));

        // Добавляем текущему
        item.classList.add('active');
        const targetId = item.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});
    // 1. Генерация капчи
let captchaResult;

function generateCaptcha() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    captchaResult = a + b;
    document.getElementById('captcha-task').textContent = `${a} + ${b}`;
}

// 2. Валидация телефона (только цифры)
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\d+]/g, '');
});

// 3. Обработка формы
const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('successMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userCaptcha = parseInt(document.getElementById('captcha-input').value);

    if (userCaptcha !== captchaResult) {
        alert('Неверный ответ в проверочном примере!');
        generateCaptcha();
        return;
    }

    // Имитация AJAX-запроса
    const btn = document.getElementById('submitBtn');
    btn.innerHTML = 'Отправка...';
    btn.disabled = true;

    setTimeout(() => {
        contactForm.style.display = 'none';
        successMsg.style.display = 'block';
        window.scrollTo({
            top: document.getElementById('contact').offsetTop,
            behavior: 'smooth'
        });
    }, 1500);
});

function resetForm() {
    contactForm.reset();
    contactForm.style.display = 'block';
    successMsg.style.display = 'none';
    const btn = document.getElementById('submitBtn');
    btn.innerHTML = '<span>Запросить доступ</span><i data-lucide="send"></i>';
    btn.disabled = false;
    generateCaptcha();
    lucide.createIcons(); // Обновляем иконки
}

// Запуск капчи при загрузке
    generateCaptcha();
    // 1. Логика мобильного меню
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const body = document.body;

burger.addEventListener('click', () => {
    burger.classList.toggle('burger--active');
    mobileMenu.classList.toggle('mobile-menu--active');
    body.style.overflow = mobileMenu.classList.contains('mobile-menu--active') ? 'hidden' : 'auto';
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.mobile-nav__link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('burger--active');
        mobileMenu.classList.remove('mobile-menu--active');
        body.style.overflow = 'auto';
    });
});

// 2. Логика Cookie Popup
const cookiePopup = document.getElementById('cookiePopup');
const acceptBtn = document.getElementById('acceptCookies');

window.addEventListener('load', () => {
    if (!localStorage.getItem('tigra_cookies_accepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('cookie-popup--show');
        }, 2000);
    }
});

acceptBtn.addEventListener('click', () => {
    localStorage.setItem('tigra_cookies_accepted', 'true');
    cookiePopup.classList.remove('cookie-popup--show');
});
});