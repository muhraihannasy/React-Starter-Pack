function formatToRupiah(number: number) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });

  return formatter.format(number);
}

export default formatToRupiah;
