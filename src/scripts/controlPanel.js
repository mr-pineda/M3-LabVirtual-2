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

  document.getElementById(
    'display_count'
  ).textContent = `Cantiad de consultas: ${count}`;
  document.getElementById(
    'display_serv_price'
  ).textContent = `Precio por consulta: $${priceData[service][prevision]}`;
  document.getElementById(
    'display_total_price'
  ).textContent = `Total: $${totalPrice}`;
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
