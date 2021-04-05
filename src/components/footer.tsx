import Wordmark from '@/assets/logo/wordmark.svg?inline'
import Icon from '@/assets/logo/icon.svg?inline'
import * as tsx from 'vue-tsx-support'
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
        }
    },
    render() {
        return (
            <div>
                <p class='text-medium text-dark-onSurfacePrimary text-lg'>{this.title}</p>
                <div
                    class='flex flex-col mt-5 gap-3'>
                    {this.items.map(item => (
                        <nuxt-link
                            class='text-dark-onSurfacePrimary hover:text-dark-onSurfaceSecondary transition duration-150 ease-in-out'
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
                <div class='container py-16'>
                    <div class='flex flex-col lg:flex-row gap-12'>
                        <div
                            class='flex-1 flex flex-col items-center md:items-start'>
                            <nuxt-link
                                class='text-dark-onSurfacePrimary flex'
                                to='/'>
                                {/* <Icon class='fill-current h-8 w-auto' /> */}
                                <Wordmark class='fill-current h-8 w-auto' />
                            </nuxt-link>
                            <div
                                class='h-px w-full my-2 lg:my-6 lg:bg-dark-onSurfaceSecondary' />
                            <h1 class='w-full text-dark-onSurfacePrimary text-2xl font-medium text-center md:text-left'>
                                {this.$t('pages.index.hero.slogan')}
                            </h1>
                            <h2
                                class=' w-full text-dark-onSurfaceSecondary text-base text-center md:text-left'
                                domPropsInnerHTML={this.$t('pages.index.hero.description') as any} />
                        </div>
                        <div class='flex-1 grid grid-cols-2 md:grid-cols-3 gap-12'>
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
                    <div
                        class='flex flex-col gap-12 lg:flex-row justify-between text-dark-onSurfaceSecondary pt-12 text-xs'>
                        <div
                            class='flex jus gap-6'>
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
                                    class='text-dark-onSurfaceSecondary hover:text-dark-onSurfacePrimary transition duration-150 ease-in-out'
                                    href={to}>
                                    <Tag class='h-5 w-5 fill-current' />
                                </a>
                            ))}
                        </div>
                        <div
                            class='flex justify-between gap-6'>
                            <nuxt-link
                                to='#0'>
                                English
                            </nuxt-link>
                        </div>
                    </div>
                    <div
                        class='flex justify-between text-dark-onSurfaceSecondary pt-12 text-xs'>
                        <span>© 2020 Buss</span>
                        <div
                            class='flex justify-between gap-6'>
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
