const random = {
  get number() {
    return Math.random().toString().replace('0.', '')
  },
  get string() {
    return Math.random().toString(36).replace('0.', '')
  },
  pickFrom: <T>(options: T[]) =>
    options[Math.floor(Math.random() * options.length)],
}

export { random }
