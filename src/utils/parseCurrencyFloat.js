export default currency => {
  return parseFloat(currency.replace('.', '').replace(',', '.'));
};
