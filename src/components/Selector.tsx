import React from 'react';
import '../styles/Selector.css';

interface SelectorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>> | ((val: string) => void);
  values: string[];
}

class Selector extends React.Component<SelectorProps> {
  render() {
    const { value = '' } = this.props;
    const { setValue } = this.props;
    const { values } = this.props;
    return (
      <select className="select" value={value} onChange={(e) => setValue(e.target.value)}>
        {values.map((value, i) => (
          <option key={i} value={value}>
            {value.length > 15 ? value.substring(0, 20) + '...' : value}
          </option>
        ))}
      </select>
    );
  }
}

export default Selector;
