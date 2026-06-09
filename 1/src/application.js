export default () => {
  // BEGIN
  let state = {
    result: 0,
  };

  const render = () => {
    const resultElement = document.getElementById('result');
    const form = document.querySelector('form');
    const input = document.querySelector('input');

    resultElement.textContent = state.result;

    form.reset();
    input.focus();
  };

  render();

  const form = document.querySelector('form');
  const resetButton = document.querySelector('[type="button"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const value = parseInt(
      new FormData(form).get('number'),
      10,
    );

    state.result += value;

    render();
  });

  resetButton.addEventListener('click', () => {
    state.result = 0;
    render();
  });
  // END
};