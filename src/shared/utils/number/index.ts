export type NumSource = bigint | number | string;

export function toNumber(value: NumSource): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return Number(value);
  return Number(value.toString());
}

export function formatFixedAmountString(
  amount: NumSource,
  decimalPlaces: NumSource = 0,
): string {
  const num = toNumber(amount);
  const digits = toNumber(decimalPlaces);

  if (isNaN(num) || isNaN(digits)) {
    return amount.toString();
  }

  let result = num.toFixed(digits);
  if (result.includes('.')) {
    result = result.replace(/0+$/, '');
    result = result.replace(/\.$/, '');
  }

  return result;
}

export const roundAmountForDisplay = (
  n: NumSource,
  defaultDecimalPlaces = 18,
): string => {
  const num = toNumber(n);
  if (isNaN(num)) return n.toString();

  if (num > 100) return formatFixedAmountString(n, 0);
  if (num > 10) return formatFixedAmountString(n, 2);
  if (num > 1) return formatFixedAmountString(n, 3);
  if (num > 0.01) return formatFixedAmountString(n, 4);
  if (num > 0.001) return formatFixedAmountString(n, 5);
  if (num > 0.0001) return formatFixedAmountString(n, 6);
  if (num > 0.00001) return formatFixedAmountString(n, 7);
  return formatFixedAmountString(n, defaultDecimalPlaces);
};
