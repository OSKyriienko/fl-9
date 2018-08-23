function reverseNumber(num) {
    let rvsNumber = Number(Math.abs(num).toString().split('').reverse().join(''));
    return num > 0 ? rvsNumber: -rvsNumber;
}