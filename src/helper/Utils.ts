/* eslint-disable prettier/prettier */

export function urlToGitlab(linkData: any, endpoint: string, Id: string) {
  return `${linkData.url}/${decodeURIComponent(linkData.repo)}/-${endpoint}${Id}`;
}
