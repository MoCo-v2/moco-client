import {CustomSelect} from '@/components';

import {POSITIONS, STACKS, WRITE_MODE, WRITE_TYPE} from '@/consts';

import {Wrapper} from './style';

interface Props {}

export const SearchBox = (props: Props) => {
  return (
    <Wrapper>
      <div className="title">🔍 검색</div>
      <CustomSelect
        placeholder="모집 유형"
        options={WRITE_TYPE}
        onChange={e => {}}
      />
      <CustomSelect
        placeholder="모집 포지션"
        options={POSITIONS}
        onChange={e => {}}
      />
      <CustomSelect
        placeholder="진행 방식"
        options={WRITE_MODE}
        onChange={e => {}}
      />
      <CustomSelect
        isMulti
        placeholder="프로젝트 사용 스택"
        options={STACKS}
        onChange={e => {}}
      />
    </Wrapper>
  );
};
