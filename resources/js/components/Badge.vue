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

<style scoped>

    .resource-label {
        width: 6.8rem;
    }

    /* Setting custom width to a single element Legal & Terms */
    div.external-link > a > div > div.resource-label {
        width: auto;
    }

    .badge {
        background: var(--collapsible-menu-badge-color, var(--badge-blue));
        padding: 0.15rem 0.35rem;
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        align-self: center;

        display: flex;
        flex: 1;
        justify-content: center;
        min-width: 52px;
        max-width: 53px;
    }

    .text-xxs {
        font-size: .60rem;
        font-weight: 400;
        color: var(--background-blue-dark);
    }

</style>
