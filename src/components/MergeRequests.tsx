import { MR } from '../types/models';
import useGitlabData from '../hooks/useGitlabData';
import '../styles/MergeRequest.css';
import { urlToGitlab } from '../helper/Utils';
import { useApiContext } from '../context/ApiContext';
import Loader from './Loader';

const endpoint = '/merge_requests/';

function MergeRequests() {
  const linkdata = useApiContext();

  const { data, isLoading, isError } = useGitlabData<MR[]>(endpoint);

  if (isLoading) return <Loader />;

  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="Container">
      {data?.length ? (
        data.map((mr, i) => (
          <a className="mrContainer" key={i} href={urlToGitlab(linkdata, endpoint, mr.iid.toString())} rel="noreferrer" target="_blank">
            <div className="mr">
              <h1>{mr.title}</h1>
              <p>{mr.source_branch}</p>
              <p id="author">{mr.author?.name}</p>
            </div>
          </a>
        ))
      ) : (
        <div>No merge requests were found for this repository</div>
      )}
    </div>
  );
}

export default MergeRequests;
