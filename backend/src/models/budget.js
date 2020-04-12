const mongoose = require('mongoose');

const categories = [
  'Bar & restaurants',
  'Clothing',
  'Debts & loans',
  'Education',
  'Entertainment & hobbies',
  'Familly & children',
  'Food',
  'Groceries',
  'Health',
  'Home',
  'Investments',
  'Others',
  'Personal care',
  'Pets',
  'Shopping',
  'Subscriptions & services',
  'Taxes',
  'Transportation',
  'Travel',
  'Salary',
  'Loan',
  'Investments',
  'Other Earnings',
];

const slugs = [
  'bar_restaurants',
  'bar_restaurants',
  'debts_loans',
  'education',
  'entertainment_hobbies',
  'familly_children',
  'food',
  'groceries',
  'health',
  'home',
  'investments',
  'others',
  'personal_care',
  'pets',
  'shopping',
  'subscriptions_services',
  'taxes',
  'transportation',
  'travel',
  'salary',
  'loan',
  'investments',
  'other_earnings',
];
const Budget = mongoose.model('Budget', {
  name: {
    type: String,
    required: true,
    validate(value) {
      return categories.includes(value);
    },
  },
  slug: {
    type: String,
    required: true,
    validate(value) {
      return slugs.includes(value);
    },
  },
  type: {
    type: String,
    required: true,
    validate(value) {
      return value === 'expense' || value === 'income';
    },
  },
  amount: {
    type: Number,
    default: 0,
  },
});

module.exports = Budget;
