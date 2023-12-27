import {useRef, useState} from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import {Button, Form} from 'react-bootstrap';
import {Editor} from '@toast-ui/react-editor';

const MyEditor = dynamic(() => import('@/components/CustomEditor'), {
  ssr: false,
});

import {Wrapper, StyledForm} from './style';

import {CustomDatePicker, CustomSelect, SectionTitle} from '@/components';
import {
  POSITIONS,
  STACKS,
  WRITE_CAPACITY,
  WRITE_CONTACT,
  WRITE_DURATION,
  WRITE_MODE,
  WRITE_TYPE,
} from '@/consts';

interface Props {}

export const WriteForm = (props: Props) => {
  const {} = props;
  const [deadLine, setDeadLine] = useState<Date>(new Date());

  const editorRef = useRef<Editor>(null);

  const onChange = () => {
    const data = editorRef.current?.getInstance().getHTML();
    console.log(data);
  };

  return (
    <Wrapper>
      <StyledForm>
        <section>
          <SectionTitle number={1} title="프로젝트 기본 정보를 입력해주세요." />
          <div className="flex-box">
            <Form.Group>
              <Form.Label>모집 유형</Form.Label>
              <CustomSelect
                placeholder="프로젝트 | 모각코 | 스터디 | 과외"
                options={WRITE_TYPE}
                onChange={e => {}}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>모집 인원</Form.Label>
              <CustomSelect
                placeholder="인원 미정 ~ 10명 이상"
                options={WRITE_CAPACITY}
                onChange={e => {}}
                required
              />
            </Form.Group>
          </div>
          <div className="flex-box">
            <Form.Group>
              <Form.Label>진행 방식</Form.Label>
              <CustomSelect
                placeholder="전체 | 온라인 | 오프라인"
                options={WRITE_MODE}
                onChange={e => {}}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>진행 기간</Form.Label>
              <CustomSelect
                placeholder="기간 미정 ~ 6개월 이상"
                options={WRITE_DURATION}
                onChange={e => {}}
                required
              />
            </Form.Group>
          </div>
          <div className="flex-box">
            <Form.Group>
              <Form.Label>기술 스택</Form.Label>
              <CustomSelect
                isMulti
                placeholder="프로젝트 사용 스택"
                options={STACKS}
                onChange={e => {}}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>모집 마감일</Form.Label>
              <CustomDatePicker
                selected={deadLine}
                onChange={date => setDeadLine(date)}
              />
            </Form.Group>
          </div>
          <div className="flex-box">
            <Form.Group>
              <Form.Label>모집 포지션</Form.Label>
              <CustomSelect
                placeholder="프론트엔드, 백엔드..."
                options={POSITIONS}
                onChange={e => {}}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>연락 방법</Form.Label>
              <CustomSelect
                placeholder="연락방법을 선택해주세요."
                options={WRITE_CONTACT}
                onChange={e => {}}
                required
              />
            </Form.Group>
          </div>
          <div className="flex-box">
            <div />
            <Form.Group>
              <Form.Label>링크</Form.Label>
              <Form.Control
                placeholder="TODO:: 연락 방법에 따른 placeholder 추가"
                required
              />
            </Form.Group>
          </div>
        </section>
        <section>
          <SectionTitle number={2} title="프로젝트에 대해 소개해주세요." />
          <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control placeholder="제목을 입력해주세요." required />
          </Form.Group>
          <MyEditor editorRef={editorRef} onChange={onChange} />
        </section>
        <div className="btn-wrapper">
          <Button variant="secondary">취소</Button>
          <Button>글 등록</Button>
        </div>
      </StyledForm>
    </Wrapper>
  );
};
