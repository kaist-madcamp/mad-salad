import { useMutation } from 'react-query';
import AuthLayout from '../components/auth/AuthLayout';
import PageTitle from '../components/PageTitle';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import Button from '../components/auth/Button';
import Separator from '../components/auth/Separator';
import BottomBox from '../components/auth/BottomBox';
import routes from '../routes';
import FormError from '../components/auth/FormError';
import { useForm } from 'react-hook-form';
import { Title } from './Login';
import { useHistory } from 'react-router-dom';
import { createUserAPI } from '../lib/api/auth';

interface SignUpFormField {
  email: string;
  name: string;
  password: string;
}

interface Props {
  darkModeInput: [boolean, () => void];
}

export default function SignUp({ darkModeInput }: Props) {
  const history = useHistory();
  const { mutateAsync, isLoading } = useMutation(createUserAPI);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormField>({
    mode: 'onChange',
  });

  const onSubmitValid = async (data: SignUpFormField) => {
    if (isLoading) return;
    console.log(data);
    const { email, name, password } = data;
    try {
      const response = await mutateAsync({
        email,
        name,
        password,
      });
      console.log(response);
      history.push(routes.home, {
        message: '계정이 생성되었습니다. 로그인 해주세요.',
        email,
        password,
      });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <AuthLayout darkModeInput={darkModeInput}>
      <PageTitle title="Sign up | 금융 앱" />
      <FormBox>
        <Title>금융 앱</Title>
        <h2>나의 돈을 시각화, 직관화!</h2>
        <Separator />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('email', {
              required: {
                value: true,
                message: '이메일은 필수입니다.',
              },
              minLength: {
                value: 5,
                message: '이메일을 5자리 이상으로 설정해주세요.',
              },
            })}
            type="text"
            placeholder="이메일 주소"
            hasError={Boolean(errors?.email)}
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register('name', {
              required: {
                value: true,
                message: '성명은 필수입니다.',
              },
            })}
            type="text"
            placeholder="성명"
            hasError={Boolean(errors?.name)}
          />
          <FormError message={errors?.name?.message} />
          <Input
            {...register('password', {
              required: {
                value: true,
                message: '비밀번호는 필수입니다.',
              },
              minLength: {
                value: 5,
                message: '비밀번호를 5자리 이상으로 설정해주세요.',
              },
            })}
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password)}
          />
          <FormError message={errors?.password?.message} />
          <Button disabled={!isValid} type="submit">
            가입
          </Button>
          {isLoading && <p>로딩중..</p>}
        </form>
      </FormBox>
      <BottomBox
        title="계정이 있으신가요?"
        description="로그인"
        link={routes.home}
      />
    </AuthLayout>
  );
}
