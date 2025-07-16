// You’re given an array of user transactions. The data looks like this:

// const transactions = [
//   { userId: 'u1', amount: 50, type: 'deposit' },
//   { userId: 'u2', amount: 20, type: 'withdrawal' },
//   { userId: 'u1', amount: 70, type: 'deposit' },
//   { userId: 'u3', amount: 30, type: 'deposit' },
//   { userId: 'u2', amount: 40, type: 'deposit' },
//   { userId: 'u1', amount: 10, type: 'withdrawal' }
// ];

// Complete the function summarizeTransactions(transactions) to return an object like this:

// {
//   u1: { deposits: 120, withdrawals: 10 },
//   u2: { deposits: 40, withdrawals: 20 },
//   u3: { deposits: 30, withdrawals: 0 }
// }

type transactionType = {
  userId: string;
  amount: number;
  type: string;
};

type transactionSummaryType = {
  deposits: number;
  withdrawals: number;
};

enum trans {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
}

const transactions = [
  { userId: "u1", amount: 50, type: "deposit" },
  { userId: "u2", amount: 20, type: "withdrawal" },
  { userId: "u1", amount: 70, type: "deposit" },
  { userId: "u3", amount: 30, type: "deposit" },
  { userId: "u2", amount: 40, type: "deposit" },
  { userId: "u1", amount: 10, type: "withdrawal" },
];

function summarizeTransactions(transactions: transactionType[]) {
  let result: { [key: string]: transactionSummaryType } = {};

  return transactions.reduce((prev, { amount, type, userId }) => {
    let existingItem: transactionSummaryType = prev[userId];

    if (existingItem) {
      let deposits = existingItem.deposits;
      let withdrawals = existingItem.withdrawals;
      if (type == trans.DEPOSIT) deposits += amount;
      else withdrawals += amount;
      return { ...prev, [userId]: { deposits, withdrawals } };
    } else {
      if (type == trans.DEPOSIT)
        return { ...prev, [userId]: { deposits: amount, withdrawals: 0 } };
      else return { ...prev, [userId]: { deposits: 0, withdrawals: amount } };
    }
  }, result);
}

let summary = summarizeTransactions(transactions);

console.log(summary);
