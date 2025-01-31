export default defineEventHandler(async (event) => {

  const body = await readBody(event);
  const response = await $fetch('/api/test');

  return response;


})
