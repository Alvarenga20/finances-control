import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";
import { useTransactionContext } from "../../contexts/TransactionContext";
import TransactionModal from "./TransactionModal";

interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
  status: string;
}

const Transactions = () => {
  const { transactions: contextTransactions } = useTransactionContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");

  const navigate = useNavigate();

  // Mocked data for transactions if the user didn't add anything
  useEffect(() => {
    if (contextTransactions && contextTransactions.length === 0) {
      setTransactions([
        {
          id: "T001",
          amount: 200,
          category: "Groceries",
          date: "2024-12-01",
          paymentMethod: "Credit Card",
          status: "Completed",
        },
        {
          id: "T002",
          amount: 500,
          category: "Entertainment",
          date: "2024-11-22",
          paymentMethod: "Cash",
          status: "Completed",
        },
        {
          id: "T003",
          amount: 150,
          category: "Transport",
          date: "2024-11-15",
          paymentMethod: "Debit Card",
          status: "Completed",
        },
        {
          id: "T004",
          amount: 400,
          category: "Dining",
          date: "2024-10-30",
          paymentMethod: "Credit Card",
          status: "Pending",
        },
      ]);
    } else {
      setTransactions(contextTransactions);
    }
  }, [contextTransactions]);

  // UseEffect for filtering the transactions
  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      const withinDateRange =
        dateRange.start && dateRange.end
          ? new Date(transaction.date) >= new Date(dateRange.start) &&
            new Date(transaction.date) <= new Date(dateRange.end)
          : true;
      const matchesSearch =
        transaction.category
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        transaction.paymentMethod
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesSearch && withinDateRange;
    });
    setFilteredTransactions(filtered);
  }, [searchQuery, dateRange, transactions]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const handleDateRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "start" | "end"
  ) => {
    setDateRange((prev) => ({ ...prev, [type]: e.target.value }));
  };

  const handleDelete = (id: string) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  const openModal = (transaction: Transaction, mode: "view" | "edit") => {
    setSelectedTransaction(transaction);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = (updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((trans) =>
        trans.id === updatedTransaction.id ? updatedTransaction : trans
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800 text-black dark:text-gray-200">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-4xl font-bold mb-6 max-md:mt-6">Transactions</h1>

        <div className="mb-6 flex gap-4 max-md:flex-wrap max-md:w-full">
          <div className="flex gap-4 max-md:w-full md:max-w-[500px]">
            <label htmlFor="search" className="mt-2 text-2xl">
              <FaSearch />
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by category or payment method"
              value={searchQuery}
              onChange={handleSearch}
              className="p-2 border rounded-md w-full bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 max-md:w-full"
            />
          </div>
          <div className="flex gap-4 max-md:w-full">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => handleDateRangeChange(e, "start")}
              className="p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 max-md:w-full"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => handleDateRangeChange(e, "end")}
              className="p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 max-md:w-full"
            />
          </div>
        </div>

        <div className="overflow-y-auto max-h-[70vh] border rounded-lg shadow-md">
          <table className="min-w-full bg-white dark:bg-gray-800 border rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-4 border-b text-left">Transaction ID</th>
                <th className="p-4 border-b text-left">Amount</th>
                <th className="p-4 border-b text-left">Category</th>
                <th className="p-4 border-b text-left">Payment Method</th>
                <th className="p-4 border-b text-left">Status</th>
                <th className="p-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="p-4 border-b">{transaction.id}</td>
                  <td className="p-4 border-b">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="p-4 border-b">{transaction.category}</td>
                  <td className="p-4 border-b">{transaction.paymentMethod}</td>
                  <td className="p-4 border-b">{transaction.status}</td>
                  <td className="p-4 border-b text-left">
                    <div className="inline-flex items-center gap-2">
                      <button
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        onClick={() => openModal(transaction, "view")}
                      >
                        View
                      </button>
                      <button
                        className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                        onClick={() => openModal(transaction, "edit")}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        onClick={() => handleDelete(transaction.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <button
            className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700"
            onClick={() => navigate("/dashboard")}
          >
            New Transaction
          </button>
        </div>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        transaction={selectedTransaction || {}}
        onSave={handleSave}
        mode={modalMode}
      />
    </div>
  );
};

export default Transactions;
