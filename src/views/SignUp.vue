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

        <!-- Signup Form -->
        <div class="relative w-full max-w-md bg-white bg-opacity-80 shadow-md rounded px-8 pt-6 pb-8">
            <p class="text-xl font-bold text-center">Sign up</p>
            <form @submit.prevent="handleSignup">
                <!-- Full Name -->
                <div class="mb-4 relative">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="fullname"
                    >
                        Full Name
                    </label>
                    <div class="relative">
                        <i class="mdi mdi-account-circle text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="fullname"
                            type="text"
                            placeholder="Full Name"
                            v-model="fullname"
                            @blur="touched.fullname = true"
                            :class="{ 'border-red-500': rules.fullname(fullname) !== true && touched.fullname }"
                        />
                    </div>
                    <span v-if="rules.fullname(fullname) !== true && touched.fullname" class="text-red-500 text-xs">
                        {{ rules.fullname(fullname) }}
                    </span>
                </div>

                <!-- Phone Number -->
                <div class="mb-4 relative">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="phone_number"
                    >
                        Phone Number
                    </label>
                    <div class="relative">
                        <i class="mdi mdi-phone text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone_number"
                            type="tel"
                            placeholder="Phone Number"
                            v-model="phone_number"
                            @blur="touched.phone = true"
                            :class="{ 'border-red-500': rules.phone(phone_number) !== true && touched.phone }"
                        />
                    </div>
                    <span v-if="rules.phone(phone_number) !== true && touched.phone" class="text-red-500 text-xs">
                        {{ rules.phone(phone_number) }}
                    </span>
                </div>

                <!-- Email -->
                <div class="mb-4 relative">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="email"
                    >
                        Email
                    </label>
                    <div class="relative">
                        <i class="mdi mdi-email text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            v-model="email"
                            @blur="touched.email = true"
                            :class="{ 'border-red-500': rules.email(email) !== true && touched.email }"
                        />
                    </div>
                    <span v-if="rules.email(email) !== true && touched.email" class="text-red-500 text-xs">
                        {{ rules.email(email) }}
                    </span>
                </div>

                <!-- Password -->
                <div class="mb-4 relative">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="password"
                    >
                        Password
                    </label>
                    <div class="relative">
                        <i class="mdi mdi-lock text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            :type="showPassword ? 'text' : 'password'"
                            id="password"
                            placeholder="Password"
                            v-model="password"
                            @blur="touched.password = true"
                            :class="{ 'border-red-500': rules.password(password) !== true && touched.password }"
                        />
                        <button
                            type="button"
                            @click="togglePassword"
                            class="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-700"
                        >
                            <i :class="showPassword ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"></i>
                        </button>
                    </div>
                    <span v-if="rules.password(password) !== true && touched.password" class="text-red-500 text-xs">
                        {{ rules.password(password) }}
                    </span>
                </div>

                <!-- Confirm Password -->
                <div class="mb-6 relative">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="confirmPassword"
                    >
                        Confirm Password
                    </label>
                    <div class="relative">
                        <i class="mdi mdi-lock-check text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            :type="showConfirmPassword ? 'text' : 'password'"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            v-model="confirmPassword"
                            @blur="touched.confirmPassword = true"
                            :class="{ 'border-red-500': confirmPassword !== password && touched.confirmPassword }"
                        />
                        <button
                            type="button"
                            @click="toggleConfirmPassword"
                            class="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-700"
                        >
                            <i :class="showConfirmPassword ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"></i>
                        </button>
                    </div>
                    <span v-if="confirmPassword !== password && touched.confirmPassword" class="text-red-500 text-xs">
                        Passwords do not match
                    </span>
                </div>

                <!-- Submit -->
                <div class="flex items-center justify-center">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        :disabled="!isValidForm"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { supabase } from "../supabase";
import router from "../router/index";
import { toast } from "vue3-toastify";

const fullname = ref("");
const phone_number = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const touched = {
    fullname: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
};

const rules = {
    required: (v) => !!v || "This field is required",
    fullname: (v) => (v && v.length >= 10) || "Full name must be at least 10 characters long",
    phone: (v) => (/^\d{11}$/.test(v)) || "Phone number should be 11 digits",
    email: (v) => (/.+@.+\..+/.test(v)) || "Invalid email format",
    password: (v) => 
        (v && v.length >= 8 && /[A-Z]/.test(v) && /[a-z]/.test(v) && /[0-9]/.test(v) && /[!@#$%^&*(),.?":{}|<>]/.test(v)) ||
        "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character",
};


const isValidForm = computed(() => {
    return (
        rules.fullname(fullname.value) === true &&
        rules.phone(phone_number.value) === true &&
        rules.email(email.value) === true &&
        rules.password(password.value) === true &&
        password.value === confirmPassword.value
    );
});

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
};

const handleSignup = async () => {
    if (password.value !== confirmPassword.value) {
        toast.error("Passwords do not match", {
            autoClose: 5000,
            position: toast.POSITION.BOTTOM_CENTER,
        });
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
        });

        if (error) {
            throw error;
        }

        const user_id = data.user?.id;
        const { error: insertError } = await supabase.from("users_info").insert([{
            id: user_id,
            fullname: fullname.value,
            email_address: email.value,
            phone_number: phone_number.value,
        }]);

        if (insertError) {
            throw insertError;
        }

        toast.success("Please check your email to verify your account.", {
            autoClose: 5000,
            position: toast.POSITION.BOTTOM_CENTER,
        });

        router.push({ name: "verify-email", query: { email: email.value } });
    } catch (error) {
        console.error("Signup error:", error);
        toast.error(error.message || "An error occurred during signup", {
            autoClose: 5000,
            position: toast.POSITION.BOTTOM_CENTER,
        });
    }
};
</script>
