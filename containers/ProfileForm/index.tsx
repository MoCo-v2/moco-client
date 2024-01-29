import {ChangeEvent, useEffect, useState} from 'react';

import {Form, Button} from 'react-bootstrap';
import {ToastContainer, toast} from 'react-toastify';

import {CustomSelect} from '@/components';

import {ResponseUser, authAPI, imageAPI} from '@/modules';
import {useUser} from '@/hooks/useUser';

import {CAREERS, POSITIONS, STACKS} from '@/consts';

import {useLoadingStore} from '@/store/loading';

import {StyledForm, Wrapper} from './style';

export const ProfileForm = () => {
  const {user, mutation} = useUser();
  const {showLoading, hideLoading} = useLoadingStore();

  const [validated, setValidated] = useState(false);
  const [tempUser, setTempUser] = useState<ResponseUser>({
    id: '',
    name: '',
    intro: '',
    position: '',
    career: '',
    stack: '',
    picture: '',
  });

  useEffect(() => {
    if (user) {
      setTempUser(user);
    }
  }, [user]);

  const onChange = (key: string, value?: string) => {
    setTempUser({
      ...tempUser,
      [key]: value,
    });
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0] || null;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        showLoading();
        const imageURL = await imageAPI.uploadImage(formData);
        setTempUser({
          ...tempUser,
          picture: imageURL || '',
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      showLoading();
      const form = event.currentTarget;
      if (user?.name !== tempUser.name) {
        await authAPI.checkNickName(tempUser.name);
      }
      if (form.checkValidity()) {
        setValidated(true);
        await authAPI.updateUser(tempUser);
        mutation.mutate();
        toast.success('프로필이 저장되었습니다.');
      } else {
        toast.error('프로필 정보를 확인해주세요.');
        setValidated(false);
      }
    } catch (error) {
      console.log(error);
      if ((error as any)?.response?.data?.msg) {
        toast.error((error as any).response.data.msg);
      } else {
        toast.error('프로필 저장에 실패했습니다.');
      }
    } finally {
      hideLoading();
    }
  };

  if (!user) return null;

  return (
    <Wrapper>
      <StyledForm onSubmit={onSubmit} noValidate validated={validated}>
        <div className="picture-box">
          <label htmlFor="fileInput" id="uploadImage">
            <img src={tempUser.picture} alt="profile" />
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileUpload}
          />
          <div>{user.name}님 환영해요.</div>
        </div>
        <Form.Group>
          <Form.Label className="required">닉네임</Form.Label>
          <Form.Control
            onChange={e => onChange('name', e.target.value)}
            placeholder="닉네임을 입력해주세요."
            value={tempUser.name}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="required">직무</Form.Label>
          <CustomSelect
            placeholder="직무를 선택해주세요."
            options={POSITIONS}
            onChange={e => onChange('position', e?.value)}
            value={{
              label: POSITIONS.find(
                position => position.value === tempUser.position,
              )?.label,
              value: tempUser.position,
            }}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="required">경력</Form.Label>
          <CustomSelect
            placeholder="경력을 선택해주세요."
            options={CAREERS}
            onChange={e => onChange('career', e?.value)}
            value={{label: tempUser.career, value: tempUser.career}}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>자기소개</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder={`안녕하세요. ${tempUser.name}입니다.`}
            onChange={e => onChange('intro', e.target.value)}
            value={tempUser.intro}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="required">관심 스택</Form.Label>
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
            value={JSON.parse(tempUser.stack || '[]').map((x: string) => ({
              label: STACKS.find(stack => stack.value === x)?.label,
              value: x,
            }))}
            required
          />
        </Form.Group>
        <div className="btn-wrapper">
          <Button type="submit">프로필 저장</Button>
          <Button variant="secondary">회원탈퇴</Button>
        </div>
      </StyledForm>
      <ToastContainer />
    </Wrapper>
  );
};
