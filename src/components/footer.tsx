import Wordmark from '@/assets/logo/wordmark.svg?inline'
import Icon from '@/assets/logo/icon.svg?inline'
import * as tsx from 'vue-tsx-support'
import Subscribe from './Subscribe.vue'
import { IconEnvelopeSolid, IconFacebookBrands, IconGithubBrands, IconInstagramBrands, IconLinkedinBrands, IconTwitterBrands, IconYoutubeBrands } from '~/components/icons'

const Menu = tsx.component({
    props: {
        title: {
            type: String,
            required: true
        },
        items: {
            type: Array as () => [string, string][],
            required: true
        },
        subtitle: {
            type: String
        }
    },
    render() {
        return (
            <div>
                <p class='tw-text-medium tw-text-dark-onSurfacePrimary tw-font-black'>{this.title}</p>
                <div
                    class='tw-flex tw-flex-col tw-mt-5 tw-gap-3'>
                    {this.items.map(item => (
                        <nuxt-link
                            class='tw-text-dark-onSurfacePrimary hover:tw-text-dark-onSurfaceSecondary tw-transition tw-duration-150 tw-ease-in-out'
                            to={item[1]}>
                            {item[0]}
                        </nuxt-link>
                    ))}
                </div>
            </div>
        )
    }
})

const Footer = tsx.component({

    
    render() {
        return (
            <footer
                // class='bg-light-onSurfaceSecondary' 
                style={{
                    'background-color': '#000033'
                    // 'background-color': 'hsl(215, 40%, 31%)'
                }}
            >
                <div class='tw-container tw-py-16'>
                    <div class='tw-flex tw-flex-col lg:tw-flex-row tw-gap-12'>
                        <div
                            class='tw-flex-1 tw-flex tw-flex-col tw-items-center md:tw-items-start'>
                            <nuxt-link
                                class='tw-text-dark-onSurfacePrimary tw-flex'
                                to='/'>
                                {/* <Icon class='tw-fill-current tw-h-8 tw-w-auto' /> */}
                                <Wordmark class='tw-fill-current tw-h-8 tw-w-auto' />
                            </nuxt-link>
                            <div
                                class='tw-h-px tw-w-full tw-my-2 lg:tw-my-6 lg:tw-bg-dark-onSurfaceSecondary' />
                            <h1 class='tw-w-full tw-text-dark-onSurfacePrimary tw-text-2xl tw-font-medium tw-text-center md:tw-text-left'>
                                {this.$t('pages.index.hero.slogan')}
                            </h1>
                            <h2
                                class=' tw-w-full tw-text-dark-onSurfaceSecondary tw-text-base tw-text-center md:tw-text-left'
                                domPropsInnerHTML={this.$t('pages.index.hero.description') as any} />
                        </div>
                        <div class='tw-flex-1 tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-12'>
                            <Menu
                                title='Solutions'
                                items={[
                                    ['Inventory', '/apps/inventory'],
                                    ['Sales', '/apps/sales'],
                                    ['Accounting', '/apps/accounting'],
                                    ['Other Apps', '/apps'],
                                    // ['Custom Build', '/']
                                ]} />
                            <Menu
                                title='Resources'
                                items={[
                                    ['Documentation', '/docs'],
                                    ['How-to', '#0']
                                ]} />
                            <Menu
                                title='Buss'
                                items={[
                                    ['About us', '#0'],
                                    ['Contact us', '#0'],
                                    // ['Blog', '/'],
                                    // ['Partners', '/']
                                ]} />


                        </div>
                    </div>
                   
                            <Subscribe />
                  

                    <div
                        class='tw-flex tw-flex-col tw-gap-12 lg:tw-flex-row tw-justify-between tw-text-dark-onSurfaceSecondary tw-pt-12 tw-text-xs'>
                        <div
                            class='tw-flex jus tw-gap-6'>
                            {[
                                [IconFacebookBrands, '#0'],
                                [IconTwitterBrands, '#0'],
                                [IconYoutubeBrands, '#0'],
                                [IconLinkedinBrands, '#0'],
                                [IconGithubBrands, '#0'],
                                [IconInstagramBrands, '#0'],
                                [IconEnvelopeSolid, '#0'],
                            ].map(([Tag, to]) => (
                                <a
                                    class='tw-text-dark-onSurfaceSecondary hover:tw-text-dark-onSurfacePrimary tw-transition tw-duration-150 tw-ease-in-out'
                                    href={to}>
                                    <Tag class='tw-h-5 tw-w-5 tw-fill-current' />
                                </a>
                            ))}
                        </div>
                        <div
                            class='tw-flex tw-justify-between tw-gap-6'>
                            <nuxt-link
                                to='#0'>
                                English
                            </nuxt-link>
                        </div>
                    </div>
                    <div
                        class='tw-flex tw-justify-between tw-text-dark-onSurfaceSecondary tw-pt-12 tw-text-xs'>
                        <span>© {new Date().getFullYear()} Buss</span>
                        <div
                            class='tw-flex tw-justify-between tw-gap-6'>
                            <nuxt-link
                                to='#0'>
                                Privacy
                            </nuxt-link>
                            <nuxt-link
                                to='#0'>
                                Terms
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
})

export { Footer }
