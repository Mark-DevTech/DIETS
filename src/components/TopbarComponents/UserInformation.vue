
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useAuth } from '~/composables/authentication/useAuth';

const userInfo = useCookie('authUser') as unknown as { firstname: string; lastname: string; postitle: string };
  const router = useRouter();

  const clickedLogout = async () => {
    const result = await useAuth().logout();
    
    if(result.status === 'success') {
      router.push('/auth/login');
    }

  }



</script>



<template>
  <div class="w-full">
    <p class="font-semibold p-0 m-0">{{ userInfo.firstname }} {{ userInfo.lastname }}</p>
    <p style="font-style: italic" class="text-sm">{{ userInfo.postitle }}</p>
    <div class="w-full flex justify-end">
      <Button label="Logout" severity="danger" @click="clickedLogout" raised text />
    </div>
    
  </div>
</template>


<style>

</style>