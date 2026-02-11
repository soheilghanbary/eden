'use cache: private'
import { cacheLife } from 'next/cache'
import { api } from '@/shared/lib/api'

const getMessage = async () => (await api.hello.get()).data

export const MessageSSR = async () => {
  cacheLife('days')
  const data = await getMessage()
  return (
    <div className="w-full">
      <span className="font-medium text-sm">Server Response</span>
      <pre className="mt-1 rounded-md bg-muted p-2 font-mono text-xs shadow-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
