// import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

interface SignUpFormField {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface Props {
  toggleDarkMode: () => void;
}

export default function SignUp({ toggleDarkMode }: Props) {
  const history = useHistory();

  // const onCompleted = (data: { createAccount: MutationResponse }) => {
  //   const { username, password } = getValues();
  //   const {
  //     createAccount: { ok, error },
  //   } = data;
  //   if (!ok) alert(error);
  //   history.push(routes.home, {
  //     message: '계정이 생성되었습니다. 로그인 해주세요.',
  //     username,
  //     password,
  //   });
  // };

  // const [createAccount, { loading }] = useMutation<
  //   { createAccount: MutationResponse },
  //   SignUpFormField
  // >(CREATE_ACCOUNT_MUTATION, {
  //   onCompleted,
  // });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<SignUpFormField>({
    mode: 'onChange',
  });

  const loading = false;
  const onSubmitValid = async (data: SignUpFormField) => {
    if (loading) return null;
    console.log(data);
    // createAccount({
    //   variables: {
    //     ...data,
    //   },
    // });
  };

  return (
    <AuthLayout toggleDarkMode={toggleDarkMode}>
      <PageTitle title="Sign up | Instaclone" />
      <FormBox>
        <Title>금융 앱</Title>
        <h2>나의 돈을 시각화, 직관화!</h2>
        {/* <Button type="submit">
          <FontAwesomeIcon icon={faFacebookSquare} />
          Facebook으로 로그인
        </Button> */}
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
            {...register('username', {
              required: {
                value: true,
                message: '사용자 이름은 필수입니다.',
              },
            })}
            type="text"
            placeholder="사용자 이름"
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
          {loading && <p>로딩중..</p>}
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
