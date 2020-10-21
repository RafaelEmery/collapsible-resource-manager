<template>

    <div class="flex flex-1 items-center">

        <div :class="{ dim: dim }" class="flex-shrink">
            <slot/>
        </div>

        <div v-if="label" class="badge w-auto rounded-full text-xxs ml-1 self-center">
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

<style scoped>

    .badge {
        background: var(--collapsible-menu-badge-color, var(--badge-blue));
        padding: 0.15rem 0.35rem;
        align-self: center;
    }

    .text-xxs {
        font-size: .60rem;
        color: var(--background-blue-dark);
    }

</style>
