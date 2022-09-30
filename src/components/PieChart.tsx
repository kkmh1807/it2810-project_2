import useGitlabData from '../hooks/useGitlabData';
import { Commit } from '../types/models';
import { Pie } from 'react-chartjs-2';
import { generateColor } from '../utils/utils';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const numberOfCommits = 200;

const PieChart = () => {
  const { data, isLoading, isError } = useGitlabData<Commit[]>(`/repository/commits?all=true&per_page=${numberOfCommits}`);

  if (isLoading) return <Loader />;

  if (isError) return <ErrorComponent />;

  if (!data?.length) return <div>No commits were found for this repository</div>;

  const chartData = data.reduce((data, commit) => {
    if (data[commit.author_name]) {
      data[commit.author_name]++;
    } else {
      data[commit.author_name] = 1;
    }
    return data;
  }, {} as Record<Commit['author_name'], number>);

  return (
    <div className="pie-chart-wrapper">
      <p>Commits statistics for the last {numberOfCommits} commits in the repository</p>
      <Pie
        data={{
          labels: Object.keys(chartData),
          datasets: [
            {
              backgroundColor: generateColor(Object.keys(chartData).length),
              data: Object.values(chartData)
            }
          ]
        }}
      />
    </div>
  );
};

export default PieChart;
