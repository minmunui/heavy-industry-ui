import {http, HttpResponse} from "msw";

export const testHandlers = [
  http.get("test", () => {
    return HttpResponse.json(
      {
        message: "hello"
      }
    )
  })
]
