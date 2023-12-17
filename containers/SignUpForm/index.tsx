import React, {useState} from 'react';

import {CAREERS, POSITIONS, STACKS} from '@/consts';

import {Form, Button} from 'react-bootstrap';
import Select, {MultiValue, SingleValue} from 'react-select';

import {StyledForm, Wrapper} from './style';

interface Props {
  id: string;
  name?: string;
  picture?: string;
}

interface Option {
  value: string;
  label: string;
}

export const SignUpForm = (props: Props) => {
  const {id, name: defaultName, picture} = props;

  const [name, setName] = useState(defaultName);
  const [postion, setPostion] = useState<SingleValue<Option>>(null);
  const [career, setCareer] = useState<SingleValue<Option>>(null);
  const [stack, setStack] = useState<MultiValue<Option>>([]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log('회원가입!', {
      id,
      name,
      postion: postion?.value,
      career: career?.value,
      stack: JSON.stringify(stack.map(x => x.value)),
      picture,
    });
  };

  return (
    <Wrapper>
      <div className="content">
        <div className="title">회원가입</div>
        <StyledForm onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>닉네임</Form.Label>
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="닉네임을 입력해주세요."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>직무</Form.Label>
            <Select
              placeholder="직무를 선택해주세요."
              options={POSITIONS}
              defaultValue={postion}
              onChange={setPostion}
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
              defaultValue={career}
              onChange={setCareer}
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
              defaultValue={stack}
              onChange={setStack}
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
