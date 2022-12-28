import 'twin.macro';

function NeedsApproved() {
  return (
    <div tw="mx-auto max-w-2xl py-12 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8 text-center">
      <h1>Sorry, not yet.</h1>
      <p>You need to be approved before you can look around.</p>
    </div>
  );
}

export default NeedsApproved;
