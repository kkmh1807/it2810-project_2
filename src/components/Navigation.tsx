import React, { FC, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/images/logo_text.svg';
import { useApiContext } from '../context/ApiContext';
import '../styles/Navigation.css';

interface NavigationProps {
  children: ReactNode;
}

const Navigation: FC<NavigationProps> = ({ children }) => {
  const location = useLocation();
  const { repo } = useApiContext();

  // Project name is the last string in the repo path
  const projectName = decodeURIComponent(repo).split('/').pop() as string;

  return (
    <main className="navigation">
      <header className="page-header">
        <img src={Logo} />
        <h1>{projectName}</h1>
      </header>
      <section className="tab-view">
        <div className="tab-list">
          <Link to="/overview" className={`tab-link ${location.pathname === '/overview' ? 'active' : ''}`}>
            Overview
          </Link>
          <Link to="/commits" className={`tab-link ${location.pathname === '/commits' ? 'active' : ''}`}>
            Commits
          </Link>
          <Link to="/mergerequests" className={`tab-link ${location.pathname === '/mergerequests' ? 'active' : ''}`}>
            Merge requests
          </Link>
          <Link to="/issues" className={`tab-link ${location.pathname === '/issues' ? 'active' : ''}`}>
            Issues
          </Link>
        </div>
        <div className="navigation-content">{children}</div>
      </section>
    </main>
  );
};

export default Navigation;
