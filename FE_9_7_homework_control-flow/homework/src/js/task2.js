let game = confirm('Do you want to play game?');
const FOR_UPPER_RANGE = 1;
const INITIAL_MAX_PRIZE = 10;
const INITIAL_RANGE = 5;
let currentPrize, currentMaxPrize = INITIAL_MAX_PRIZE, currentRange = INITIAL_RANGE, userTotalPrize = 0;
if (game) {
    while (game) {
        let userAmountLeftAttempts = 3;
        currentPrize = currentMaxPrize;
        let randomNumber = Math.floor(Math.random() * (currentRange + FOR_UPPER_RANGE));
        let win = false;
        while (userAmountLeftAttempts > 0) {
            let userNumber = prompt(`
      Enter your number from 0 to ${currentRange}
      Attempts left: ${userAmountLeftAttempts}
      Total Prize: ${userTotalPrize}
      Possible prize on current attempt: ${currentPrize}`);
            //validate value which Number() can convert into 0.
            if (userNumber === '' || userNumber === null || userNumber[0] === ' ') {
                userAmountLeftAttempts--;
                currentPrize = Math.floor(currentPrize / 2);
                continue;
            } else {
                userNumber = Number(userNumber);
            }
            if (userNumber === randomNumber) {
                userTotalPrize += currentPrize;
                win = true;
                break;
            }
            userAmountLeftAttempts--;
            currentPrize = Math.floor(currentPrize / 2);
        }
        if (win) {
            alert(`Congratulation! Your prize is: ${currentPrize}`);
            game = confirm('Do you want to continue?');
            if (game) {
                currentMaxPrize *= 3;
                currentRange *= 2;
                continue;
            }
        }
        alert(`Thank you for a game. Your prize is ${userTotalPrize}`);
        game = confirm('Do you want to play a game again?');
        if (game) {
            currentMaxPrize = INITIAL_MAX_PRIZE;
            currentRange = INITIAL_RANGE;
            userTotalPrize = 0;
        }
    }
} else {
    alert('You did not become a millionaire, but can.')
}
