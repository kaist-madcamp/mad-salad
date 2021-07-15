import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import Button from '../components/auth/Button';
import Separator from '../components/auth/Separator';
import BottomBox from '../components/auth/BottomBox';
import FormError, { SFormError } from '../components/auth/FormError';
import PageTitle from '../components/PageTitle';
import routes from '../routes';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useLogin';
import useDarkMode from '../hooks/useDarkmode';

interface LoginFormField {
  username: string;
  password: string;
  result: string;
}

interface LocationState {
  username: string;
  password: string;
  message: string;
}

interface Props {
  toggleDarkMode: () => void;
}

export default function Login({ toggleDarkMode }: Props) {
  const location = useLocation<LocationState>();
  const [reqErrorMessage, setReqErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormField>({
    mode: 'onChange',
    defaultValues: {
      username: location?.state?.username || '',
      password: location?.state?.password || '',
    },
  });

  // const onCompleted = (data: { login: any }) => {
  //   const {
  //     login: { ok, error, token },
  //   } = data;
  //   if (!ok) {
  //     return setReqErrorMessage(error!);
  //   }
  //   if (token) {
  //     useAuth(token);
  //   }
  // };

  // const [login, { loading }] = useMutation<
  //   { login: any },
  //   LoginFormField
  // >(LOGIN_MUTATION, {
  //   onCompleted,
  // });

  // const onSubmitValid = (data: LoginFormField) => {
  //   if (loading) return null;
  //   login({
  //     variables: {
  //       ...data,
  //     },
  //   });
  // };

  const loading = true;
  const onSubmitValid = (data: any) => {
    if (loading) return null;
    // HTTP request
  };

  return (
    <AuthLayout toggleDarkMode={toggleDarkMode}>
      <PageTitle title="Login" />
      <FormBox>
        <Title>금융 앱</Title>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('username', {
              required: {
                value: true,
                message: '사용자 이름은 필수입니다.',
              },
            })}
            type="text"
            placeholder="사용자 이름"
            hasError={Boolean(errors?.username)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register('password', {
              required: {
                value: true,
                message: '비밀번호는 필수입니다.',
              },
              minLength: {
                value: 5,
                message: '비밀번호는 5자리 이상으로 설정해주세요.',
              },
            })}
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            disabled={!isValid && !Boolean(errors.result?.message)}
            type="submit"
          >
            {loading ? '로그인 중 ...' : '로그인'}
          </Button>
        </form>
        <Separator />
        <ErrorMessage>{reqErrorMessage}</ErrorMessage>
      </FormBox>

      <BottomBox
        title="가입하기"
        description="계정이 없으신가요?"
        link={routes.signUp}
      />
    </AuthLayout>
  );
}

const Notification = styled.div`
  color: #2ecc71;
`;

export const ErrorMessage = styled(SFormError)`
  font-size: 15px;
  margin: 0px 0px 20px;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.color};
`;

const FaceBookLogin = styled.button`
  color: #385185;
  background-color: #fff;
  border: none;
  cursor: pointer;
  margin: 0 0 20px;
  span {
    margin: 0 10px;
    font-weight: 600;
  }
  svg {
    font-size: 16px;
  }
`;
