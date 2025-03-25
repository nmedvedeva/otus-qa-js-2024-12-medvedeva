export const cached =
  // @ts-expect-error: надо разобраться, что-то с типами


    (fn, cache = new Map()) =>
    // @ts-expect-error: надо разобраться, что-то с типами
    async (...payload) => {
      const cacheKey = JSON.stringify(payload)

      if (!cache.has(cacheKey)) {
        cache.set(cacheKey, fn(...payload))
      }

      try {
        return await cache.get(cacheKey)
      } catch (error) {
        cache.delete(cacheKey)
        throw error
      }
    }
