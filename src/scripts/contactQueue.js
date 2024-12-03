const onPageLoad = () => {
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addQueue();
  });

  const randomTimeout = 2000 + Math.random() * 3000;
  setTimeout(() => {
    alert('Acaba de ingresar un nuevo paciente!');
  }, randomTimeout);
};

document.addEventListener('DOMContentLoaded', onPageLoad);

class PacientQueue {
  constructor() {
    this.pacient = [];
  }
  push(_pacient) {
    this.pacient.push(_pacient);
  }
  unshift() {
    return this.pacient.unshift();
  }
}

const queue = new PacientQueue();

const addQueue = () => {
  const name = document.getElementById('name_entry').value;
  const email = document.getElementById('email_entry').value;
  const msg = document.getElementById('message_entry').value;

  const queueItem = { name, email, msg };
  console.log('Item added to Queue ', queueItem);

  queue.push(queueItem);

  alert('Su solicitud fué recibida');
};
