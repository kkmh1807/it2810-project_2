import { ApiContextType } from '../context/ApiContext';

// Create external link to gitlab.
export function urlToGitlab(linkData: ApiContextType, endpoint: string, Id: string) {
  return `${linkData.url}/${decodeURIComponent(linkData.repo)}/-${endpoint}${Id}`;
}

// Generate random hex-colors for a pretty pieChart.
export function generateColor(num: number) {
  const newColor = () => Math.floor(Math.random() * 16777215).toString(16);

  if (num > 1) {
    const colorArray = [];
    for (let i = 0; i < num; i++) {
      let color = '#' + newColor();
      while (colorArray.indexOf(color) > -1) {
        color = newColor();
      }
      colorArray.push(color);
    }
    return colorArray;
  } else {
    return '#' + newColor();
  }
}
