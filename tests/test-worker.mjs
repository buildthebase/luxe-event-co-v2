const workerUrl = new URL("../dist/server/index.js", import.meta.url);
const workerPromise = import(workerUrl.href).then((module) => module.default);

const environment = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const context = {
  waitUntil() {},
  passThroughOnException() {},
};

export async function loadWorker() {
  return workerPromise;
}

export async function render(first = "/", second, third = {}) {
  const hasWorker = typeof first === "object" && first !== null && "fetch" in first;
  const worker = hasWorker ? first : await loadWorker();
  const input = hasWorker ? second : first;
  const options = hasWorker ? third : second ?? {};
  const url = new URL(input, options.baseUrl ?? "http://localhost/");
  const headers = {
    accept: "text/html",
    ...(options.headers ?? {}),
  };

  return worker.fetch(
    new Request(url, { headers }),
    options.environment ?? environment,
    options.context ?? context,
  );
}
