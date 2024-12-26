import { FaChartLine, FaRegMoneyBillAlt, FaUsers } from "react-icons/fa";
import Sidebar from "../../components/Sidebar/Sidebar";
import ExpenseTracker from "./ExpenseTracker";
import { useEffect, useState } from "react";
import { useTransactionContext } from "../../contexts/TransactionContext";

interface Transaction {
  id: string;
  category: string;
  date: string;
  amount: number;
  paymentMethod: string;
  status: string;
}

const Dashboard = () => {
  const [recentActivity, setRecentActivity] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { transactions } = useTransactionContext();

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        /* Backend configured:
                 const response = await fetch('http://localhost:5000/api/recent-activity');
                                const data: Transaction[] = await response.json();
                                setRecentActivity(data); */

        const recentTransactions = transactions.slice().reverse().slice(0, 3); // Get the 3 most recent transactions

        setRecentActivity(recentTransactions);
      } catch (error) {
        console.error("Error fetching recent activity", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivity();
  }, [transactions]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="max-md:mt-6 text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div className="flex items-center">
              <FaChartLine className="text-blue-500 text-3xl mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Total Revenue</h2>
                <p className="text-2xl">$23,000</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div className="flex items-center">
              <FaRegMoneyBillAlt className="text-green-500 text-3xl mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Total Transactions</h2>
                <p className="text-2xl">45</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div className="flex items-center">
              <FaUsers className="text-orange-500 text-3xl mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Users</h2>
                <p className="text-2xl">1,234</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-2xl mb-6">
          <h2 className="text-2xl font-semibold mb-4">Revenue Growth</h2>
          <ExpenseTracker />
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          {loading ? (
            <p>Loading recent activity...</p>
          ) : recentActivity.length > 0 ? (
            <ul>
              {recentActivity.map((transaction) => (
                <li
                  key={transaction.id}
                  className="mb-4 border-b border-gray-200 dark:border-gray-600 pb-2"
                >
                  <p className="font-semibold">{transaction.category}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {transaction.date} - ${transaction.amount.toFixed(2)} via{" "}
                    {transaction.paymentMethod}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent activity found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
