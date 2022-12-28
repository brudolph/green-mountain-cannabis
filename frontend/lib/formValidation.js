export default function formValidation() {
  const inputs = document.querySelectorAll('input, select, textarea');

  inputs.forEach((input) => {
    input.addEventListener(
      'invalid',
      () => {
        input.classList.add('error');
      },
      false
    );
  });
}
