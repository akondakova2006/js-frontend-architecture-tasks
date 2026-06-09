import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

// Этот объект можно использовать для того, чтобы обрабатывать ошибки сети.
// Это необязательное задание, но крайне рекомендуем попрактиковаться.
const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// Используйте эту функцию для выполнения валидации.
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках.
const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

// BEGIN
export default () => {
  const form = document.querySelector('form');
  const submitButton = document.querySelector('[type="submit"]');

  const nameInput = document.querySelector('[name="name"]');
  const emailInput = document.querySelector('[name="email"]');
  const passwordInput = document.querySelector('[name="password"]');
  const passwordConfirmInput = document.querySelector('[name="passwordConfirmation"]');

  const state = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const validatePasswordConfirmation = (password, confirm) => password === confirm;

  const updateSubmitState = () => {
    const isValid =
      state.name.length > 0 &&
      validateEmail(state.email) &&
      validatePassword(state.password) &&
      validatePasswordConfirmation(state.password, state.passwordConfirmation);

    submitButton.disabled = !isValid;
  };

  const renderError = (input, message, condition) => {
    const existing = input.parentNode.querySelector(`.${input.name}-error`);

    if (condition) {
      input.classList.add('is-invalid');

      if (!existing) {
        const el = document.createElement('div');
        el.classList.add(`${input.name}-error`);
        el.textContent = message;
        input.after(el);
      }
    } else {
      input.classList.remove('is-invalid');

      if (existing) {
        existing.remove();
      }
    }
  };

  const showErrors = () => {
    renderError(
      emailInput,
      'email must be a valid email',
      state.email && !validateEmail(state.email),
    );

    renderError(
      passwordInput,
      'password must be at least 6 characters',
      state.password && !validatePassword(state.password),
    );

    renderError(
      passwordConfirmInput,
      'Password confirmation does not match to password',
      state.passwordConfirmation &&
        !validatePasswordConfirmation(state.password, state.passwordConfirmation),
    );
  };

  const render = () => {
    showErrors();
    updateSubmitState();
  };

  const onInput = (e) => {
    state[e.target.name] = e.target.value;
    render();
  };

  form.addEventListener('input', onInput);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const response = await axios.post('/users', state);

    if (response.status === 200) {
      document.body.textContent = 'User Created';
    }
  });

  render();
};
// END