import { useState } from "react";

interface Expense {
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
  status: string;
}

interface ExpenseFormProps {
  addExpense: (expense: Expense) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ addExpense }) => {
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash");
  const [status, setStatus] = useState<string>("Completed");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      errors.amount = "Please enter a valid amount greater than 0.";
    }

    if (!category) {
      errors.category = "Please select a category.";
    }

    if (!date || new Date(date) > new Date()) {
      errors.date = "Please select a valid date that is in the past.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    addExpense({
      amount: parseFloat(amount),
      category,
      date,
      paymentMethod,
      status,
    });
    setAmount("");
    setCategory("");
    setDate("");
    setPaymentMethod("Cash");
    setStatus("Completed");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md transition-colors duration-300"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-200">
        Expense
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 p-1 h-6 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 dark:text-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 p-1 h-6 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 dark:text-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 p-1 h-6 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Payment Method
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mt-1 h-6 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Pix">Pix</option>
          <option value="Bank Slip">Bank Slip</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 h-6 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-1 bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
