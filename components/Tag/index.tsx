import {StyledTag} from './style';

interface Props {
  tag: string;
  onClick?: () => void;
}

export const Tag = (props: Props) => {
  const {tag, onClick} = props;

  return (
    <StyledTag onClick={onClick} underline={!!onClick}>
      {tag}
    </StyledTag>
  );
};
