const amount = parseFloat(prompt('Enter amount of money'));
const discount = parseFloat(prompt('Enter your discount'));
if (Number.isNaN(amount) || Number.isNaN(discount) || amount <= 0 ||
    discount < 0 || discount > 100) {
    console.log('Invalid Data');
} else {
    console.log(`Price without discount: ${Number(amount.toFixed(2))}
Discount: ${Number(discount.toFixed(2))}%
Price with discount: ${Number((amount - amount * discount / 100).toFixed(2))}
Saved: ${Number((amount * discount / 100).toFixed(2))}`);
}

