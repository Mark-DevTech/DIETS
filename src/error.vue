<script setup lang="ts">
import { defineProps } from 'vue';
import type { NuxtError } from '#app';

const props = defineProps({
    error: Object as () => NuxtError
})


const errorDictionary: {
    [key: number]: {
        message: string;
        image: string;
    };
} = {
    404: {
        message: 'Page not found',
        image: '404.svg'
    },
    500: {
        message: 'Something bad happened on the server',
        image: '500.svg'
    },
    503: {
        message: 'Service Unavailable',
        image: 'under_construction.svg'
    }
};


</script>

<template>
    <div class="flex flex-col items-center h-screen bg-slate-100">
            <img :src="`/images/${errorDictionary[error.statusCode]?.image ?? '500.svg'}`" alt="Error"  class="h-1/2 w-1/2" v-if="error"/>
            <p class="text-2xl font-bold">Error</p>
            <!-- <h1 class="text-9xl font-bold">{{ error.statusCode }}</h1> -->
            <p>{{ error?.message }}</p>
            <Button label="Go back home" as="router-link" to="/"  severity="secondary"/>
            
        
    </div>
</template>
