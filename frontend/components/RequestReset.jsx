/* eslint-disable react/jsx-no-bind */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import 'twin.macro';
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

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email)
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refectch the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    console.log(inputs);
    const res = await signup().catch(console.error);
    console.log(res);
    console.log({ data, loading, error });
    resetForm();
    // Send the email and password to the graphqlAPI
  }

  return (
    <ContainerStyles hasBgPrimaryLight20>
      <PageContainerStyles>
        <Form method="POST" onSubmit={handleSubmit}>
          <h1 tw="text-center">Request a password reset</h1>
          <DisplayError error={error} />
          <fieldset>
            {data?.sendUserPasswordResetLink === true && (
              <SuccessStyles>
                <p tw="mb-0">
                  <span tw="font-bold">Success!</span> If you have an account
                  with us, you will receive a password reset email.
                </p>
              </SuccessStyles>
            )}
            <Processing loading={loading.toString()}>
              <LoadingIcon tw="animate-spin" />
              Processing
            </Processing>
            <Label htmlFor="email" isStacked>
              Email
              <div tw="flex">
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
                <span />
              </div>
            </Label>
            <FormButton type="submit">Request Reset</FormButton>
          </fieldset>
        </Form>
      </PageContainerStyles>
    </ContainerStyles>
  );
}
