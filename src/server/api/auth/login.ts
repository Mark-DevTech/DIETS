export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { AUTH_API } = useRuntimeConfig();


  const response = await fetch(`${AUTH_API}/api/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });


  return response;

})
