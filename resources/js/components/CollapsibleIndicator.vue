<template>

    <div class="absolute flex flex-auto collapsible-indicator" v-if="visible">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -8 24 24" width="24" height="24">

                <path v-if="expanded"
                    fill="currentColor"
                    d="M0.853578 1.96966L6.56058 7.67666L12.2676 1.96966L10.8536 0.555664L6.56058 4.84866L2.26758 0.555664L0.853578 1.96966Z"/>

                <path v-else
                    fill="currentColor"
                    d="M1.414 11.414L7.121 5.707L1.414 0L0 1.414L4.293 5.707L0 10L1.414 11.414Z"/>

            </svg>
    </div>

</template>

<script>

    export default {
        name: 'CollapsibleIndicator',
        props: {
            expanded: {
                default: true
            },
            visible: {
                default: false
            },
        },
    }

</script>

<style>

    .collapsible-indicator {
        top: -2px;
        right: 0;
    }

    h4 .collapsible-indicator {
        top: -5px;
    }

</style>
