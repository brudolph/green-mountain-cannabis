import 'twin.macro';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

export default function SignInPage() {
  return (
    <div tw="grid grid-cols-2 gap-8">
      <SignIn />
      <SignUp />
    </div>
  );
}
