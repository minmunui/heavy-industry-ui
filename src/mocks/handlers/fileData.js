import { http, HttpResponse } from 'msw'
import { M_FILE_LIST } from '@/mocks/data/filelist.js'

export const testHandlers = [
  http.get('stitched_image', () => {
    return HttpResponse.json(
      { data: 'https://picsum.photos/1000/1000' })
  }),
  http.get('data', () => {
    return HttpResponse.json(
      {
        data:
        M_FILE_LIST
      }
    )
  })
]
