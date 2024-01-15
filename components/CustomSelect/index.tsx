import Select, {Props as SelectProps} from 'react-select';

interface Props extends SelectProps {
  onChange: (e: any) => void;
}

export const CustomSelect = (props: Props) => {
  const {
    placeholder,
    options,
    onChange,
    required,
    isMulti,
    defaultValue,
    value,
  } = props;
  return (
    <Select
      isMulti={isMulti}
      placeholder={placeholder}
      options={options}
      onChange={onChange}
      required={required}
      defaultValue={defaultValue}
      value={value}
      styles={{
        control: styles => ({
          ...styles,
          fontSize: '1.6rem',
          minHeight: '5rem',
          border: '1px solid #dce1e6',
          borderRadius: '0.6rem',
        }),
        menu: styles => ({
          ...styles,
          fontSize: '1.6rem',
        }),
      }}
    />
  );
};
