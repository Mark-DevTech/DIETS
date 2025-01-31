import { useAuth } from '~/composables/authentication/useAuth';


export default defineNuxtRouteMiddleware(async (to, from) => {


    const router = useRouter();

    const exludedPages = [
        '/auth/login',
        '/error',
        '/auth/access',
    ]

    // Check If the page is NOT in the exludedPages array
    if (!exludedPages.includes(to.path)) {

        const userAuth = await useAuth().fetchUser() as any;

        if (userAuth.status !== 'success') {
            console.log('User not authenticated');
            router.push('/auth/login');
        }



    } else {

    }





})
