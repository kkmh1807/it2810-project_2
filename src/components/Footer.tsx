import React from 'react';
import LogoIcon from '../assets/icons/logo.svg';
import '../styles/Footer.css';

//Footer for every page.
const Footer = () => {
  return (
    <div className="footer">
      <img src={LogoIcon} alt="" />
      <p>Copyright gruppe 37 - IT2810</p>
    </div>
  );
};

export default Footer;
