/* eslint-disable prettier/prettier */
import { ApiContextType } from '../context/ApiContext';

export function urlToGitlab(linkData: ApiContextType, endpoint: string, Id: string) {
  return `${linkData.url}/${decodeURIComponent(linkData.repo)}/-${endpoint}${Id}`;
}
