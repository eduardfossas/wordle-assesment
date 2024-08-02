export function refToArray(el: HTMLElement | null, array: Array<HTMLElement>) {
    if (!el || !Array.isArray(array) || array.includes(el)) return;
    return array.push(el);
  }