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

import {
  CustomDatePicker,
  CustomRadioButton,
  CustomSelect,
  SectionTitle,
} from '@/components';
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
        capacity: '1명',
        mode: 'all',
        duration: '기간 없음',
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
    if (!data.recruitmentPosition) {
      return '모집 직군을 선택해주세요.';
    }
    if (!JSON.parse(data.techStack).length) {
      return '툴 / 언어을 선택해주세요.';
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
          <SectionTitle title="📚 모집 기본 정보" />
          <Form.Group>
            <Form.Label>모집 유형</Form.Label>
            <CustomRadioButton
              name="type"
              items={WRITE_TYPE.map(x => ({
                name: x.label,
                desc: x.desc,
                value: x.value,
              }))}
              onChange={e => onChange('type', e.target.value)}
              checked={writeData.type}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>진행 방식</Form.Label>
            <CustomRadioButton
              name="mode"
              items={WRITE_MODE.map(x => ({
                name: x.label,
                desc: x.desc,
                value: x.value,
              }))}
              onChange={e => onChange('mode', e.target.value)}
              checked={writeData.mode}
              required
            />
          </Form.Group>
          <div className="flex-box">
            <Form.Group>
              <Form.Label>모집 인원</Form.Label>
              <CustomSelect
                placeholder="1명 ~ 6명 이상"
                options={WRITE_CAPACITY}
                onChange={e => onChange('capacity', e?.value)}
                value={{label: writeData.capacity, value: writeData.capacity}}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                {WRITE_TYPE.find(x => x.value === writeData.type)?.label ||
                  '프로젝트'}{' '}
                기간
              </Form.Label>
              <CustomSelect
                placeholder="기간 없음 ~ 6개월 이상"
                options={WRITE_DURATION}
                onChange={e => onChange('duration', e?.value)}
                value={{label: writeData.duration, value: writeData.duration}}
                required
              />
            </Form.Group>
          </div>
          <div className="flex-box">
            <Form.Group>
              <Form.Label>모집 직군</Form.Label>
              <CustomSelect
                isMulti
                placeholder="직군을 선택해주세요."
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
              <Form.Label>툴 / 언어</Form.Label>
              <CustomSelect
                isMulti
                placeholder="프로젝트 사용 툴 / 언어"
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
          </div>
          <Form.Group>
            <Form.Label>연락 방법</Form.Label>
            <CustomRadioButton
              name="contactMethod"
              items={WRITE_CONTACT.map(x => ({
                name: x.label,
                desc: x.desc,
                value: x.value,
              }))}
              onChange={e => onChange('contactMethod', e.target.value)}
              checked={writeData.contactMethod}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>링크</Form.Label>
            <Form.Control
              onChange={e => onChange('link', e.target.value)}
              placeholder={
                writeData.contactMethod === '카카오톡'
                  ? '카카오톡 링크'
                  : writeData.contactMethod === '이메일'
                  ? '이메일'
                  : writeData.contactMethod === '구글 폼'
                  ? '구글 폼 링크'
                  : ''
              }
              value={writeData.link}
            />
          </Form.Group>
        </section>
        <section>
          <SectionTitle title="📢 프로젝트 소개" />
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
