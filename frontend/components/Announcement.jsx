import 'twin.macro';

export default function Announcement({ children }) {
  return (
    <div tw="bg-primary-light">
      <div tw="max-w-7xl mx-auto h-10 px-4 flex items-center justify-center sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
