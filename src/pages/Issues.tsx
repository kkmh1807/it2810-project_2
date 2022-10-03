import { Issue } from '../types/models';
import useGitlabData from '../hooks/useGitlabData';
import useLocalStorage from '../hooks/useLocalStorage';
import { useApiContext } from '../context/ApiContext';
import { urlToGitlab } from '../utils/utils';
import Selector from '../components/Selector';
import '../styles/Issues.css';
import Loader from '../components/Loader';
import ErrorComponent from '../components/ErrorComponent';

const endpoint = '/issues/';

function Issues() {
  const linkData = useApiContext();
  const [filter, setFilter] = useLocalStorage('current-issue', 'All issues');

  const { data, isLoading, isError } = useGitlabData<Issue[]>(endpoint);

  const states = ['All issues', ...Array.from(new Set(data?.map((issue) => issue.state)))];
  const filteredData = filter === 'All issues' ? data : data?.filter((issue) => issue.state === filter);

  if (isLoading) return <Loader />;

  if (isError) return <ErrorComponent />;

  return (
    <div className="issues-container">
      <Selector value={filter} setValue={setFilter} values={states} />
      {filteredData?.length ? (
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
        ))
      ) : (
        <div>No issues found for this repository</div>
      )}
    </div>
  );
}

export default Issues;
