import {Wrapper} from './style';

interface Props {
  name: string;
  items: {
    name: string;
    desc: string;
    value: string;
  }[];
  checked?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const CustomRadioButton = (props: Props) => {
  const {items, name, checked, onChange, required} = props;

  return (
    <Wrapper className="custom-radio-wrapper">
      {items.map((item, index) => (
        <label key={index} className="item-label">
          <input
            className="item-input"
            type="radio"
            name={name}
            value={item.value}
            checked={checked === item.value}
            onChange={onChange}
            required={required}
          />
          <div className="item-info">
            <div className="item-name">{item.name}</div>
            <div className="item-desc">{item.desc}</div>
          </div>
        </label>
      ))}
    </Wrapper>
  );
};
