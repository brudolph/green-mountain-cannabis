import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import LoadingIcon from './icons/LoadingIcon';
import { Form, FormButton, Input, Label, Processing } from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import 'twin.macro';

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

  return (
    <div tw="py-10 px-6">
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
        <p tw="mt-8 text-center">
          <Link href="/reset">
            <a tw="text-sm hover:underline">Forgot password?</a>
          </Link>
        </p>
      </Form>
      <div tw="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4 pt-6">
        <p tw="text-center sm:text-left">Don't have an account?</p>
        <a
          tw="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-gray-600 ring-1 ring-gray-600/10 hover:ring-gray-600/20"
          href="/all-access"
        >
          <Link href="/signup">
            <a>
              Get access <span aria-hidden="true">→</span>
            </a>
          </Link>
        </a>
      </div>
    </div>
  );
}
