import 'twin.macro';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import SignUp from '../components/SignUp';

export default function SignInPage() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      <SignUp />
    </GoogleReCaptchaProvider>
  );
}
