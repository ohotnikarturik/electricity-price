export const formatPrice = (value: number) => {
  // convert it to snt/kWh and add Finnish VAT of 24 %
  const price = Math.round(value * 1.24 * 100) / 1000
  return price.toFixed(3)
}
