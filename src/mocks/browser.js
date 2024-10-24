import { setupWorker } from 'msw/browser'
import { testHandlers } from '@/mocks/handlers/fileData.js'
import { serverHandler } from '@/mocks/handlers/serverData.js'

export const worker = setupWorker(
  ...testHandlers,
  ...serverHandler
)
