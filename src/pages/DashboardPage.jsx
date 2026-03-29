import { useState, useEffect }         from 'react';
import { summaryApi }                  from '../api/summaryApi';
import { incomeApi }                   from '../api/incomeApi';
import { expenseApi }                  from '../api/expenseApi';
import PageWrapper                     from '../components/common/PageWrapper';
import SummaryCards                    from '../components/dashboard/SummaryCards';
import ExpenseChart                    from '../components/dashboard/ExpenseChart';
import RecentTransactions              from '../components/dashboard/RecentTransactions';
import AISuggestions                   from '../components/dashboard/AISuggestions';
import { getCurrentMonthYear }         from '../utils/formatDate';
import toast                           from 'react-hot-toast';

const DashboardPage = () => {
  const [summary,  setSummary]  = useState(null);
  const [incomes,  setIncomes]  = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading,  setLoading]  = useState(true);

  const { month, year } = getCurrentMonthYear();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [summaryRes, incomeRes, expenseRes] = await Promise.all([
          summaryApi.getMonthly(month, year),
          incomeApi.getAll(0, 5),
          expenseApi.getAll(0, 5),
        ]);
        setSummary(summaryRes.data);
        setIncomes(incomeRes.data.content   ?? []); // ✅ null safe
        setExpenses(expenseRes.data.content ?? []); // ✅ null safe
      } catch {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [month, year]); // ✅ correct dependencies

  const monthName = new Date(year, month - 1)
    .toLocaleString('default', { month: 'long' });

  return (
    <PageWrapper
      title="Dashboard"
      subtitle={`${monthName} ${year} overview`}
    >
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="spinner" />
        </div>
      ) : (
        <div className="space-y-6">
          <AISuggestions summary={summary} />  {/* ✅ component not inline */}
          <SummaryCards  summary={summary} />
          <ExpenseChart  summary={summary} />
          <RecentTransactions
            incomes={incomes}
            expenses={expenses}
          />
        </div>
      )}
    </PageWrapper>
  );
};

export default DashboardPage;