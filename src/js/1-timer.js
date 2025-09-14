import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import convertMs from './convert';

const input = document.querySelector('input[type="text"]');
const btn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

btn.addEventListener('click', startTimer);

let userSelectedDate = null;

btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() < 0) {
      iziToast.error({
        icon: '',
        message: '❌ Please choose a date in the future',
        position: 'topRight',
        progressBar: false,
        timeout: 3000,
      });

      btn.disabled = true;

      return;
    }
    userSelectedDate = selectedDates[0];

    btn.disabled = false;
  },
};

new flatpickr('#datetime-picker', options);

function startTimer() {
  setInterval(() => {
    const timeLeft = userSelectedDate - Date.now();

    if (timeLeft <= 0) {
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';

      input.disabled = false;
      return;
    }

    const { days: d, hours: h, minutes: m, seconds: s } = convertMs(timeLeft);

    days.textContent = d;
    hours.textContent = h;
    minutes.textContent = m;
    seconds.textContent = s;
  }, 1000);

  btn.disabled = true;
  input.disabled = true;
}
