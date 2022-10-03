import LogoIcon from '../assets/icons/logo.svg';
import '../styles/Loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <img src={LogoIcon} alt="Logo" />
      <span>Loading...</span>
    </div>
  );
};

export default Loader;
