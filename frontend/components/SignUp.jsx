/* eslint-disable react/jsx-no-bind */
import gql from 'graphql-tag';
import { useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import {
  ContainerStyles,
  Form,
  FormButton,
  Input,
  Label,
  PageContainerStyles,
  Processing,
  SuccessStyles,
} from '../styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';
import LoadingIcon from './icons/LoadingIcon';
import 'twin.macro';
import formValidation from '../lib/formValidation';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    $jobTitle: String!
    $phone: String!
    $license: String!
  ) {
    createUser(
      data: {
        email: $email
        name: $name
        password: $password
        jobTitle: $jobTitle
        phone: $phone
        license: $license
      }
    ) {
      id
      email
      name
      jobTitle
      phone
      license
    }
  }
`;

export default function SignUp() {
  // Recaptcha
  // const [setNotification] = useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const { inputs, handleChange } = useForm({
    email: '',
    name: '',
    password: '',
    jobTitle: '',
    phone: '',
    license: '',
  });

  const [{ data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refectch the currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  useEffect(() => {
    formValidation(inputs);
  }, [inputs]);

  // const submitUserSignup = useCallback(
  //   async (gReCaptchaToken) => {
  //     fetch('/api/signup', {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json, text/plain, */*',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         gRecaptchaToken: gReCaptchaToken,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         console.log(res, 'response from backend');
  //         if (res?.status === 'success') {
  //           setNotification(res?.message);
  //         } else {
  //           setNotification(res?.message);
  //         }
  //       });
  //     const signupres = await signup().catch(console.error);
  //     console.log(signupres);
  //     console.log({ data, loading, error });
  //     resetForm();
  //     // Send the email and password to the graphqlAPI
  //   },
  //   [signup, data, loading, error, resetForm, setNotification]
  // );

  const handleSubmitForm = useCallback(
    async (e) => {
      e.preventDefault();
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
      }
      // const token = await executeRecaptcha('signup').then((gReCaptchaToken) => {
      //   console.log(gReCaptchaToken, 'response Google reCaptcha server');
      //   submitUserSignup(gReCaptchaToken);
      // });
    },
    [executeRecaptcha]
  );

  return (
    <ContainerStyles hasBgPrimaryLight20>
      <PageContainerStyles>
        <Form method="POST" onSubmit={handleSubmitForm}>
          <h1 tw="text-center">Sign Up For an Account</h1>
          <Error error={error} />
          <fieldset>
            <Processing loading={loading.toString()}>
              <LoadingIcon tw="animate-spin" />
              Processing
            </Processing>
            {data?.createUser && (
              <SuccessStyles>
                <p>
                  <span tw="font-bold text-primary-dark">Success! </span>Signed
                  up with {data.createUser.email}
                </p>
                <p>
                  To view products and place orders you will need to be
                  approved. Hang tight while one of our representitives looks
                  over and approves your account.
                </p>
                <p>Be on the look-out for an email from us!</p>
                {/* <MyLink
                  href="/signin"
                  tw="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-gray-600 ring-1 ring-gray-600/10 hover:ring-gray-600/20"
                >
                  Sign In
                </MyLink> */}
              </SuccessStyles>
            )}
            {!data?.createUser && (
              <>
                <Label htmlFor="name" isStacked>
                  Your Full Name
                  <div tw="flex">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      title="Enter your name"
                      autoComplete="name"
                      required
                      value={inputs.name}
                      onChange={handleChange}
                    />
                    <span />
                  </div>
                </Label>
                <Label htmlFor="email" isStacked>
                  Email
                  <div tw="flex">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email Address"
                      title="Enter your email address"
                      autoComplete="email"
                      required
                      value={inputs.email}
                      onChange={handleChange}
                    />
                    <span />
                  </div>
                </Label>
                <Label htmlFor="phone" isStacked>
                  Phone
                  <div tw="flex">
                    <Input
                      type="text"
                      name="phone"
                      placeholder="970 123 4567"
                      title="10 numeric characters only"
                      autoComplete="phone"
                      required
                      pattern="[0-9]{10}"
                      value={inputs.phone}
                      onChange={handleChange}
                    />
                    <span />
                  </div>
                </Label>
                <Label htmlFor="jobTitle" isStacked>
                  Job Title
                  <div tw="flex">
                    <Input
                      type="text"
                      name="jobTitle"
                      placeholder="Your Job Title"
                      autoComplete="jobTitle"
                      required
                      value={inputs.jobTitle}
                      onChange={handleChange}
                    />
                    <span />
                  </div>
                </Label>
                <Label htmlFor="license" isStacked>
                  License #
                  <div tw="flex">
                    <Input
                      type="text"
                      name="license"
                      placeholder="Your License# (402/403/404)"
                      autoComplete="license"
                      required
                      value={inputs.license}
                      onChange={handleChange}
                    />
                    <span />
                  </div>
                </Label>
                <Label htmlFor="password" isStacked>
                  Password
                  <div tw="flex">
                    <Input
                      type="password"
                      name="password"
                      required
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}"
                      title="At least one number and one uppercase and lowercase letter, and at least 10 or more characters"
                      minLength="10"
                      placeholder="Password"
                      autoComplete="password"
                      value={inputs.password}
                      onChange={handleChange}
                    />
                    <span />
                  </div>
                </Label>
                <FormButton type="submit">Sign Up</FormButton>
              </>
            )}
          </fieldset>
        </Form>
      </PageContainerStyles>
    </ContainerStyles>
  );
}
