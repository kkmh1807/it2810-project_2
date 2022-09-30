import { useEffect, useState } from 'react';
import useGitlabData from '../hooks/useGitlabData';
import { Commit } from '../types/models';
import '../styles/Overview.css';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { generateColor } from '../utils/utils';
import Commits from './Commits';
import LineChart from './LineChart';

const numberOfCommits = 500;

const Overview = () => {
  const { data, fetchData } = useGitlabData<Commit[]>(`/repository/commits?all=true&per_page=${numberOfCommits}`);

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <div>Oops, no data</div>;

  const chartData = data.reduce((data, commit) => {
    if (data[commit.author_name]) {
      data[commit.author_name]++;
    } else {
      data[commit.author_name] = 1;
    }
    return data;
  }, {} as Record<Commit['author_name'], number>);

  return (
    <div className="overview-wrapper">
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam unde dolore aperiam voluptatem ratione sunt cumque repudiandae
        doloribus qui ab facere beatae, soluta, voluptates repellat laboriosam laudantium, fugit delectus veritatis aliquam vitae molestiae
        accusamus ex alias sit. Ratione ipsum quibusdam, qui ducimus iste dolorem animi autem aut cumque laudantium laboriosam!
      </div>
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
      <LineChart />
    </div>
  );
};

export default Overview;
