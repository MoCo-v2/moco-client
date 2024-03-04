import {ChangeEvent, useEffect, useState} from 'react';
import {deleteCookie} from 'cookies-next';
import {signOut} from 'next-auth/react';

import {Form, Button} from 'react-bootstrap';
import {ToastContainer, toast} from 'react-toastify';

import {ConfirmModal, CustomSelect} from '@/components';

import {ResponseUser, authAPI, imageAPI} from '@/modules';
import {useUser} from '@/hooks/useUser';

import {CAREERS, POSITIONS, STACKS} from '@/consts';

import {useLoadingStore} from '@/store/loading';

import {StyledForm, Wrapper} from './style';

export const ProfileForm = () => {
  const {user, mutation} = useUser();
  const {showLoading, hideLoading} = useLoadingStore();

  const [validated, setValidated] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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
      if (form.checkValidity()) {
        if (user?.name !== tempUser.name) {
          await authAPI.checkNickName(tempUser.name);
        }
        setValidated(true);
        await authAPI.updateUser(tempUser);
        mutation.mutate();
        toast.success('프로필이 저장되었습니다.');
      } else {
        if (form.reportValidity) form.reportValidity();
        setValidated(false);
      }
    } catch (error: any) {
      let message = '프로필 저장에 실패했습니다.';
      if (error?.response?.data?.message || error?.response?.data?.msg) {
        message = error.response.data.message || error.response.data.msg;
      }
      toast.error(message);
    } finally {
      hideLoading();
    }
  };

  const onDeleteUser = async () => {
    try {
      showLoading();
      await authAPI.deleteUser();
      toast.success('회원탈퇴가 완료되었습니다.');
      deleteCookie('moco_asct');
      deleteCookie('moco_rsct');
      await signOut();
    } catch (error) {
      console.log(error);
      toast.error('회원탈퇴에 실패했습니다.');
    } finally {
      hideLoading();
      setShowConfirmModal(false);
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
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileUpload}
          />
          <div className="user-intro">
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
              <Form.Label>소개</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder={`안녕하세요. ${tempUser.name}입니다.`}
                onChange={e => onChange('intro', e.target.value)}
                value={tempUser.intro}
              />
            </Form.Group>
          </div>
        </div>
        <div className="flex-box">
          <Form.Group>
            <Form.Label className="required">직군</Form.Label>
            <CustomSelect
              placeholder="직군를 선택해주세요."
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
        </div>
        <Form.Group>
          <Form.Label className="required">툴 / 언어</Form.Label>
          <CustomSelect
            isMulti
            placeholder="툴 / 언어을 선택해주세요."
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
          <Button type="submit">저장</Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShowConfirmModal(true);
            }}
          >
            회원탈퇴
          </Button>
        </div>
      </StyledForm>
      <ToastContainer />
      <ConfirmModal
        show={showConfirmModal}
        onHide={() => {
          setShowConfirmModal(false);
        }}
        onOk={onDeleteUser}
      >
        <div>탈퇴하시겠습니까?</div>
      </ConfirmModal>
    </Wrapper>
  );
};
