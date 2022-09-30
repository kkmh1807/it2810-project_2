import { Issue } from '../types/models';
import useGitlabData from '../hooks/useGitlabData';
import useLocalStorage from '../hooks/useLocalStorage';
import { useApiContext } from '../context/ApiContext';
import { urlToGitlab } from '../helper/Utils';
import Selector from './Selector';
import '../styles/Issues.css';

function Issues() {
  const { data } = useGitlabData<Issue[]>('/issues');
  const linkData = useApiContext();
  const endpoint = '/issues/';
  const [filter, setFilter] = useLocalStorage('current-issue', 'All issues');
  const states = ['All issues', ...Array.from(new Set(data?.map((issue) => issue.state)))];

  const filteredData = filter === 'All issues' ? data : data?.filter((issue) => issue.state === filter);

  return (
    <div className="issues-container">
      <Selector value={filter} setValue={setFilter} values={states} />
      {filteredData &&
        filteredData.map((issues, i) => (
          <a key={i} href={urlToGitlab(linkData, endpoint, issues.iid.toString())} target="_blank" rel="noreferrer">
            <div key={i} className="issues-card">
              <h1>{issues.title}</h1>
              <h2>{issues.state}</h2>
              <p>
                {issues.assignees?.length === 0 ? <></> : 'Assignee: ' + issues.assignee?.username}
                <br />
                {'Author: ' + issues.author.username}
              </p>
            </div>
          </a>
        ))}
    </div>
  );
}

export default Issues;
