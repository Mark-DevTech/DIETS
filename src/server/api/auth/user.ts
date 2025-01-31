export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { AUTH_API } = useRuntimeConfig();




  const response = await $fetch(`${AUTH_API}/api/v1/user`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${body.token}`
    }
  });


  return response;

})
