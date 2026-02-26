export function fakeApi(payload, delay = 350) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: payload })
    }, delay)
  })
}