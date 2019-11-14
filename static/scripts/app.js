const BUTTON_SELECTOR = 'button.project__section__commands__command'
const EXECUTE_API_ENDPOINT = '/api/commands';

const init = () => {
  const buttonEls = document.querySelectorAll(BUTTON_SELECTOR);

  const executeCommand = (event) => {
    const id = event.currentTarget.dataset.commandId;

    event.preventDefault();
    fetch(`${EXECUTE_API_ENDPOINT}/${id}`);
  };

  buttonEls.forEach((el) => {
    el.addEventListener('click', executeCommand);
  });
};

window.addEventListener('DOMContentLoaded', init);
