<template>
    <ul class="list-reset">
        <div v-if="isTopLevelCollapse" class="collapsible-top-level-title">
            <span class="icon" v-html="topLevelIcon"/>
            <span class="text">
                {{ topLevelLabel }}
            </span>
        </div>

        <li class="leading-tight pt-5 pl-6" 
            v-for="resource of resources" 
            :class="[ { 'group-resources': recursive } ]">

            <collapsible-resource-manager v-if="resource.type === 'group'"
                                          :data="resource"
                                          :remember-menu-state="rememberMenuState"
                                          recursive/>

            <div v-else-if="resource.type === 'external_link'" class="external-link">
                <a class="relative text-white text-left no-underline dim block cursor-pointer"
                   :href="resource.url"
                   :target="resource.target">

                    <Badge :label="resource.badge">
                        {{ resource.label }}
                    </Badge>

                    <div v-if="resource.icon" class="absolute external-link-icon flex" v-html="resource.icon"/>

                    <svg v-else class="absolute external-link-icon" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"/>
                    </svg>
                </a>
            </div>
                
            <div v-else-if="resource.hasNoGroup" class="flex items-center">
                <router-link
                    class="relative text-white text-left no-underline dim block single-internal-link"
                    :class="{ 'cursor-default': resource.badge }"
                    :to="resource.router">

                    <Badge :label="resource.badge">
                        {{ resource.label }}
                    </Badge>
                </router-link>
            </div>

            <router-link v-else
                class="relative text-white text-left no-underline dim block"
                :class="[ resource.badge ? 'cursor-default' : 'cursor-pointer' ]"
                :to="resource.router"
                :target="resource.target"
                v-slot="{ href, route, navigate, isActive, isExactActive }">

                <NavLink :active="isExactActive" :href="href" @click="navigate">
                    <div v-if="resource.icon" class="absolute resource-list-icon flex" v-html="resource.icon"/>

                    <Badge :label="resource.badge">
                        {{ resource.label }}
                    </Badge>
                </NavLink>                   
            </router-link>              
        </li>
    </ul>
</template>

<script>
    import Badge from './Badge'

    export default {
        name: 'ResourceList',

        components: { Badge },

        props: {
            topLevelLabel: { type: String, required: true},
            topLevelIcon: { type: String, required: true },
            resources: { type: Array, required: true },
            recursive: { type: Boolean, default: false },
            rememberMenuState: { type: Boolean, required: true }
        },

        computed: {
            isTopLevelCollapse() {
                return this.topLevelLabel != null ? true : false; 
            }
        }
    }
</script>

