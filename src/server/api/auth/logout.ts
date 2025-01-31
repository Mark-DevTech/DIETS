export default defineEventHandler(async (event) => {
  const { AUTH_API } = useRuntimeConfig();

  const body = await readBody(event);

  const response = await $fetch(`${AUTH_API}/api/v1/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${body.token}`
    }
  });

  return response;

})
