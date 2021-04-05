import * as tsx from 'vue-tsx-support'
import { IconBarsSolid, IconSignInSolid, IconTimesSolid } from '~/components/icons'
import Abstract from '@/assets/logo/abstract.svg?inline'
import Wordmark from '@/assets/logo/wordmark.svg?inline'
import { merge as mergePerson } from '~/person'
import { changePassword } from '.'
import { MediaObject } from './bulma'

const Navbar = tsx.component({
    data() {
        return {
            burger: true,
            personDropdown: false
        }
    },
    methods: {
        async reset() {
            this.burger = true
            this.personDropdown = false
        },
        async signOut() {
            try {
                await this.$accessor.teardown()
            } catch (error) {
                this.$notifyError(error)
            }
        },
    },
    render() {
        return (
            <header
            // class="bg-light-elevatedSurface border-b border-light-border lg:border-0  transition-colors duration-300 ease-linear"
            >
                <div
                    class='h-16 bg-light-elevatedSurface'
                // class="container max-w-7xl mx-auto px-2 sm:px-6 lg:px-8"
                >
                    <div class="container h-full flex items-center">
                        <div
                            class='sm:hidden text-light-onSurfaceSecondary hover:text-light-onSurfacePrimary focus:outline-none transition duration-150 ease-in-out relative cursor-pointer'
                            onClick={() => this.burger = !this.burger}>
                            <IconBarsSolid class={`h-6 w-6 ${this.burger ? 'opacity-100 ease-out delay-200' : 'opacity-0 ease-in'} transition duration-100`} />
                            <IconTimesSolid class={`h-6 w-6 absolute top-0 left-0 ${this.burger ? 'opacity-0 ease-in rotate-180 scale-0' : 'opacity-100 ease-out rotate-0 delay-100 scale-100'} transition transform duration-200`} />
                        </div>
                        <div class="flex-1 flex items-center justify-center sm:justify-start">
                            <nuxt-link
                                class='flex items-center text-light-onSurfacePrimary hover:text-cornflower-blue transition duration-150 ease-in-out'
                                to='/'>
                                <Abstract class='h-8 w-auto' />
                                <div class='sm:hidden md:block' style={{
                                    'flex-basis': '0.4rem'
                                }} />
                                <Wordmark class='sm:hidden md:block fill-current h-6 w-auto' />
                            </nuxt-link>
                            <div class="hidden sm:block ">
                                <nav class="pl-3">
                                    {Object.entries(this.$t('components.navbar.links')).filter(e => {
                                        if (e[0] === 'sign_in') return false
                                        if (e[0] === 'account' && !this.$accessor.person) return false
                                        return true
                                    }).map(link => (
                                        <nuxt-link
                                            class={`font-medium px-4 hover:text-light-onSurfaceSecondary transition duration-150 ease-in-out ${this.$route.fullPath.startsWith(`/${link[0]}`) ? 'text-light-onSurfaceSecondary' : 'text-light-onSurfacePrimary'}`}
                                            to={`/${link[0]}`}
                                            onClick={() => this.reset()}>
                                            {link[1]}
                                        </nuxt-link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                        <div class='flex items-center'>
                            {!this.$accessor.person && [
                                (
                                    <nuxt-link
                                        // tag='button'
                                        class='font-medium md:px-4 text-light-onSurfacePrimary hover:text-light-onSurfaceSecondary flex items-center transition duration-150 ease-in-out'
                                        to='/sign-in'
                                        onClick={() => this.reset()}>
                                        <span class='hidden lg:block'>{this.$t('components.navbar.links.sign_in')}</span>
                                        <IconSignInSolid class='h-6 w-6 ml-2 lg:hidden block' />
                                    </nuxt-link>
                                ),
                                (
                                    <b-button
                                        class='hidden md:block w-auto ml-4 font-medium'
                                        type='is-primary'
                                        tag="nuxt-link"
                                        to='/sign-up'>
                                        {this.$t('cta')}
                                    </b-button>
                                )
                            ]}
                            {this.$accessor.person && (
                                <b-dropdown
                                    position="is-bottom-left"
                                    append-to-body
                                    aria-role="menu"
                                    trap-focus
                                >
                                    <a slot="trigger" role="button">
                                        <img
                                            class='w-8 h-8 rounded-full border-light-surface border-8 shadow-2xl'
                                            src={
                                                this.$accessor.person.photo ||
                                                (this.$accessor.person.gender === 'FEMALE'
                                                    ? '/images/female_avatar.svg'
                                                    : '/images/male_avatar.svg')
                                            }
                                        />
                                    </a>

                                    <b-dropdown-item
                                        aria-role="listitem"
                                        onClick={async () => {
                                            try {
                                                this.$accessor.SET_PERSON(
                                                    await mergePerson(this, this.$accessor.person!)
                                                )
                                            } catch (error) {
                                                this.$notifyError(error)
                                            }
                                        }}
                                    >
                                        <div class="columns is-mobile is-vcentered">
                                            <div class="column is-narrow">
                                                <img
                                                    class='w-8 h-8 rounded-full border-light-surface border-8 shadow-2xl'
                                                    src={
                                                        this.$accessor.person.photo ||
                                                        (this.$accessor.person.gender === 'FEMALE'
                                                            ? '/images/female_avatar.svg'
                                                            : '/images/male_avatar.svg')
                                                    }
                                                />
                                            </div>
                                            <div class="column">
                                                <p class="title is-6">
                                                    {this.$accessor.person.display}
                                                </p>
                                                <p class="subtitle is-6">
                                                    {this.$accessor.person.email}
                                                </p>
                                            </div>
                                        </div>
                                    </b-dropdown-item>
                                    <b-dropdown-item separator />
                                    {/* <b-dropdown-item
                                  aria-role="listitem"
                                  onClick={async () => {
                                    try {
                                      await mergePreferences(this, this.$accessor.personPrefs)
                                      this.$buefy.notification.open({
                                        message: 'Preferences changed successfully',
                                        type: 'is-success',
                                      })
                                    } catch (error) {
                                      this.$notifyError(error)
                                    }
                                  }}
                                >
                                  <MediaObject>
                                    <b-icon slot="left" icon="layer-group" />
                                    <p>Preferences</p>
                                  </MediaObject>
                                </b-dropdown-item> */}
                                    <b-dropdown-item
                                        aria-role="listitem"
                                        onClick={async () => {
                                            try {
                                                await changePassword({
                                                    ctx: this,
                                                    fullScreen: true
                                                })
                                                await this.signOut()
                                                this.$router.push('/sign-in')
                                                this.$buefy.notification.open({
                                                    message: 'Password changed successfully',
                                                    type: 'is-success',
                                                })
                                            } catch (error) {
                                                this.$notifyError(error)
                                            }
                                        }}
                                    >
                                        <MediaObject>
                                            <b-icon slot="left" icon="lock" />
                                            <p>Reset Password</p>
                                        </MediaObject>
                                    </b-dropdown-item>
                                    <b-dropdown-item
                                        aria-role="listitem"
                                        onClick={async () => {
                                            await this.signOut()
                                            this.$router.push('/')
                                        }}
                                    >
                                        <MediaObject>
                                            <b-icon slot="left" icon="sign-out-alt" />
                                            <p>Sign Out</p>
                                        </MediaObject>
                                    </b-dropdown-item>
                                    {/* <b-dropdown-item separator />
                                              <b-dropdown-item
                                                  aria-role="listitem"
                                                  onClick={() => this.$accessor.toggleMode()}>
                                                  <MediaObject>
                                                      <b-icon slot='left' icon={this.$accessor.darkMode ? 'sun' : 'moon'} />
                                                      <p>{this.$accessor.darkMode ? 'Light Mode' : 'Dark Mode'}</p>
                                                  </MediaObject>
                                              </b-dropdown-item> */}
                                </b-dropdown>
                            )}
                        </div>
                    </div>
                </div>

                <div class={`lg:hidden ${this.burger ? 'hidden' : 'block'}`}>
                    <div class="px-2 pt-2 pb-3">
                        {Object.entries(this.$t('components.navbar.links')).filter(e => e[0] !== 'sign_in').map((link, idx) => (
                            <nuxt-link
                                class={`${idx !== Object.entries(this.$t('components.navbar.links')).filter(e => {
                                    if (e[0] === 'sign_in') return false
                                    if (e[0] === 'account' && !this.$accessor.person) return false
                                    return true
                                }).length - 1
                                    ? 'border-b'
                                    : ''} flex px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out`}
                                to={`/${link[0]}`}
                                onClick={() => this.reset()}>
                                {link[1]}
                            </nuxt-link>
                        ))}
                    </div>
                </div>
            </header >
        )
    }
})

export { Navbar }