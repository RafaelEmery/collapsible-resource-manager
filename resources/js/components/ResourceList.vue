<template>

    <ul class="list-reset">

        <li class="leading-tight pt-4 pl-2" 
            v-for="resource of resources" 
            :class="[ { 'recursive-resources': recursive } ]">

            <collapsible-resource-manager v-if="resource.type === 'group'"
                                          :data="resource"
                                          :remember-menu-state="rememberMenuState"
                                          recursive/>

            <div class="external-link" v-else-if="resource.type === 'external_link'">
                <a class="relative text-white text-left no-underline dim block"
                   :href="resource.url"
                   :target="resource.target">

                    <Badge :label="resource.badge">
                        {{ resource.label }}
                    </Badge>

                    <div v-if="resource.icon" class="absolute resource-list-icon flex" v-html="resource.icon"/>

                    <svg v-else class="absolute resource-list-icon"
                         viewBox="0 0 24 24"
                         width="24"
                         height="24">

                        <path
                            fill="currentColor"
                            d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"/>

                    </svg>

                </a>

            </div>

            <span v-else>
                
                <div v-if="resource.hasNoGroup" class="flex items-center">
                    <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2" cy="2" r="2" fill="white"/>
                    </svg> 
                    <router-link
                        class="relative text-white custom-internal-link text-left no-underline dim block"
                        :to="resource.router"
                        :target="resource.target">

                    <div v-if="resource.icon" class="absolute resource-list-icon flex" v-html="resource.icon"/>

                    <Badge :label="resource.badge">
                        {{ resource.label }}
                    </Badge>

                    </router-link>
                </div>

                <span v-else>
                    <router-link
                        class="relative text-white simple-resource text-left no-underline dim block"
                        :to="resource.router"
                        :target="resource.target"
                        v-slot="{ href, route, navigate, isActive, isExactActive }">

                        <NavLink :active="isActive" :href="href" @click="navigate">
                            <div v-if="resource.icon" class="absolute resource-list-icon flex" v-html="resource.icon"/>

                            <Badge :label="resource.badge">
                                {{ resource.label }}
                            </Badge>
                        </NavLink>                   

                    </router-link>
                </span>
                                
            </span>

        </li>

    </ul>

</template>

<script>

    import Badge from './Badge'

    export default {
        name: 'ResourceList',
        components: { Badge },
        props: {
            resources: { type: Array, required: true },
            recursive: { type: Boolean, default: false },
            rememberMenuState: { type: Boolean, required: true }
        }
    }

</script>

<style>

    .external-link {
        margin-left: 1rem !important;
    }

    .custom-internal-link {
        padding-left: 0.5rem;
        font-weight: bold;
    }

    .resource-list-icon {
        width: 15px;
        top: -1px;
        left: -30px;
        margin-left: 0.85rem;
        padding-bottom: 0.25rem;
    }

    .custom-tools * {
        margin: 0;
        padding: 0;
        font-size: inherit;
        position: inherit;
    }

    .custom-tools svg, .custom-tools img {
        display: none;
    }

    .recursive-resources {
        font-weight: 400 !important;
        font-size: 0.875rem !important;
        padding-left: 1.25rem !important;
    }

</style>
