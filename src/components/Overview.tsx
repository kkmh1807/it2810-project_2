import '../styles/Overview.css';
import 'chart.js/auto';
import BarChart from './BarChart';
import PieChart from './PieChart';

const Overview = () => {
  return (
    <div className="overview-wrapper">
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam unde dolore aperiam voluptatem ratione sunt cumque repudiandae
        doloribus qui ab facere beatae, soluta, voluptates repellat laboriosam laudantium, fugit delectus veritatis aliquam vitae molestiae
        accusamus ex alias sit. Ratione ipsum quibusdam, qui ducimus iste dolorem animi autem aut cumque laudantium laboriosam!
      </div>
      <PieChart />
      <BarChart />
    </div>
  );
};

export default Overview;
