import { useState } from 'react';
import useGitlabData from '../hooks/useGitlabData';
import { Commit } from '../types/models';
import { Bar } from 'react-chartjs-2';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import '../styles/BarChart.css';

const BarChart = () => {
  const today = new Date(Date.now()).toISOString();

  const subOneMonth = (str: string) => {
    const monthStr = str.substring(5, 7);
    let monthInt = parseInt(monthStr);
    let newMonth = '';
    monthInt -= 1;
    if (monthInt < 10) {
      newMonth = '0' + monthInt + '';
    } else {
      newMonth = '' + monthInt + '';
    }

    return '' + str.substring(0, 5) + newMonth + str.substring(7, 10);
  };
  const [startDate, setStartDate] = useState(subOneMonth(today.substring(0, 10)));
  const [lastDate, setLastDate] = useState(today);

  const { isLoading, isError, data } = useGitlabData<Commit[]>(`/repository/commits?since=${startDate}&until=${lastDate}&per_page=200`);

  if (isLoading) return <Loader />;

  if (isError) return <ErrorComponent />;

  const reverseString = (str: string) => {
    const [year, month, day] = str.split('-');

    const result = [day, month, year].join('-');
    return result;
  };

  if (!data) return <div>Oops, no data</div>;

  const lineChartData = data.reduce((data, commit) => {
    const reversedDate = reverseString(commit.committed_date.substring(0, 10));
    if (data[reversedDate]) {
      data[reversedDate] += 1;
    } else {
      data[reversedDate] = 1;
    }
    return data;
  }, {} as Record<Commit['committed_date'], number>);

  return (
    <div className="line-chart-wrapper">
      <div className="date-wrapper">
        <div id="from">
          <p>From:</p>
          <input type="date" defaultValue={startDate.substring(0, 10)} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div id="to">
          <p>To:</p>
          <input type="date" defaultValue={lastDate.substring(0, 10)} onChange={(e) => setLastDate(e.target.value)} />
        </div>
      </div>
      <Bar
        data={{
          labels: Object.keys(lineChartData).reverse(),
          datasets: [
            {
              label: `Number of commits`,
              backgroundColor: '#fc6d26',
              borderColor: '#fc6d26',
              data: Object.values(lineChartData).reverse()
            }
          ]
        }}
      />
    </div>
  );
};

export default BarChart;
