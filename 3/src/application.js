// BEGIN
module.exports = (laptops) => {
  const state = {
    processor: '',
    memory: '',
    frequencyMin: '',
    frequencyMax: '',
  };

  const result = document.querySelector('.result');

  const render = () => {
    const filtered = laptops.filter((laptop) => {
      if (
        state.processor &&
        laptop.processor !== state.processor
      ) {
        return false;
      }

      if (state.memory && laptop.memory !== Number(state.memory)) {
        return false;
      }

      if (state.frequencyMin && laptop.frequency < Number(state.frequencyMin)) {
        return false;
      }

      if (state.frequencyMax && laptop.frequency > Number(state.frequencyMax)) {
        return false;
      }

      return true;
    });

    result.innerHTML = '';

    if (filtered.length === 0) return;

    const ul = document.createElement('ul');

    filtered.forEach(({ model }) => {
      const li = document.createElement('li');
      li.textContent = model;
      ul.append(li);
    });

    result.append(ul);
  };

  render();

  const processor = document.querySelector('[name="processor_eq"]');
  const memory = document.querySelector('[name="memory_eq"]');
  const frequencyMin = document.querySelector('[name="frequency_gte"]');
  const frequencyMax = document.querySelector('[name="frequency_lte"]');

  processor?.addEventListener('change', (e) => {
    state.processor = e.target.value;
    render();
  });

  memory?.addEventListener('change', (e) => {
    state.memory = e.target.value;
    render();
  });

  frequencyMin?.addEventListener('input', (e) => {
    state.frequencyMin = e.target.value;
    render();
  });

  frequencyMax?.addEventListener('input', (e) => {
    state.frequencyMax = e.target.value;
    render();
  });
};
// END