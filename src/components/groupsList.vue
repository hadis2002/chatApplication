<template>
    <div class="text-white p-3 flex items-center gap-4 hover:bg-blue-950">
        <div class="w-16 h-12 relative">
            <img :src="group.icon ? group.icon : defaultProfile" class="w-full h-full rounded-full" alt="">
        </div>
        <div class="flex flex-col w-full">
            <div class="flex justify-between items-center">
            <div class="font-semibold text-[16px]">{{ group.name }}</div>
            <div class="text-gray-300 text-xs" :class="group.updatedAt ? 'block' : 'hidden'">{{ new Date(group.updatedAt * 1000).toLocaleTimeString('en') }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import defaultProfile from '../../public/images/default-avatar.avif'
const props = defineProps({
    group: {
        type: Object,
        default: {}
    }
})
</script>