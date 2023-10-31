export function useGetEnv() {
  const env = process.env.NODE_ENV as string
  if (!env) throw new Error("process.env.NODE_ENV is not defined")
  return env
}
