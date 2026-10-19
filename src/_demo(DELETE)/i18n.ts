type Messages = Record<string, unknown>;

const isObject = (value: unknown): value is Messages =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const deepMerge = (base: Messages, extra: Messages): Messages => {
  const result: Messages = { ...base };
  for (const [key, value] of Object.entries(extra)) {
    const current = result[key];
    result[key] =
      isObject(current) && isObject(value) ? deepMerge(current, value) : value;
  }
  return result;
};

export async function withDemoMessages<T extends Messages>(
  locale: string,
  messages: T,
): Promise<T> {
  const demo = (await import(`./messages/${locale}.json`)).default as Messages;
  return deepMerge(messages, demo) as T;
}
