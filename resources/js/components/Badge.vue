<template>
    <div class="flex flex-1 items-center">
        <div :class="{ dim: dim }" class="flex-shrink resource-label">
            <slot/>
        </div>

        <div v-if="label" class="badge w-auto rounded-full text-xxs ml-2 self-center">
            {{ label }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Badge',
        props: {
            dim: {
                type: Boolean
            },
            label: {
                type: String
            }
        }
    }
</script>

