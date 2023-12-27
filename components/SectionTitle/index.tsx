import {Wrapper} from './style';

interface Props {
  number: number;
  title: string;
}

export const SectionTitle = (props: Props) => {
  const {number, title} = props;
  return (
    <Wrapper>
      <div className="section-number">{number}</div>
      <div className="section-title">{title}</div>
    </Wrapper>
  );
};
