import DatePicker from 'react-datepicker';
import {ko} from 'date-fns/locale';

import {Wrapper} from './style';

import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  selected: Date;
  onChange: (date: Date) => void;
}

export const CustomDatePicker = (props: Props) => {
  const {selected, onChange} = props;
  return (
    <Wrapper>
      <DatePicker
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={selected}
        onChange={onChange}
      />
    </Wrapper>
  );
};
