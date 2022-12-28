/* eslint-disable react/jsx-no-bind */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import LoadingIcon from './icons/LoadingIcon';
import {
  ContainerStyles,
  Form,
  FormButton,
  Input,
  Label,
  PageContainerStyles,
  Processing,
} from '../styles/Form';
import { CURRENT_USER_QUERY } from './User';
import 'twin.macro';
import { MyLink } from './MyLink';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, resetForm, handleChange } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(event) {
    event.preventDefault();
    await signin();
    resetForm();
  }

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  console.log(data?.authenticateUserWithPassword.__typename);
  return (
    <ContainerStyles hasBgPrimaryLight20>
      <PageContainerStyles>
        <Form method="POST" onSubmit={handleSubmit}>
          <h1 tw="text-center">Sign In</h1>
          <DisplayError error={error} />
          <fieldset>
            <Processing loading={loading.toString()}>
              <LoadingIcon tw="animate-spin" />
              Processing
            </Processing>
            <Label isStacked>
              Email
              <Input
                type="email"
                name="email"
                autoComplete="email"
                value={inputs.email}
                onChange={handleChange}
              />
            </Label>
            <Label isStacked>
              Password
              <Input
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
              />
            </Label>
            <FormButton type="submit">Login</FormButton>
          </fieldset>
          <div tw="mt-8 text-center">
            <MyLink href="/reset">
              <span tw="text-sm hover:underline">Forgot password?</span>
            </MyLink>
          </div>
        </Form>
        <div tw="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4 pt-6">
          <p tw="text-center sm:text-left mb-0">Don't have an account?</p>
          <MyLink href="/signup">
            <span>
              Get access <span aria-hidden="true">→</span>
            </span>
          </MyLink>
        </div>
      </PageContainerStyles>
    </ContainerStyles>
  );
}
