// BEGIN
export default (companies) => {
  let activeCompanyId = null;
  let descriptionEl = null;

  const renderDescription = (text) => {
    if (!descriptionEl) {
      descriptionEl = document.createElement('div');
      descriptionEl.id = 'company-description';
      document.body.append(descriptionEl);
    }

    descriptionEl.textContent = text;
  };

  const clearDescription = () => {
    if (descriptionEl) {
      descriptionEl.textContent = '';
    }
  };

  const container = document.querySelector('.container');

  companies.forEach((company) => {
    // создаём элемент компании
    const el = document.createElement('div');
    el.textContent = company.name;
    el.classList.add('company');

    container.append(el);

    el.addEventListener('click', () => {
      if (activeCompanyId === company.id) {
        activeCompanyId = null;
        clearDescription();
        return;
      }

      activeCompanyId = company.id;
      renderDescription(company.description);
    });
  });
};
// END