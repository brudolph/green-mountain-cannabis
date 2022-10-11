import Hero from '../public/rob-warner-unsplash.jpg';
import 'twin.macro';
import { MyLink } from './MyLink';
import { useUser } from './User';

export default function Home() {
  const user = useUser();

  return (
    <div tw="relative overflow-hidden mt-8">
      <div tw="relative py-16 sm:pb-24">
        <div tw="mx-auto max-w-7xl px-4 sm:px-6">
          <div tw="lg:grid lg:grid-cols-12 lg:gap-8">
            <div tw="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span tw="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  <span tw="block text-primary">Catchy Title</span>
                  <span tw="block text-accent">for the video</span>
                </span>
              </h1>
              <p tw="my-4 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua ad ad non deserunt sunt.
              </p>
              {!user && (
                <MyLink
                  href="/signup"
                  tw="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow text-white bg-primary hover:bg-primary-dark md:py-3 md:text-base md:px-8"
                >
                  Sign Up
                </MyLink>
              )}
            </div>
            <div tw="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div tw="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <button
                  type="button"
                  tw="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <span tw="sr-only">Watch our video to learn more</span>
                  <img
                    className=" aspect-video"
                    tw="w-full h-full object-cover"
                    src={Hero}
                    alt=""
                  />
                  <span
                    tw="absolute inset-0 w-full h-full flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg
                      tw="h-20 w-20 text-accent"
                      fill="currentColor"
                      viewBox="0 0 84 84"
                    >
                      <circle
                        opacity="0.9"
                        cx={42}
                        cy={42}
                        r={42}
                        fill="white"
                      />
                      <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
