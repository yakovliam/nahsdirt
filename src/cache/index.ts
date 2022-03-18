import cacheData from 'memory-cache';

const CACHE_TIME_HOURS = 0.5;

export function executeResultingFunctionWithCache<T>(
  fn: () => Promise<T>,
  key: string,
) {
  // get existing value
  const value = cacheData.get(key);

  if (value) {
    return value;
  }

  // execute function
  const result = fn();

  // put in cache
  cacheData.put(key, result, 1000 * 60 * 60 * CACHE_TIME_HOURS);

  // return result
  return result;
}
