import '../styles/Overview.css';
import 'chart.js/auto';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import Group from '../assets/images/group.jpg';

const Overview = () => {
  return (
    <div className="overview-wrapper">
      <div className="img-container">
        <h1>This is how good your group work together on Gitlab!</h1>
        <img src={Group} alt="Stock photo of group" id="stock-photo" />
      </div>
      <PieChart />
      <BarChart />
    </div>
  );
};

export default Overview;
