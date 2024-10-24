import { http, HttpResponse } from 'msw'

export const serverHandler = [
  http.get('server_info', () => {
    return HttpResponse.json({
        data: {
          title: 'Dev Server'
        }
      }
    )
  })
]
