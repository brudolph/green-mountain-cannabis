import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import tw, { styled } from 'twin.macro';
import { useDialog } from '../context/dialogState';

export default function Modal({ title, children }) {
  const { dialogOpen, closeDialog } = useDialog();

  return (
    <Transition appear show={dialogOpen} as={Fragment}>
      <Dialog as="div" tw="relative z-10" onClose={closeDialog}>
        <StyledTransitionChildOuter
          as={Fragment}
          enter="enter"
          enterFrom="enterFrom"
          enterTo="enterTo"
          leave="leave"
          leaveFrom="leaveFrom"
          leaveTo="leaveTo"
        >
          <div tw="fixed inset-0 bg-black bg-opacity-25" />
        </StyledTransitionChildOuter>

        <div tw="fixed inset-0 overflow-y-auto">
          <div tw="flex min-h-full items-center justify-center p-4 text-center">
            <StyledTransitionChildInner
              as={Fragment}
              enter="enter"
              enterFrom="enterFrom"
              enterTo="enterTo"
              leave="leave"
              leaveFrom="leaveFrom"
              leaveTo="leaveTo"
            >
              <Dialog.Panel tw="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  tw="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </StyledTransitionChildInner>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

const StyledTransitionChildOuter = styled(Transition.Child)`
  &.enter {
    ${tw`ease-out duration-300`}
  }
  &.enterFrom {
    ${tw`opacity-0`}
  }
  &.enterTo {
    ${tw`opacity-100`}
  }
  &.leave {
    ${tw`ease-in duration-200`}
  }
  &.leaveFrom {
    ${tw`opacity-100`}
  }
  &.leaveTo {
    ${tw`opacity-0`}
  }
`;
const StyledTransitionChildInner = styled(Transition.Child)`
  &.enter {
    ${tw`ease-out duration-300`}
  }
  &.enterFrom {
    ${tw`opacity-0 scale-95`}
  }
  &.enterTo {
    ${tw`opacity-100 scale-100`}
  }
  &.leave {
    ${tw`ease-in duration-200`}
  }
  &.leaveFrom {
    ${tw`opacity-100 scale-100`}
  }
  &.leaveTo {
    ${tw`opacity-0 scale-95`}
  }
`;
