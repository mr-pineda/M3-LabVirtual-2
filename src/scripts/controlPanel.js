const getServicesPrices = async () => {
  try {
    const res = await fetch('./src/data/prices.json');
    if (!res.ok) {
      console.error(`Response status: ${Response.status}`);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.error('Ups, something happen:', e);
    return null;
  }
};

const calculatePrice = (priceData) => (count) => (service) => (prevision) =>
  count * priceData[service][prevision];

const computeDiscount = (count, price) => {
  if (count > 10) return price * 0.85;
  if (count > 5) return price * 0.9;
  if (count > 2) return price * 0.95;
  return price;
};

const getDiscountedPrice = (priceData, count, service, prevision) =>
  computeDiscount(count, calculatePrice(priceData)(count)(service)(prevision));

const getTotalPrice = async () => {
  const count = parseInt(document.getElementById('count_input').value);
  const service = document.getElementById('price_selector').value;
  const prevision = document.querySelector(
    'input[name="previsionRadio"]:checked'
  ).value;
  if (isNaN(count) || service === 'none') {
    console.log('Invalid entry');

    return;
  }
  const priceData = await getServicesPrices();
  const totalPrice = calculatePrice(priceData)(count)(service)(prevision);
  const discountPrice = getDiscountedPrice(
    priceData,
    count,
    service,
    prevision
  );

  document.getElementById(
    'display_count'
  ).textContent = `Cantiad de consultas: ${count}`;
  document.getElementById(
    'display_serv_price'
  ).textContent = `Precio por consulta: $${priceData[service][prevision]}`;
  document.getElementById(
    'display_total_price'
  ).textContent = `Total sin descuento: $${totalPrice}`;
  document.getElementById(
    'display_disc_price'
  ).textContent = `Con decuento aplicado: $${discountPrice}`;
};

const getWaitTime = () => {
  const workedHours = parseInt(
    document.getElementById('worked_hours_input').value
  );
  const pacientCount = parseInt(
    document.getElementById('pacient_count_input').value
  );
  if (isNaN(workedHours) || isNaN(pacientCount)) {
    console.log('Invalid entry');
    return;
  }
  const waitTime = (workedHours * 60) / pacientCount;
  document.getElementById(
    'meanWaitTime'
  ).textContent = `Tiempo de espera promedio por paciente: ${waitTime.toFixed(
    2
  )} min`;
};

const computeWeekHours = (count, minutesPerPacient) => {
  if (count === 0) return 0;
  return (
    minutesPerPacient / 60 + computeWeekHours(count - 1, minutesPerPacient)
  );
};

const getWeekHours = () => {
  const pacientCount = parseInt(
    document.getElementById('pacient_count_input2').value
  );
  const minutesPerPacient = parseInt(
    document.getElementById('attention_time').value
  );
  if (isNaN(minutesPerPacient) || isNaN(pacientCount)) {
    console.log('Invalid entry');
    return;
  }
  const workedHours = computeWeekHours(pacientCount, minutesPerPacient);
  document.getElementById(
    'weekHours'
  ).textContent = `Horas trabajadas en la semana: ${workedHours.toFixed(2)}`;
};
