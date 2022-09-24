import React from 'react';

interface SelectorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  values: any[];
}

class Selector extends React.Component<SelectorProps> {
  render() {
    const { value = '' } = this.props;
    const { setValue } = this.props;
    const { values } = this.props;
    return (
      <select className="select" value={value} defaultValue={value} onChange={(e) => setValue(e.target.value)}>
        {values.map((value, i) => (
          <option key={i} value={value}>
            {value}
          </option>
        ))}
      </select>
    );
  }
}

export default Selector;
