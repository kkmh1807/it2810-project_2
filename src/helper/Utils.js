/* eslint-disable prettier/prettier */

export function urlToGitlab(linkData, endpoint, Id) {
    return `${linkData.url}/${decodeURIComponent(linkData.repo)}/-${endpoint}${Id}`;
}