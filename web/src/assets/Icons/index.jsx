import React from 'react';
import * as ReactIcons from 'react-icons/fa';
import { CategoryIconEarning, CategoryIconExpense } from './styles';

// category icons
export default {
  expense: {
    bar_restaurants: (
      <CategoryIconExpense>
        <ReactIcons.FaGlassMartiniAlt />
      </CategoryIconExpense>
    ),
    clothing: (
      <CategoryIconExpense>
        <ReactIcons.FaTshirt />
      </CategoryIconExpense>
    ),
    debts_loans: (
      <CategoryIconExpense>
        <ReactIcons.FaReceipt />
      </CategoryIconExpense>
    ),
    education: (
      <CategoryIconExpense>
        <ReactIcons.FaUserGraduate />
      </CategoryIconExpense>
    ),
    entertainment_hobbies: (
      <CategoryIconExpense>
        <ReactIcons.FaSmile />
      </CategoryIconExpense>
    ),
    familly_children: (
      <CategoryIconExpense>
        <ReactIcons.FaHeart />
      </CategoryIconExpense>
    ),
    food: (
      <CategoryIconExpense>
        <ReactIcons.FaUtensils />
      </CategoryIconExpense>
    ),
    groceries: (
      <CategoryIconExpense>
        <ReactIcons.FaShoppingCart />
      </CategoryIconExpense>
    ),
    health: (
      <CategoryIconExpense>
        <ReactIcons.FaMedkit />
      </CategoryIconExpense>
    ),
    home: (
      <CategoryIconExpense>
        <ReactIcons.FaHome />
      </CategoryIconExpense>
    ),
    investments: (
      <CategoryIconExpense>
        <ReactIcons.FaChartLine />
      </CategoryIconExpense>
    ),
    others: (
      <CategoryIconExpense>
        <ReactIcons.FaList />
      </CategoryIconExpense>
    ),
    personal_care: (
      <CategoryIconExpense>
        <ReactIcons.FaUser />
      </CategoryIconExpense>
    ),
    pets: (
      <CategoryIconExpense>
        <ReactIcons.FaPaw />
      </CategoryIconExpense>
    ),
    shopping: (
      <CategoryIconExpense>
        <ReactIcons.FaShoppingBag />
      </CategoryIconExpense>
    ),
    subscriptions_services: (
      <CategoryIconExpense>
        <ReactIcons.FaPrint />
      </CategoryIconExpense>
    ),
    taxes: (
      <CategoryIconExpense>
        <ReactIcons.FaPercentage />
      </CategoryIconExpense>
    ),
    transportation: (
      <CategoryIconExpense>
        <ReactIcons.FaBus />
      </CategoryIconExpense>
    ),
    travel: (
      <CategoryIconExpense>
        <ReactIcons.FaPlane />
      </CategoryIconExpense>
    ),
  },
  earnings: {
    salary: (
      <CategoryIconEarning>
        <ReactIcons.FaStar />
      </CategoryIconEarning>
    ),
    loan: (
      <CategoryIconEarning>
        <ReactIcons.FaDollarSign />
      </CategoryIconEarning>
    ),
    investments: (
      <CategoryIconEarning>
        <ReactIcons.FaChartLine />
      </CategoryIconEarning>
    ),
    other_earnings: (
      <CategoryIconEarning>
        <ReactIcons.FaEllipsisH />
      </CategoryIconEarning>
    ),
  },
};
