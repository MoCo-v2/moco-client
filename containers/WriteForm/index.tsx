import React, {useRef, useState} from 'react';
import dynamic from 'next/dynamic';

import dayjs from 'dayjs';
import {Button, Form} from 'react-bootstrap';
import {Editor} from '@toast-ui/react-editor';

const MyEditor = dynamic(() => import('@/components/CustomEditor'), {
  ssr: false,
});

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

import {postAPI, WritePostData} from '@/modules';

import {Wrapper, StyledForm} from './style';

interface Props {}

export const WriteForm = (props: Props) => {
  const {} = props;

  const [validated, setValidated] = useState(false);
  const [writeData, setWriteData] = useState<WritePostData>({
    title: '',
    content: '',
    type: '',
    capacity: '',
    mode: '',
    duration: '',
    techStack: JSON.stringify([]),
    recruitmentPosition: '',
    deadLine: dayjs().format('YYYY-MM-DD').toString(),
    contact_method: '',
    link: '',
  });

  const editorRef = useRef<Editor>(null);

  const onChange = (key: string, value?: string) => {
    setWriteData({
      ...writeData,
      [key]: value,
    });
  };

  const onChangeContent = () => {
    const data = editorRef.current?.getInstance().getHTML();
    setWriteData({
      ...writeData,
      content: data || '',
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity()) {
        setValidated(true);
        await postAPI.writePost(writeData);
        alert(
          '게시글 작성 완료! TODO:: 팝업 컴포넌트로 변경 및 상세 페이지로 이동',
        );
      } else {
        alert('필수값 누락! TODO:: 팝업 컴포넌트로 변경');
        setValidated(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <StyledForm onSubmit={onSubmit} noValidate validated={validated}>
        <section>
          <SectionTitle number={1} title="프로젝트 기본 정보를 입력해주세요." />
          <div className="flex-box">
            <Form.Group>
              <Form.Label>모집 유형</Form.Label>
              <CustomSelect
                placeholder="프로젝트 | 모각코 | 스터디 | 과외"
                options={WRITE_TYPE}
                onChange={e => onChange('type', e?.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>모집 인원</Form.Label>
              <CustomSelect
                placeholder="인원 미정 ~ 10명 이상"
                options={WRITE_CAPACITY}
                onChange={e => onChange('capacity', e?.value)}
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
                onChange={e => onChange('mode', e?.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>진행 기간</Form.Label>
              <CustomSelect
                placeholder="기간 미정 ~ 6개월 이상"
                options={WRITE_DURATION}
                onChange={e => onChange('duration', e?.value)}
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
                onChange={e =>
                  onChange(
                    'techStack',
                    JSON.stringify(e.map((x: {value: string}) => x.value)),
                  )
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>모집 마감일</Form.Label>
              <CustomDatePicker
                selected={dayjs(writeData.deadLine).toDate()}
                onChange={date =>
                  onChange(
                    'deadLine',
                    dayjs(date).format('YYYY-MM-DD').toString(),
                  )
                }
              />
            </Form.Group>
          </div>
          <div className="flex-box">
            <Form.Group>
              <Form.Label>모집 포지션</Form.Label>
              <CustomSelect
                isMulti
                placeholder="프론트엔드, 백엔드..."
                options={POSITIONS}
                onChange={e =>
                  onChange(
                    'recruitmentPosition',
                    JSON.stringify(e.map((x: {value: string}) => x.value)),
                  )
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>연락 방법</Form.Label>
              <CustomSelect
                placeholder="연락방법을 선택해주세요."
                options={WRITE_CONTACT}
                onChange={e => onChange('contact_method', e?.value)}
                required
              />
            </Form.Group>
          </div>
          <div className="flex-box">
            <div />
            <Form.Group>
              <Form.Label>링크</Form.Label>
              <Form.Control
                onChange={e => onChange('link', e.target.value)}
                placeholder="TODO:: 연락 방법에 따른 placeholder 추가"
              />
            </Form.Group>
          </div>
        </section>
        <section>
          <SectionTitle number={2} title="프로젝트에 대해 소개해주세요." />
          <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control
              onChange={e => onChange('title', e.target.value)}
              placeholder="제목을 입력해주세요."
              required
            />
          </Form.Group>
          <MyEditor editorRef={editorRef} onChange={onChangeContent} />
        </section>
        <div className="btn-wrapper">
          <Button variant="secondary">취소</Button>
          <Button type="submit">글 등록</Button>
        </div>
      </StyledForm>
    </Wrapper>
  );
};
