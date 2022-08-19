import _ from "lodash";

// TODO: replace to common utils
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// todo: add doc
export async function executeWithRateLimit<FetchCallback extends () => Promise<unknown>>({
  fetchCallbacks,
  requestsLimit,
  timeout,
}: {
  fetchCallbacks: FetchCallback[];
  requestsLimit: number;
  timeout: number;
}): Promise<Awaited<ReturnType<FetchCallback>>[]> {
  const cbChunks = _.chunk(fetchCallbacks, requestsLimit);
  const result: Awaited<ReturnType<FetchCallback>>[] = [];

  for (let i = 0; i < cbChunks.length; i++) {
    const cbChunk = cbChunks[i];
    const startTime = Date.now();

    const callbacksResults = await Promise.all(cbChunk.map((cb) => cb()));
    result.push(...(callbacksResults as Awaited<ReturnType<FetchCallback>>[]));

    const remainingTime = timeout - (Date.now() - startTime);

    await sleep(remainingTime);
  }

  return result;
}
