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
