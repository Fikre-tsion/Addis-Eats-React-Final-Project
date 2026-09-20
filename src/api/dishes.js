export async function getDishes() {
  const response = await fetch('/dishes.json');

  if (!response.ok) {
    throw new Error('Unable to fetch dishes.');
  }

  return response.json();
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
    currencyDisplay: 'code',
  }).format(value);
}
