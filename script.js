const emailInput = document.querySelector('#email-input');
const resultsList = document.querySelector('#results-list');
const resultLength = document.querySelector('#result-length');
const copyAllButton = document.querySelector('#copy-all');


window.addEventListener('load', () => { 
  emailInput.focus();
});


const generateEmailVariants = (username) => {
  const n = username.length;
  const variants = [];

  for (let i = 0; i < Math.pow(2, n - 1); i++) {
    const variant = [];
    let k = 0;

    for (let j = 0; j < n; j++) {
      variant.push(username.charAt(j));
      if (j < n - 1 && i & (1 << k)) {
        variant.push('.');
      }
      k++;
    }

    variants.push(variant.join(''));
  }

  return variants;
}

emailInput.addEventListener('input', (event) => {
  const email = event.target.value;
  const variants = generateEmailVariants(email);
  
  resultsList.innerHTML = '';

  if (variants.length > 0 && emailInput.value.length > 0) {
  resultLength.parentElement.classList.remove('hidden');
  resultLength.innerText = variants.length;
  copyAllButton.classList.remove('hidden');

  variants.forEach((variant) => {
    const listItem = `<li class='item'><span> ${variant}@gmail.com </span> <i class="fa fa-clipboard fa-lg" aria-hidden="true"></i></li>`;
    resultsList.insertAdjacentHTML('beforeend', listItem);
  });

  copyAllButton.onclick = () => {
    const allEmails = variants.map(v => `${v}@gmail.com`).join('\n');
    navigator.clipboard.writeText(allEmails)
      .then(() => alert('All email variations copied!'))
      .catch(err => console.error('Failed to copy:', err));
  };
} else {
  resultLength.parentElement.classList.add('hidden');
  copyAllButton.classList.add('hidden');
}


  if (variants.length > 0 && emailInput.value.length > 0) {
    resultLength.parentElement.classList.remove('hidden');
    resultLength.innerText = variants.length;
    variants.forEach((variant) => {
    const listItem = `<li class='item'><span> ${variant}@gmail.com </span> <i class="fa fa-clipboard fa-lg" aria-hidden="true"></i></li>`;
    resultsList.insertAdjacentHTML('beforeend', listItem);
  })
  } else {
    resultLength.parentElement.classList.add('hidden');
  }

  const copyButtons = document.getElementsByTagName('i');

  Array.from(copyButtons).forEach((button) => {
    button.addEventListener('click', (event) => {
      const email = event.target.parentElement.innerText;
      navigator.clipboard.writeText(email);
    })
  });
});



