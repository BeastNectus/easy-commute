<template>
    <LayoutWithSidebar>
        <div class="mx-auto max-w-7xl p-4">
            <h1 class="mb-8 text-3xl font-bold uppercase text-white">Routes for Tricycle</h1>
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <!-- Displaying Routes -->
                <div :key="index"
                     class="group transform rounded-lg bg-[#1a1a1a] p-6 text-white shadow-md transition-transform hover:scale-105 hover:bg-[#18d26e] hover:text-black hover:shadow-xl"
                     v-for="(route, index) in routes">
                    <button class="flex w-full flex-col items-center rounded-lg px-6 py-4 text-center text-base font-bold transition-colors duration-300">
                        <div class="mb-2 flex h-12 w-12 flex-col items-center justify-center rounded-md bg-[#18d26e] text-white transition-all duration-300 group-hover:bg-black">
                            <i class="mdi mdi-motorbike text-black group-hover:text-white"></i>
                        </div>
                        <span>{{ route }}</span>
                    </button>
                </div>
            </div>
        </div>
    </LayoutWithSidebar>
</template>

<script>
    import LayoutWithSidebar from "../components/LayoutWithSidebar.vue";
    import {
        supabase
    } from "../supabase";

    export default {
        components: {
            LayoutWithSidebar,
        },
        data() {
            return {
                routes: ["Green", "Orange", "Red", "Yellow", "White"],
            };
        },
    };
</script>
