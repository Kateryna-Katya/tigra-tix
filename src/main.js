document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок Lucide (если библиотека подключена)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Хедер: Изменение при скролле (есть на всех страницах)
    const header = document.querySelector('#header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('header--scrolled', window.scrollY > 50);
        });
    }

    // 3. Анимации появления (Intersection Observer)
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hero, section, .reveal').forEach(el => {
        observer.observe(el);
    });

    // 4. Параллакс фигур (только если есть .shape)
    const shapes = document.querySelectorAll('.shape');
    if (shapes.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 20;
                const moveX = (x - 0.5) * speed;
                const moveY = (y - 0.5) * speed;
                shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }

    // 5. Эффект прожектора для карточек (только если есть .adv-card)
    const cards = document.querySelectorAll('.adv-card');
    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    // 6. Переключение инноваций (только если есть .inno-item)
    const innoItems = document.querySelectorAll('.inno-item');
    const innoViews = document.querySelectorAll('.inno-view');
    if (innoItems.length > 0) {
        innoItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                innoItems.forEach(i => i.classList.remove('active'));
                innoViews.forEach(v => v.classList.remove('active'));
                item.classList.add('active');
                const targetId = item.getAttribute('data-target');
                const targetEl = document.getElementById(targetId);
                if (targetEl) targetEl.classList.add('active');
            });
        });
    }

    // 7. Работа с формой, капчей и телефоном (только если есть #contactForm)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        let captchaResult;
        const captchaLabel = document.getElementById('captcha-task');
        const phoneInput = document.getElementById('phone');
        const successMsg = document.getElementById('successMessage');

        // Функция генерации капчи
        const generateCaptcha = () => {
            const a = Math.floor(Math.random() * 10) + 1;
            const b = Math.floor(Math.random() * 10) + 1;
            captchaResult = a + b;
            if (captchaLabel) captchaLabel.textContent = `${a} + ${b}`;
        };

        generateCaptcha();

        // Валидация телефона
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^\d+]/g, '');
            });
        }

        // Отправка формы
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const captchaInput = document.getElementById('captcha-input');
            const userCaptcha = parseInt(captchaInput ? captchaInput.value : 0);

            if (userCaptcha !== captchaResult) {
                alert('Неверный ответ в проверочном примере!');
                generateCaptcha();
                return;
            }

            const btn = document.getElementById('submitBtn');
            if (btn) {
                btn.innerHTML = 'Отправка...';
                btn.disabled = true;
            }

            setTimeout(() => {
                contactForm.style.display = 'none';
                if (successMsg) successMsg.style.display = 'block';
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    window.scrollTo({ top: contactSection.offsetTop, behavior: 'smooth' });
                }
            }, 1500);
        });
        
        // Глобальная функция сброса (если кнопка в HTML вызывает её через onclick)
        window.resetForm = () => {
            contactForm.reset();
            contactForm.style.display = 'block';
            if (successMsg) successMsg.style.display = 'none';
            const btn = document.getElementById('submitBtn');
            if (btn) {
                btn.innerHTML = '<span>Запросить доступ</span><i data-lucide="send"></i>';
                btn.disabled = false;
            }
            generateCaptcha();
            if (typeof lucide !== 'undefined') lucide.createIcons();
        };
    }

    // 8. Мобильное меню (есть во всех хедерах)
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('burger--active');
            mobileMenu.classList.toggle('mobile-menu--active');
            document.body.style.overflow = mobileMenu.classList.contains('mobile-menu--active') ? 'hidden' : 'auto';
        });

        document.querySelectorAll('.mobile-nav__link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('burger--active');
                mobileMenu.classList.remove('mobile-menu--active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // 9. Cookie Popup
    const cookiePopup = document.getElementById('cookiePopup');
    const acceptBtn = document.getElementById('acceptCookies');
    if (cookiePopup && acceptBtn) {
        if (!localStorage.getItem('tigra_cookies_accepted')) {
            setTimeout(() => {
                cookiePopup.classList.add('cookie-popup--show');
            }, 2000);
        }

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('tigra_cookies_accepted', 'true');
            cookiePopup.classList.remove('cookie-popup--show');
        });
    }
});