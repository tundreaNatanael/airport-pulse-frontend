const backendUrl = import.meta.env.VITE_BACKEND_URL

if (!backendUrl) {
  throw new Error('Missing VITE_BACKEND_URL. Add it to your .env file.')
}

const normalizedBackendUrl = backendUrl.replace(/\/+$/, '')

export const env = {
  backendUrl: normalizedBackendUrl,
  graphqlUrl: `${normalizedBackendUrl}/graphql`,
} as const
