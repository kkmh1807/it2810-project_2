import LogoIcon from '../assets/icons/logo.svg';
import '../styles/ErrorComponent.css';

const ErrorComponent = () => {
  return (
    <div className="error-component">
      <img src={LogoIcon} alt="Logo" />
      <span>Looks like something went wrong ☹️</span>
    </div>
  );
};

export default ErrorComponent;
