<template>

    <div v-if="!isEmpty || data.linkTo" 
         :class="[ data.type, [ { 'pt-4': isTopLevel }, {'pb-2': isTopLevel} ], 'select-none']" 
         :style="[ isTopLevel ? { 'background-color': color } : { 'background-color': '#23263C' } ]">

        <component v-if="data.label && isTopLevel" v-bind="topLevelLink"
                   @click="toggleTopLevel()"
                   v-on-clickaway="clickAway"
                   :class="{ 'cursor-pointer': isTopCollapsible }"
                   class="flex flex-1 items-center font-normal text-white mb-2 text-base no-underline relative pl-4">

            <div v-if="data.icon" class="sidebar-icon" v-html="data.icon"/>

            <svg v-else class="sidebar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fill="var(--sidebar-icon)"
                      d="M3 1h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2H3c-1.1045695 0-2-.8954305-2-2V3c0-1.1045695.8954305-2 2-2zm0 2v4h4V3H3zm10-2h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2h-4c-1.1045695 0-2-.8954305-2-2V3c0-1.1045695.8954305-2 2-2zm0 2v4h4V3h-4zM3 11h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2H3c-1.1045695 0-2-.8954305-2-2v-4c0-1.1045695.8954305-2 2-2zm0 2v4h4v-4H3zm10-2h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2h-4c-1.1045695 0-2-.8954305-2-2v-4c0-1.1045695.8954305-2 2-2zm0 2v4h4v-4h-4z"/>
            </svg>

            <Badge :label="data.badge" :dim="isTopCollapsible || data.linkTo">

                <span class="flex text-white sidebar-label">
                    {{ data.label }}
                </span>
                
                <CollapsibleIndicator :expanded="topExpanded" :visible="isTopCollapsible"/>

            </Badge>

        </component>
 
        <SlideXLeftTransition :duration="350">

            <ResourceList class="resources-only custom-top-level w-sidebar"
                          v-if="isTopLevel && data.resources.length && (!isTopCollapsible || topExpanded)"
                          :resources="data.resources"
                          :recursive="recursive"
                          :remember-menu-state="rememberMenuState">
            </ResourceList>

        </SlideXLeftTransition>

        <template v-if="isGroup && data.resources.length" style="background-color: #23263C">

            <h4 class="relative select-none ml-8 mt-4 text-lg text-white tracking-wide cursor-pointer"
                v-if="data.label"
                @click="toggleGroup(data.id)"
                @click.stop>

                <CollapsibleIndicator :expanded="activeMenu[data.id]" :visible="isTopCollapsible" />

                <Badge :label="data.badge">
                    {{ data.label }}
                </Badge>

            </h4>

            <CollapseTransition :duration="150">

                <ResourceList v-if="activeMenu[data.id]"
                              :resources="data.resources"
                              :recursive="recursive"
                              :remember-menu-state="rememberMenuState"/>                

            </CollapseTransition>

        </template>

    </div>

</template>

<script>

    import { CollapseTransition, SlideXLeftTransition } from 'vue2-transitions' 
    import { mixin as clickaway } from 'vue-clickaway'
    import ResourceList from './ResourceList'
    import Badge from './Badge'
    import CollapsibleIndicator from './CollapsibleIndicator'

    const primaryTopLevelColor = '#2B3646';
    const selectedTopLevelColor = '#23263C'; 

    export default {
        name: 'CollapsibleResourceManager',

        components: { CollapsibleIndicator, CollapseTransition, ResourceList, Badge, SlideXLeftTransition },

        mixins: [ clickaway ],

        props: {
            data: { type: Object, required: true },
            rememberMenuState: { type: Boolean, default: false },
            recursive: { type: Boolean, default: false },
        },
        data() {
            return {
                topExpanded: this.data.expanded,
                activeMenu: { [ this.data.id ]: this.data.expanded },
                color: primaryTopLevelColor
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
            isGroup() {
                return this.data.type === 'group'
            },
            isTopLevel() {
                //Para o TopLevel
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

                return {
                    is: 'h3'
                }

            }
        },
        methods: {
            toggleTopLevel() {
                if (this.isTopCollapsible) {
                    this.topExpanded = !this.topExpanded;
                    
                    if (this.color === primaryTopLevelColor) {
                        this.color = selectedTopLevelColor;
                    } else {
                        this.color = primaryTopLevelColor;
                    }
                }
            },
            toggleGroup(id) {
                this.activeMenu[ id ] = !this.activeMenu[ id ]
            },
            clickAway() {
                if (this.topExpanded) {
                    this.topExpanded = !this.topExpanded;
                    this.color = primaryTopLevelColor; 
                }
            },
            // toggleselectedTopLevelColor() {
                
            // }
        }
    }

</script>

<style scoped>

    .top_level ul li:first-child {
        padding-top: 0;
    }

    .group ul li:first-child {
        padding-top: 1rem;
    }

    .group h4 {
        margin-left: 0;
    }

    .group h4:first-child {
        margin-top: 0;
    }

    /* Customized TopLevelResource for side slide */
    .custom-top-level {
        background-color: var(--background-blue-dark);

        position: absolute;
        top: 60px;
        bottom: 0;

        margin-left: 12.25rem;
        padding-right: 0.5rem;
        z-index: 999;
    }

    /* #23263C */
    

</style>

