<template>
    <div v-if="!isEmpty || data.linkTo" 
         :class="[ data.type, {'responsive-top-level': isTopLevel} , 'select-none' ]"
         :style="[ isTopLevel ? { 'background-color': color } : { 'background-color': '#23263C;' }, isTopExpanded ? { 'padding': '0' } : { 'padding': '0.6rem 0' }]">
         
        <div v-if="isTopExpanded" class="selected-item-border selected-item-top" />

        <component v-if="data.label && isTopLevel" v-bind="topLevelLink"
                   :class="{ 'cursor-pointer': isTopCollapsible,  'py-2': isTopExpanded}"
                   @click="toggleTopLevel"
                   v-on-clickaway="clickAway"
                   class="flex flex-1 items-center text-white mb-2 text-base no-underline relative pl-3">

            <div v-if="data.icon" class="sidebar-icon collapsible-sidebar-tooltip">
                <span v-html="data.icon"/>
                <span v-if="data.icon" class="collapsible-sidebar-tooltip-text font-normal">
                    {{ data.label }} 
                </span>
            </div>

            <svg v-else class="sidebar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fill="var(--sidebar-icon)"
                      d="M3 1h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2H3c-1.1045695 0-2-.8954305-2-2V3c0-1.1045695.8954305-2 2-2zm0 2v4h4V3H3zm10-2h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2h-4c-1.1045695 0-2-.8954305-2-2V3c0-1.1045695.8954305-2 2-2zm0 2v4h4V3h-4zM3 11h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2H3c-1.1045695 0-2-.8954305-2-2v-4c0-1.1045695.8954305-2 2-2zm0 2v4h4v-4H3zm10-2h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2h-4c-1.1045695 0-2-.8954305-2-2v-4c0-1.1045695.8954305-2 2-2zm0 2v4h4v-4h-4z"/>
            </svg>
            
            <Badge :label="data.badge" :dim="isTopCollapsible || data.linkTo"/>
        </component>

        <div v-if="isTopExpanded" class="selected-item-border selected-item-bottom" />
 
        <FadeTransition :duration="300">
            <ResourceList class="resources-only collapsible-top-level"
                          v-if="isTopLevel && data.resources.length && (!isTopCollapsible || topExpanded)"
                          :top-level-label="data.label"
                          :top-level-icon="data.icon"
                          :resources="data.resources"
                          :recursive="recursive"
                          :remember-menu-state="rememberMenuState"
            />
        </FadeTransition>

        <template v-if="isGroup && data.resources.length">
            <h4 class="flex relative select-none text-white tracking-wide cursor-pointer group-header"
                v-if="data.label"
                @click="toggleGroup(data.id)"
                @click.stop>

                <Badge :label="data.badge">
                    {{ data.label }}
                </Badge>
                
                <CollapsibleIndicator :expanded="activeMenu[data.id]" :visible="isTopCollapsible" />
            </h4>

            <CollapseTransition :duration="150">
                <ResourceList v-if="activeMenu[data.id]"
                              :resources="data.resources"
                              :recursive="recursive"
                              :remember-menu-state="rememberMenuState"
                />                      
            </CollapseTransition>
        </template>
    </div>

    <div v-else-if="data.linkToPath"
         :class="[ data.type, [ {'responsive-top-level': isTopLevel}, {'link-top_level': isTopLevel} ], 'select-none']">

        <router-link v-if="data.label && isTopLevel"
                     v-bind="topLevelLink"
                     class="flex flex-1 items-center font-semibold text-white text-base mb-2 no-underline relative pl-4"
                     style="opacity: 1 !important;"
                     :to="data.linkToPath">
            
            <div v-if="data.icon" class="sidebar-icon collapsible-sidebar-tooltip">
                <span v-html="data.icon"/>
                <span v-if="data.icon" class="collapsible-sidebar-tooltip-text font-normal">
                    {{ data.label }} 
                </span>
            </div>

            <Badge :label="data.badge" :dim="data.linkToPath"/>
        </router-link>
    </div>
</template>

<script>
    import { CollapseTransition, FadeTransition } from 'vue2-transitions' 
    import { mixin as clickaway } from 'vue-clickaway'
    import ResourceList from './ResourceList'
    import Badge from './Badge'
    import CollapsibleIndicator from './CollapsibleIndicator'

    const primaryTopLevelColor = '#2B3646';
    const selectedTopLevelColor = '#7c64df';

    export default {
        name: 'CollapsibleResourceManager',

        components: { 
            CollapsibleIndicator,
            CollapseTransition,
            ResourceList,
            Badge,
            FadeTransition
        },

        mixins: [clickaway],

        props: {
            data: { type: Object, required: true },
            rememberMenuState: { type: Boolean, default: false },
            recursive: { type: Boolean, default: false },
        },

        data() {
            return {
                topExpanded: this.data.expanded,
                activeMenu: { [ this.data.id ]: this.data.expanded },
                color: primaryTopLevelColor,
            }
        },

        created() {
            if (this.rememberMenuState) {
                const state = localStorage.getItem(this.cacheKey)

                if (state) {
                    this.activeMenu[ this.data.id ] = JSON.parse(state)
                }
                this.$watch(() => this.activeMenu[ this.data.id ], state => {
                    localStorage.setItem(this.cacheKey, state)
                })
            }
        },

        computed: {
            isTopCollapsible() {
                return this.data.expanded === null ? false : true && this.data.linkTo === null
            },
            isTopExpanded() {
                return this.topExpanded === true;
            },
            isGroup() {
                return this.data.type === 'group'
            },
            isTopLevel() {
                return this.data.type === 'top_level'
            },
            cacheKey() {
                return `menu-state.${ this.data.id }`
            },
            isEmpty() {
                return this.data.resources.length === 0
            },
            topLevelLink() {
                if (this.data.linkTo) {
                    return {
                        is: 'router-link',
                        to: this.data.linkTo.router,
                        target: this.data.linkTo.target,
                        class: [ 'cursor-pointer', 'dim' ]
                    }
                }
                else if (this.data.linkToPath) {
                    return {
                        is: 'router-link',
                        to: this.data.linkToPath.router,
                        target: '_self',
                        class: [ 'cursor-pointer', 'dim' ]
                    }
                }
                return {
                    is: 'h3'
                }
            },
        },

        methods: {
            toggleTopLevel() {
                if (this.isTopCollapsible) {
                    if (this.color === primaryTopLevelColor) {
                        this.color = selectedTopLevelColor;
                    } else {
                        this.color = primaryTopLevelColor;
                    }

                    this.topExpanded = !this.topExpanded;
                }
            },
            toggleGroup(id) {
                this.activeMenu[ id ] = !this.activeMenu[ id ];   
            },
            clickAway() {
                if (this.topExpanded) {
                    this.topExpanded = !this.topExpanded;
                    this.color = primaryTopLevelColor; 
                }
            },
        }
    }
</script>


