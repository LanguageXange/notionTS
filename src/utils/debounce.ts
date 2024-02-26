/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce<F extends (...args: any[]) => any>(
  callBack: F,
  delay: number = 300
) {
  let id: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<F>) {
    clearTimeout(id);
    id = setTimeout(() => callBack(...args), delay);
  };
}
