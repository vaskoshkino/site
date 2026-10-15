/* СЭС «Чистый Дом» — валидация формы и маска телефона (vanilla JS, без зависимостей) */
(function () {
  'use strict';

  var form = document.getElementById('request-form');
  if (!form) return;

  var nameInput = form.elements.name;
  var phoneInput = form.elements.phone;
  var status = document.getElementById('form-status');
  var yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Маска телефона: +7 (495) 123-45-56 ---------- */

  var DIGITS = 11;

  function digitsOf(value) {
    return (value || '').replace(/\D/g, '');
  }

  function formatPhone(raw) {
    var d = digitsOf(raw);

    // Нормализуем первую цифру: 8 → 7
    if (d.charAt(0) === '8') d = '7' + d.slice(1);
    if (d.charAt(0) !== '7') d = '7' + d;
    d = d.slice(0, DIGITS);

    var rest = d.slice(1); // 10 цифр без кода страны
    var out = '+7';

    if (rest.length) out += ' (' + rest.slice(0, 3);
    if (rest.length >= 3) out += ')';
    if (rest.length > 3) out += ' ' + rest.slice(3, 6);
    if (rest.length > 6) out += '-' + rest.slice(6, 8);
    if (rest.length > 8) out += '-' + rest.slice(8, 10);

    return out;
  }

  function caretAtEnd(el) {
    var len = el.value.length;
    try { el.setSelectionRange(len, len); } catch (e) { /* type=tel может не поддерживать */ }
  }

  phoneInput.addEventListener('input', function () {
    phoneInput.value = formatPhone(phoneInput.value);
    caretAtEnd(phoneInput);
    if (phoneInput.getAttribute('aria-invalid') === 'true') validatePhone();
  });

  phoneInput.addEventListener('focus', function () {
    if (!phoneInput.value) phoneInput.value = '+7 (';
  });

  phoneInput.addEventListener('blur', function () {
    if (digitsOf(phoneInput.value).length <= 1) {
      phoneInput.value = '';
      return;
    }
    phoneInput.value = formatPhone(phoneInput.value);
  });

  phoneInput.addEventListener('paste', function (e) {
    var text = (e.clipboardData || window.clipboardData).getData('text');
    if (!text) return;
    e.preventDefault();
    phoneInput.value = formatPhone(text);
    caretAtEnd(phoneInput);
  });

  /* ---------- Валидация ---------- */

  function setError(input, errorEl, message) {
    if (message) {
      errorEl.textContent = message;
      errorEl.hidden = false;
      input.setAttribute('aria-invalid', 'true');
    } else {
      errorEl.textContent = '';
      errorEl.hidden = true;
      input.removeAttribute('aria-invalid');
    }
    return !message;
  }

  function validateName() {
    var value = nameInput.value.trim();
    var errorEl = document.getElementById('name-error');
    if (!value) return setError(nameInput, errorEl, 'Укажите имя.');
    if (value.length < 2) return setError(nameInput, errorEl, 'Имя должно содержать минимум 2 символа.');
    if (!/^[A-Za-zА-Яа-яЁё\s-]+$/.test(value)) return setError(nameInput, errorEl, 'Имя может содержать только буквы, пробел и дефис.');
    return setError(nameInput, errorEl, '');
  }

  function validatePhone() {
    var errorEl = document.getElementById('phone-error');
    var d = digitsOf(phoneInput.value);
    if (!d || d === '7') return setError(phoneInput, errorEl, 'Укажите телефон.');
    if (d.length !== DIGITS || d.charAt(0) !== '7') {
      return setError(phoneInput, errorEl, 'Введите номер в формате +7 (495) 123-45-56.');
    }
    return setError(phoneInput, errorEl, '');
  }

  nameInput.addEventListener('blur', validateName);
  nameInput.addEventListener('input', function () {
    if (nameInput.getAttribute('aria-invalid') === 'true') validateName();
  });

  /* ---------- Отправка (эмуляция) ---------- */

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var okName = validateName();
    var okPhone = validatePhone();

    if (!okName || !okPhone) {
      status.dataset.state = 'error';
      status.textContent = 'Проверьте выделенные поля и попробуйте снова.';
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправляем…';
    status.removeAttribute('data-state');
    status.textContent = '';

    // Эмуляция сетевого запроса — реальная отправка не выполняется
    window.setTimeout(function () {
      var name = nameInput.value.trim().replace(/[<>&]/g, '');
      status.dataset.state = 'success';
      status.textContent = name + ', спасибо! Заявка принята. Перезвоним в течение 15 минут.';

      form.reset();
      phoneInput.value = '';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Оставить заявку';
    }, 700);
  });
})();
