import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

import dayjs from 'dayjs';
import {Button, Form} from 'react-bootstrap';
import {toast, ToastContainer} from 'react-toastify';

const MyEditor = dynamic(() => import('@/components/CustomEditor'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
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

import {ROUTE_POST} from '@/routes';
import {useLoadingStore} from '@/store/loading';

interface Props {
  id?: string;
}

export const WriteForm = (props: Props) => {
  const {id} = props;

  const {showLoading, hideLoading} = useLoadingStore();
  const router = useRouter();

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
    contactMethod: '',
    link: '',
  });
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      (async () => {
        const post = await postAPI.getPostById(id);
        setWriteData({
          title: post.title,
          content: post.content,
          type: post.type,
          capacity: post.capacity,
          mode: post.mode,
          duration: post.duration,
          techStack: post.techStack,
          recruitmentPosition: post.recruitmentPosition,
          deadLine: post.deadLine,
          contactMethod: post.contactMethod,
          link: post.link,
        });
      })();
    } else {
      setWriteData({
        title: '',
        content: '',
        type: 'project',
        capacity: '인원 미정',
        mode: 'all',
        duration: '기간 미정',
        techStack: JSON.stringify([]),
        recruitmentPosition: '',
        deadLine: dayjs().format('YYYY-MM-DD').toString(),
        contactMethod: '카카오톡',
        link: '',
      });
      setContent('');
    }
  }, [id]);

  const getErrorMessage = (data: WritePostData) => {
    if (!JSON.parse(data.techStack).length) {
      return '기술 스택을 선택해주세요.';
    }
    if (!data.recruitmentPosition) {
      return '모집 포지션을 선택해주세요.';
    }
    if (!data.link) {
      return '링크를 입력해주세요.';
    }
    if (!data.title) {
      return '제목을 입력해주세요.';
    }
    return '게시글 정보를 확인해주세요.';
  };

  const onChange = (key: string, value?: string) => {
    setWriteData({
      ...writeData,
      [key]: value,
    });
  };

  const onChangeContent = (value: string) => {
    setContent(value || '');
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      showLoading();
      const form = event.currentTarget;
      if (form.checkValidity()) {
        setValidated(true);
        if (id) {
          const res = await postAPI.modifyPost(Number(id), {
            ...writeData,
            content,
          });
          router.push({
            pathname: `${ROUTE_POST}`,
            query: {
              id: res,
            },
          });
        } else {
          const res = await postAPI.writePost({...writeData, content});
          router.push({
            pathname: `${ROUTE_POST}`,
            query: {
              id: res,
            },
          });
        }
      } else {
        const message = getErrorMessage(writeData);
        toast.error(message);
        setValidated(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
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
                value={{
                  label: WRITE_TYPE.find(x => x.value === writeData.type)
                    ?.label,
                  value: writeData.type,
                }}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>모집 인원</Form.Label>
              <CustomSelect
                placeholder="인원 미정 ~ 10명 이상"
                options={WRITE_CAPACITY}
                onChange={e => onChange('capacity', e?.value)}
                value={{label: writeData.capacity, value: writeData.capacity}}
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
                value={{
                  label: WRITE_MODE.find(x => x.value === writeData.mode)
                    ?.label,
                  value: writeData.mode,
                }}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>진행 기간</Form.Label>
              <CustomSelect
                placeholder="기간 미정 ~ 6개월 이상"
                options={WRITE_DURATION}
                onChange={e => onChange('duration', e?.value)}
                value={{label: writeData.duration, value: writeData.duration}}
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
                value={JSON.parse(writeData.techStack || '[]').map(
                  (x: string) => ({
                    label: STACKS.find(stack => stack.value === x)?.label,
                    value: x,
                  }),
                )}
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
                value={JSON.parse(writeData.recruitmentPosition || '[]').map(
                  (x: string) => ({
                    label: POSITIONS.find(position => position.value === x)
                      ?.label,
                    value: x,
                  }),
                )}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>연락 방법</Form.Label>
              <CustomSelect
                placeholder="연락방법을 선택해주세요."
                options={WRITE_CONTACT}
                onChange={e => onChange('contactMethod', e?.value)}
                value={{
                  label: writeData.contactMethod,
                  value: writeData.contactMethod,
                }}
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
                placeholder={
                  writeData.contactMethod === '카카오톡'
                    ? '오픈 카톡방 링크'
                    : writeData.contactMethod === '이메일'
                    ? '이메일 주소'
                    : writeData.contactMethod === '구글 폼'
                    ? '구글 폼 주소'
                    : ''
                }
                value={writeData.link}
                required
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
              value={writeData.title}
              placeholder="제목을 입력해주세요."
              required
            />
          </Form.Group>
          <MyEditor onChange={onChangeContent} content={writeData.content} />
        </section>

        <div className="btn-wrapper">
          <Button variant="secondary" onClick={() => router.back()}>
            취소
          </Button>
          <Button type="submit">글 등록</Button>
        </div>
      </StyledForm>
      <ToastContainer />
    </Wrapper>
  );
};
