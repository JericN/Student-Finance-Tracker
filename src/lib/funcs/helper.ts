const currencyOptions = { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 };

export function currency(value: number) {
    return value.toLocaleString('en-US', currencyOptions);
}
