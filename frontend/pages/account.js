import PleaseSignIn from '../components/PleaseSignIn';
import 'twin.macro';
import { ContainerStyles, PageContainerStyles } from '../styles/OrderStyles';

export default function AccountPage() {
  return (
    <PleaseSignIn>
      <ContainerStyles hasBgPrimaryLight20>
        <PageContainerStyles>
          <h1 tw="text-center">Account</h1>
        </PageContainerStyles>
      </ContainerStyles>
    </PleaseSignIn>
  );
}
