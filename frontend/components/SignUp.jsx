import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Form, FormButton, Input, Label, Processing } from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';
import LoadingIcon from './icons/LoadingIcon';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refectch the currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

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
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up For an Account</h2>
      <Error error={error} />
      <fieldset>
        <Processing loading={loading.toString()}>
          <LoadingIcon tw="animate-spin" />
          Processing
        </Processing>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please Go ahead and Sign
            in!
          </p>
        )}
        <Label htmlFor="email">
          Your Name
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </Label>
        <Label htmlFor="email">
          Email
          <Input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </Label>
        <Label htmlFor="password">
          Password
          <Input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </Label>
        <FormButton type="submit">Sign In!</FormButton>
      </fieldset>
    </Form>
  );
}
