import ExpenseForm from "./ExpenseForm";
import { ChartOptions, Filler } from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import { useTransactionContext } from "../../contexts/TransactionContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ExpenseTracker: React.FC = () => {
  const { expenses, addExpense } = useTransactionContext();

  // data for charts
  const categories = Array.from(new Set(expenses.map((e) => e.category)));
  const categoryTotals = categories.map((cat) =>
    expenses
      .filter((e) => e.category === cat)
      .reduce((acc, e) => acc + e.amount, 0)
  );

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthlyTotals = Array(12).fill(0);
  expenses.forEach((e) => {
    const month = new Date(e.date).getMonth();
    monthlyTotals[month] += e.amount;
  });

  const pieData = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: categoryTotals,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthlyTotals,
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const pieOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
  };

  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            if (typeof value === "number") {
              return `$${value.toFixed(2)}`;
            }
            return "$0.00";
          },
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors duration-300 max-md:p-0">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-200">
        Expense Tracker
      </h1>
      <ExpenseForm addExpense={addExpense} />
      <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
        <div className="col-span-1 md:col-span-3 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md w-full md:w-auto transition-colors duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-200">
            Expenses by Category
          </h2>
          <div className="h-64 flex justify-center items-center min-h-[256px]">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        <div className="col-span-1 md:col-span-7 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md w-full md:w-auto transition-colors duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-200">
            Monthly Expenses
          </h2>
          <div className="h-64">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
