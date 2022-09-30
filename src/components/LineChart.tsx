import { useEffect, useState } from 'react';
import useGitlabData from '../hooks/useGitlabData';
import { Commit } from '../types/models';
import { Line } from 'react-chartjs-2';
import '../styles/LineChart.css';
const LineChart = () => {
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
  const { data, fetchData } = useGitlabData<Commit[]>(`/repository/commits?first_parent=true&since=${startDate}&until=${lastDate}`);

  useEffect(() => {
    fetchData();
  }, [startDate, lastDate]);

  /* fiks reverseString */
  /* const reverseString = (str: string) => {
    let newString = '';
    for (let i = str.length - 1; i >= 0; i--) {
      newString += str[i];
    }
    return newString;
  }; */

  if (!data) return <div>Oops, no data</div>;

  const lineChartData = data.reduce((data, commit) => {
    const reversedDate = commit.committed_date.substring(0, 10); /* reverseString */
    if (data[reversedDate]) {
      data[reversedDate]++;
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
      <Line
        data={{
          labels: Object.keys(lineChartData),
          datasets: [
            {
              label: `Number of commits`,
              fill: false,
              backgroundColor: '#fc6d26',
              borderColor: '#fc6d26',
              data: Object.values(lineChartData)
            }
          ]
        }}
      />
    </div>
  );
};

export default LineChart;
