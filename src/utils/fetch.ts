export function checkResponse(res: Response) {
  if (res.ok) return res.json();
  return Promise.reject(`Response status ${res.status}`);
}

export function handleResponse<T extends {success: boolean}>(handler: (res: T) => void) {
  return (res: T) => {
    if (!res.success) {
      return Promise.reject(`Unsuccessful response ${JSON.stringify(res)}`);
    }
    handler(res);
  };
}

export function handleResponseError(requestName: string, handler: (err: Error) => void) {
  return (err: Error) => {
    console.log(`${requestName} error`, err);
    handler(err);
  };
}
