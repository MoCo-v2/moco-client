import React, {useState} from 'react';
import {signOut} from 'next-auth/react';

import {Form, Button} from 'react-bootstrap';
import {Confetti} from '@neoconfetti/react';

import {StyledForm, StyledModalBody, Wrapper} from './style';

import {useLoadingStore} from '@/store/loading';
import {authAPI, SignUpData} from '@/modules';
import {CAREERS, POSITIONS, STACKS} from '@/consts';

import {CustomSelect, Modal} from '@/components';

interface Props {
  id: string;
  name?: string;
  picture?: string;
}

export const SignUpForm = (props: Props) => {
  const {id, name: defaultName, picture} = props;

  const {showLoading, hideLoading} = useLoadingStore();

  const [validated, setValidated] = useState(false);
  const [signUpData, setSignUpData] = useState<SignUpData>({
    id,
    name: defaultName || '',
    position: '',
    career: '',
    stack: JSON.stringify([]),
    picture: picture || '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      showLoading();
      const form = event.currentTarget;
      if (form.checkValidity()) {
        setValidated(true);
        await authAPI.userSignUp(signUpData);
        setShowSuccessModal(true);
      } else {
        setValidated(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  const onChange = (key: string, value?: string) => {
    setSignUpData({
      ...signUpData,
      [key]: value,
    });
  };

  const onClickLogIn = async () => {
    await signOut();
    setShowSuccessModal(false);
  };

  return (
    <Wrapper>
      {showSuccessModal && <Confetti />}
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
            <CustomSelect
              placeholder="직무를 선택해주세요."
              options={POSITIONS}
              onChange={e => onChange('position', e?.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>경력</Form.Label>
            <CustomSelect
              placeholder="경력을 선택해주세요."
              options={CAREERS}
              onChange={e => onChange('career', e?.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>관심 스택</Form.Label>
            <CustomSelect
              isMulti
              placeholder="관심 스택을 선택해주세요."
              options={STACKS}
              onChange={e =>
                onChange(
                  'stack',
                  JSON.stringify(e.map((x: {value: string}) => x.value)),
                )
              }
              required
            />
          </Form.Group>
          <Button type="submit">회원가입</Button>
        </StyledForm>
      </div>
      <Modal show={showSuccessModal} onHide={onClickLogIn}>
        <StyledModalBody>
          회원가입을 축하드립니다.🎉
          <br />
          로그인 후 팀원을 모집해 보세요!
          <Button onClick={onClickLogIn}>팀원 모집하기</Button>
        </StyledModalBody>
      </Modal>
    </Wrapper>
  );
};
