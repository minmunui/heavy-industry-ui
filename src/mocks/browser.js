import { setupWorker } from 'msw/browser'
import { testHandlers } from '@/mocks/handlers/fileData.js'

export const worker = setupWorker(
  ...testHandlers
)
