import {CustomSelect} from '@/components';

import {POSITIONS, STACKS, WRITE_MODE, WRITE_TYPE} from '@/consts';

import {Wrapper} from './style';

interface Props {
  filter: {
    offset: number;
    limit: number;
    recruit?: boolean;
    type?: string;
    position?: string;
    mode?: string;
    language?: string;
  };
  setFilter: (filter: {
    offset: number;
    limit: number;
    recruit?: boolean;
    type?: string;
    position?: string;
    mode?: string;
    language?: string;
  }) => void;
}

export const SearchBox = (props: Props) => {
  const {filter, setFilter} = props;

  const onChange = (key: string, value?: string) => {
    setFilter({
      ...filter,
      offset: 0,
      [key]: value,
    });
  };

  const onClickReset = () => {
    setFilter({
      offset: 0,
      limit: 10,
      recruit: false,
      type: 'all',
      position: 'all',
      mode: 'all',
      language: undefined,
    });
  };

  return (
    <Wrapper>
      <div className="title">
        🔍 검색
        <span className="reset-btn" onClick={onClickReset}>
          초기화
        </span>
      </div>
      <CustomSelect
        placeholder="모집 유형"
        options={[{label: '전체', value: 'all'}, ...WRITE_TYPE]}
        onChange={e => onChange('type', e?.value)}
        value={{
          label:
            WRITE_TYPE.find(type => type.value === filter.type)?.label ||
            '전체',
          value: filter.type,
        }}
      />
      <CustomSelect
        placeholder="모집 포지션"
        options={[{label: '전체', value: 'all'}, ...POSITIONS]}
        onChange={e => onChange('position', e?.value)}
        value={{
          label:
            POSITIONS.find(position => position.value === filter.position)
              ?.label || '전체',
          value: filter.position,
        }}
      />
      <CustomSelect
        placeholder="진행 방식"
        options={WRITE_MODE}
        onChange={e => onChange('mode', e?.value)}
        value={{
          label:
            WRITE_MODE.find(mode => mode.value === filter.mode)?.label ||
            '전체',
          value: filter.mode,
        }}
      />
      <CustomSelect
        isMulti
        placeholder="프로젝트 사용 스택"
        options={STACKS}
        onChange={e => {
          console.log(e);
          if (e.length === 0) {
            onChange('language', undefined);
          } else {
            onChange(
              'language',
              JSON.stringify(e.map((x: {value: string}) => x.value)),
            );
          }
        }}
        value={JSON.parse(filter.language || '[]').map((x: string) => ({
          label: STACKS.find(language => language.value === x)?.label,
          value: x,
        }))}
      />
    </Wrapper>
  );
};
