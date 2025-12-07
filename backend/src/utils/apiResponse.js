export function ok(res, data = {}, status = 200) {
  return res.status(status).json(data);
}

export function created(res, data = {}) {
  return res.status(201).json(data);
}

export function badRequest(message = "Bad request") {
  const err = new Error(message);
  err.status = 400;
  return err;
}
