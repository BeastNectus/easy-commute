<template>
    <div class="relative w-full h-screen flex items-center justify-center">
        <video
            autoplay
            loop
            muted
            playsinline
            class="absolute top-0 left-0 w-full h-full object-cover"
        >
            <source
                src="../../src/assets/videos/register.mp4"
                type="video/mp4"
            />
            Your browser does not support the video tag.
        </video>
        <div class="relative w-full max-w-md bg-white bg-opacity-80 shadow-md rounded px-8 pt-6 pb-8">
            <p class="text-xl font-bold text-center">Sign In</p>
            <form
                @submit.prevent="handleSignin"
            >
                <div class="mb-4 relative">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="email"
                    >
                        Email
                    </label>
                    <div class="relative">
                        <i class="mdi mdi-email absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700"></i>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="test@gmail.com"
                            v-model="email"
                        />
                    </div>
                </div>

                <div class="mb-6 relative">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="password"
                    >
                        Password
                    </label>
                    <div class="relative">
                        <i class="mdi mdi-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700"></i>
                        <input
                            :type="isPasswordVisible ? 'text' : 'password'"
                            class="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            placeholder="*********"
                            v-model="password"
                        />
                        <button
                            type="button"
                            @click="togglePasswordVisibility"
                            class="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-700"
                        >
                            <i :class="isPasswordVisible ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"></i>
                        </button>
                    </div>
                </div>

                <div class="flex items-center justify-between mb-4">
                    <label class="inline-flex items-center text-sm text-gray-700">
                        <input
                            type="checkbox"
                            class="form-checkbox"
                            v-model="rememberMe"
                        />
                        <span class="ml-2">Remember Me</span>
                    </label>
                </div>
                <div class="flex justify-center">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>
            <p class="mt-4 text-center text-sm">
                Don't have an account? 
                <a
                    class="text-blue-500 hover:text-blue-700 font-bold cursor-pointer"
                    @click="goToSignUp"
                >
                    Register
                </a>
            </p>
            <div class="text-center mt-2">
                <a
                    class="inline-block font-bold text-sm text-blue-500 hover:text-blue-800"
                    href="#"
                >
                    Forgot Password?
                </a>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../supabase";
import { toast } from "vue3-toastify";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const isPasswordVisible = ref(false);
const router = useRouter();

const handleSignin = async () => {
    if (!email.value || !password.value) {
        toast.error("Please fill in both email and password.", {
            autoClose: 5000,
            position: toast.POSITION.BOTTOM_CENTER,
        });
        return;
    }
    try {
        const { error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        });

        if (error) {
            throw error;
        }

        toast.success("Sign in successful!", {
            autoClose: 5000,
            position: toast.POSITION.BOTTOM_CENTER,
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push("/dashboard");
    } catch (error) {
        toast.error(error.error_description || error.message, {
            autoClose: 5000,
            position: toast.POSITION.BOTTOM_CENTER,
        });
    }
};

const goToSignUp = () => {
    router.push("/sign-up");
};

const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

