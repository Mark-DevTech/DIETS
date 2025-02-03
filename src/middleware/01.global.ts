import { useAuth } from '~/composables/authentication/useAuth';


export default defineNuxtRouteMiddleware(async (to, from) => {


    interface interface_userAuth {
        data: {
            user_level: keyof typeof allowedPages
        },
        status: 'success' | 'error'
    }

    // List of pages that should be excluded from the middleware
    const exludedPages = [
        '/auth/login',
        '/error',
        '/auth/access',
    ]

    const allowedPages = {
        '1': ['/admin', '/doctor', '/dietary', '/foodserver', '/nurse'],
        '0': ['/doctor'],
        '59': ['/dietary', '/foodserver'],
        '60': ['/foodserver'],
        '63': ['/nurse'],
    }


    // 1️⃣ Check If the page is in the exludedPages array
    if (exludedPages.includes(to.path)) {
        return
    }

    // 2️⃣ Check if the user is authenticated

    const userAuth = await useAuth().fetchUser() as interface_userAuth;

    // 3️⃣ If the user is not authenticated, redirect to the login page
    if (userAuth.status === 'error') {
        return navigateTo('/auth/login');
    }

    // 4️⃣ Check if the user is allowed to access the page
    if (!allowedPages[userAuth.data.user_level].some(path => to.path.startsWith(path))) {
        return navigateTo(allowedPages[userAuth.data.user_level][0]);
    }


})
