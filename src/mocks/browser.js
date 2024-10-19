import { setupWorker } from 'msw/browser'
import { testHandlers } from '@/mocks/handlers/test.js'

export const worker = setupWorker(
  ...testHandlers
)
