const BUTTON_SELECTOR = 'button.project__section__commands__command';
const OUTPUT_CONTAINER_SELECTOR = '.output-container';
const OUTPUT_TEXT_SELECTOR = '.output__text';
const OUTPUT_TOGGLE_BUTTON_SELECTOR = '.output-container__toggle';
const EXECUTE_API_ENDPOINT = '/api/commands';

const init = () => {
  let outputExpanded = false;
  const outputContainerEl = document.querySelector(OUTPUT_CONTAINER_SELECTOR);
  const outputToggleButtonEl = document.querySelector(OUTPUT_TOGGLE_BUTTON_SELECTOR);
  const outputTextEl = document.querySelector(OUTPUT_TEXT_SELECTOR);
  const buttonEls = document.querySelectorAll(BUTTON_SELECTOR);

  const toggleOutput = () => {
    if (!outputExpanded) {
      outputContainerEl.classList.add('expanded');
      outputContainerEl.setAttribute('aria-pressed', 'true');
      outputToggleButtonEl.innerHTML = '▼';
    } else {
      outputContainerEl.classList.remove('expanded');
      outputContainerEl.setAttribute('aria-pressed', 'false');
      outputToggleButtonEl.innerHTML = '▲';
    }

    outputExpanded = !outputExpanded;
  };

  const executeCommand = (event) => {
    const id = event.currentTarget.dataset.commandId;

    if (!outputExpanded) {
      toggleOutput();
    }

    outputTextEl.innerHTML = '';

    event.preventDefault();
    fetch(`${EXECUTE_API_ENDPOINT}/${id}`)
      .then((response) => response.text())
      .then((text) => {
        outputTextEl.innerHTML = text;
      })
      .catch((error) => {
        outputTextEl.innerHTML = `Error: ${error.toString()}`;
      });
  };

  buttonEls.forEach((el) => {
    el.addEventListener('click', executeCommand);
  });

  outputToggleButtonEl.addEventListener('click', toggleOutput);
};

window.addEventListener('DOMContentLoaded', init);
