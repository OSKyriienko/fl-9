const userCard = (key) => {
    let balance = 100;
    let transactionLimit = 100;
    let historyLogs = [];
    const COMMISSION = 0.005;

    const getCardOptions = () => {
        return { key, balance, transactionLimit, historyLogs }
    };

    const putCredits = ( credits ) => {
        balance += credits;
        historyLogs.push({
            operationType: 'Received Credits',
            credits: credits,
            operationTime: new Date().toLocaleString()
        })
    };

    const takeCredits = (credits) => {
        if ( balance >= credits ) {
            if ( transactionLimit >= credits) {
                balance -= credits;
                historyLogs.push({
                    operationType: 'Withdrawal of Credits',
                    credits: credits,
                    operationTime: new Date().toLocaleString()
                })
            } else {
                console.log('Your limit has been exceeded');
            }
        } else {
            console.log('You don\'t have enough money');
        }
    };

    const setTransactionLimit = (credits) => {
        transactionLimit = credits;
        historyLogs.push({
            operationType: 'Transaction limit change',
            credits: credits,
            operationTime: new Date().toLocaleString()
        })
    };

    const transferCredits = (credits, card) => {
        if ( balance >= credits + credits*COMMISSION ) {
            if ( transactionLimit >= credits ) {
                takeCredits(credits + credits*COMMISSION);
                card.putCredits(credits);
            } else {
                console.log('Your limit has been exceeded');
            }
        } else {
            console.log('You don\'t have enough money');
        }
    };

    return {
        getCardOptions: getCardOptions,
        putCredits: putCredits,
        takeCredits: takeCredits,
        setTransactionLimit: setTransactionLimit,
        transferCredits: transferCredits
    }
};

class UserAccount {
    constructor(name) {
        this.name = name;
        this.cards = [];
        this.MAX_CARDS = 3;
    }

    addCard() {
      if ( this.cards.length < this.MAX_CARDS ) {
          this.cards.push(userCard(this.cards.length + 1))
      } else {
          console.log('You\'ve already had three cards');
      }
    }

    getCardByKey(index) {
        return this.cards[index - 1];
    }
}

