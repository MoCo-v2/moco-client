import React, {useState} from 'react';
import {useRouter} from 'next/router';

import {Form, Button} from 'react-bootstrap';
import Select from 'react-select';

import {StyledForm, Wrapper} from './style';

import {authAPI, SignUpData} from '@/modules';
import {CAREERS, POSITIONS, STACKS} from '@/consts';

interface Props {
  id: string;
  name?: string;
  picture?: string;
}

export const SignUpForm = (props: Props) => {
  const {id, name: defaultName, picture} = props;

  const router = useRouter();

  const [validated, setValidated] = useState(false);
  const [signUpData, setSignUpData] = useState<SignUpData>({
    id,
    name: defaultName || '',
    position: '',
    career: '',
    stack: JSON.stringify([]),
    picture: picture || '',
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      event.stopPropagation();
      const form = event.currentTarget;
      if (form.checkValidity()) {
        await authAPI.userSignUp(signUpData);
        alert('회원가입완료!');
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setValidated(true);
    }
  };

  const onChange = (key: string, value?: string) => {
    setSignUpData({
      ...signUpData,
      [key]: value,
    });
  };

  return (
    <Wrapper>
      <div className="content">
        <div className="title">회원가입</div>
        <StyledForm onSubmit={onSubmit} noValidate validated={validated}>
          <Form.Group>
            <Form.Label>닉네임</Form.Label>
            <Form.Control
              value={signUpData.name}
              onChange={e => onChange('name', e.target.value)}
              placeholder="닉네임을 입력해주세요."
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>직무</Form.Label>
            <Select
              placeholder="직무를 선택해주세요."
              options={POSITIONS}
              onChange={e => onChange('position', e?.value)}
              required
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
          </Form.Group>
          <Form.Group>
            <Form.Label>경력</Form.Label>
            <Select
              placeholder="경력을 선택해주세요."
              options={CAREERS}
              onChange={e => onChange('career', e?.value)}
              required
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
          </Form.Group>
          <Form.Group>
            <Form.Label>관심 스택</Form.Label>
            <Select
              isMulti
              placeholder="관심 스택을 선택해주세요."
              options={STACKS}
              onChange={e =>
                onChange('stack', JSON.stringify(e.map(x => x.value)))
              }
              required
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
          </Form.Group>
          <Button type="submit">회원가입</Button>
        </StyledForm>
      </div>
    </Wrapper>
  );
};
