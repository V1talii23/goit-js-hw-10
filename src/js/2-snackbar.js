import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  const radio = e.target.elements.state.value;
  const delay = e.target.elements.delay.value;

  const promise = new Promise((resolve, reject) => {
    if (radio === 'fulfilled') {
      setTimeout(() => {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      }, +delay);
    }
    if (radio === 'rejected') {
      setTimeout(() => {
        reject(`❌ Rejected promise in ${delay}ms`);
      }, +delay);
    }
  });

  promise
    .then(mssg =>
      iziToast.success({
        position: 'topCenter',
        icon: '',
        message: mssg,
      })
    )
    .catch(error =>
      iziToast.error({
        position: 'topCenter',
        icon: '',
        message: error,
      })
    );

  e.target.reset();
}
