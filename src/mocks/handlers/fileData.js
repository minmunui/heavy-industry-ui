import { http, HttpResponse } from 'msw'
import { DATA_STATUS } from '@/utils/constants.js'

export const testHandlers = [
  http.get('data', () => {
    return HttpResponse.json(
      {
        data:
          [
            {
              name: '20241225103024_deokgok_1',
              size: 129,
              time: '2024-09-25 10:30:24',
              status_1: {
                status: DATA_STATUS.DONE,
                data: {}
              },
              status_2: {
                status: DATA_STATUS.ONPROGRESS,
                data: { start: '2024-09-25 10:30:24' }
              }
            },
            {
              name: '20241225103024_deokgok_2',
              size: 129,
              time: '2024-09-25 10:33:24',
              status_1: {
                status: DATA_STATUS.UPLOADING,
                data: { start: '2024-09-25 10:30:00' }
              },
              status_2: {
                status: { status: DATA_STATUS.READY, data: { start: '2024-09-25' } }
              }
            }
          ]
      }
    )
  })
]
