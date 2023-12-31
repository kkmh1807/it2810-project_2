import React, { FC, ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo_text.svg';
import { useApiContext } from '../context/ApiContext';
import ambourgar from '../assets/icons/ambourgar.svg';
import xMark from '../assets/icons/x-mark.svg';
import RedirectIcon from '../assets/icons/redirectIcon.svg';
import '../styles/Navigation.css';

interface NavigationProps {
  children: ReactNode;
}

const routesMap: Record<string, string> = {
  '/overview': 'Overview',
  '/mergerequests': 'Merge requests',
  '/commits': 'Commits',
  '/issues': 'Issues'
};

const Navigation: FC<NavigationProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { repo } = useApiContext();

  // Project name is the last string in the repo path
  const projectName = decodeURIComponent(repo).split('/').pop() as string;

  const [showTabs, setShowTabs] = useState(false);

  const goToLandingPage = () => {
    navigate('/');
  };

  const LinkData = useApiContext();

  const generateGitlabUrl = () => {
    return `${LinkData.url}/${decodeURIComponent(LinkData.repo)}`;
  };

  return (
    <main className="navigation">
      <header className="page-header">
        <div>
          <img onClick={goToLandingPage} src={Logo} />
          <Link to="/">Change repository</Link>
        </div>
        <div className="project-title-group">
          <h1 id="project-title">{projectName}</h1>
          <a rel="noreferrer" target="_blank" href={generateGitlabUrl()}>
            Go to gitlab
            <img src={RedirectIcon} id="icon" />
          </a>
        </div>
        <div></div>
      </header>
      <section className="tab-view">
        <div className={`current-tab ${showTabs ? 'open' : ''}`}>
          <span>{routesMap[location.pathname]}</span>
          <img src={showTabs ? xMark : ambourgar} onClick={() => setShowTabs(!showTabs)} />
        </div>
        <div className={`tab-list ${showTabs ? 'shown' : ''}`}>
          <Link
            to="/overview"
            onClick={() => setShowTabs(false)}
            className={`tab-link ${location.pathname === '/overview' ? 'active' : ''}`}
          >
            Overview
          </Link>
          <Link to="/commits" onClick={() => setShowTabs(false)} className={`tab-link ${location.pathname === '/commits' ? 'active' : ''}`}>
            Commits
          </Link>
          <Link
            to="/mergerequests"
            onClick={() => setShowTabs(false)}
            className={`tab-link ${location.pathname === '/mergerequests' ? 'active' : ''}`}
          >
            Merge requests
          </Link>
          <Link to="/issues" onClick={() => setShowTabs(false)} className={`tab-link ${location.pathname === '/issues' ? 'active' : ''}`}>
            Issues
          </Link>
        </div>
        <div className="navigation-content">{children}</div>
      </section>
    </main>
  );
};

export default Navigation;
