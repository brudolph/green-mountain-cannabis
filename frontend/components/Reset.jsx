/* eslint-disable react/jsx-no-bind */
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import 'twin.macro';
import { useMutation } from '@apollo/client';
import {
  Form,
  FormButton,
  Input,
  Label,
  Processing,
  SuccessStyles,
} from '../styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import {
  ContainerStyles,
  PageContainerStyles,
} from '../styles/RequestResetStyles';
import LoadingIcon from './icons/LoadingIcon';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    console.log('inpute', inputs);
    const res = await reset().catch(console.error);
    console.log('res', res);
    console.log({ data, loading, error });
    resetForm();
    // Send the email and password to the graphqlAPI
  }

  return (
    <ContainerStyles hasBgPrimaryLight20>
      <PageContainerStyles>
        <Form method="POST" onSubmit={handleSubmit}>
          <h1 tw="text-center">Reset Your Password</h1>
          <DisplayError error={error || successfulError} />
          <fieldset>
            {data?.redeemUserPasswordResetToken === null && (
              <SuccessStyles>
                <p tw="mb-0">Success! You can Now sign in</p>
              </SuccessStyles>
            )}
            <Processing loading={loading.toString()}>
              <LoadingIcon tw="animate-spin" />
              Processing
            </Processing>
            <Label htmlFor="email" isStacked>
              Email
              <Input
                type="email"
                name="email"
                required
                title="Please enter a valid email address"
                placeholder="Your Email Address"
                autoComplete="email"
                value={inputs.email}
                onChange={handleChange}
              />
            </Label>
            <Label htmlFor="password" isStacked>
              Password
              <Input
                type="password"
                name="password"
                required
                placeholder="Password"
                autoComplete="password"
                value={inputs.password}
                onChange={handleChange}
              />
            </Label>
            <Label htmlFor="confirmPassword" isStacked>
              Confirm Password
              <Input
                type="password"
                name="confirmPassword"
                required
                placeholder="Confirm Password"
                autoComplete="confirmPassword"
                value={inputs.password}
                onChange={handleChange}
              />
            </Label>
            <FormButton type="submit">Reset Password</FormButton>
          </fieldset>
        </Form>
      </PageContainerStyles>
    </ContainerStyles>
  );
}

Reset.propTypes = {
  token: PropTypes.any,
};

export default Reset;
