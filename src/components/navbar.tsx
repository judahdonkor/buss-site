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
            // class="tw-bg-light-elevatedSurface tw-border-b tw-border-light-border lg:tw-border-0  tw-transition-colors duration-300 ease-linear"
            >
                <div
                    class='tw-h-16 tw-bg-light-elevatedSurface'
                // class="tw-container max-tw-w-7xl tw-mx-auto tw-px-2 sm:tw-px-6 lg:tw-px-8"
                >
                    <div class="tw-container tw-h-full tw-flex tw-items-center">
                        <div
                            class='sm:tw-hidden tw-text-light-onSurfaceSecondary hover:tw-text-light-onSurfacePrimary focus:tw-outline-none tw-transition tw-duration-150 tw-ease-in-out relative cursor-pointer'
                            onClick={() => this.burger = !this.burger}>
                            <IconBarsSolid class={`tw-h-6 tw-w-6 ${this.burger ? 'tw-opacity-100 tw-ease-out tw-delay-200' : 'tw-opacity-0 tw-ease-in'} tw-transition tw-duration-100`} />
                            <IconTimesSolid class={`tw-h-6 tw-w-6 tw-absolute tw-top-0 tw-left-0 ${this.burger ? 'tw-opacity-0 tw-ease-in tw-rotate-180 tw-scale-0' : 'tw-opacity-100 tw-ease-out tw-rotate-0 tw-delay-100 tw-scale-100'} tw-transition tw-transform tw-duration-200`} />
                        </div>
                        <div class="tw-flex-1 tw-flex tw-items-center tw-justify-center sm:tw-justify-start">
                            <nuxt-link
                                class='tw-flex tw-items-center tw-text-light-onSurfacePrimary hover:tw-text-cornflower-blue tw-transition tw-duration-150 tw-ease-in-out'
                                to='/'>
                                <Abstract class='tw-h-8 tw-w-auto' />
                                <div class='sm:tw-hidden md:tw-block' style={{
                                    'tw-flex-basis': '0.4rem'
                                }} />
                                <Wordmark class='sm:tw-hidden md:tw-block tw-fill-current tw-h-6 tw-w-auto' />
                            </nuxt-link>
                            <div class="tw-hidden sm:tw-block ">
                                <nav class="tw-pl-3">
                                    {Object.entries(this.$t('components.navbar.links')).filter(e => {
                                        if (e[0] === 'sign_in') return false
                                        if (e[0] === 'account' && !this.$accessor.person) return false
                                        return true
                                    }).map(link => (
                                        <nuxt-link
                                            class={`tw-font-medium tw-px-4 hover:tw-text-light-onSurfaceSecondary tw-transition tw-duration-150 tw-ease-in-out ${this.$route.fullPath.startsWith(`/${link[0]}`) ? 'tw-text-light-onSurfaceSecondary' : 'tw-text-light-onSurfacePrimary'}`}
                                            to={`/${link[0]}`}
                                            onClick={() => this.reset()}>
                                            {link[1]}
                                        </nuxt-link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                        <div class='tw-flex tw-items-center'>
                            {!this.$accessor.person && [
                                (
                                    <nuxt-link
                                        // tag='button'
                                        class='tw-font-medium md:tw-px-4 tw-text-light-onSurfacePrimary hover:tw-text-light-onSurfaceSecondary tw-flex tw-items-center tw-transition tw-duration-150 tw-ease-in-out'
                                        to='/sign-in'
                                        onClick={() => this.reset()}>
                                        <span class='tw-hidden lg:tw-block'>{this.$t('components.navbar.links.sign_in')}</span>
                                        <IconSignInSolid class='tw-h-6 tw-w-6 tw-ml-2 lg:tw-hidden tw-block' />
                                    </nuxt-link>
                                ),
                                (
                                    <b-button
                                        class='tw-hidden md:tw-block tw-w-auto tw-ml-4 tw-font-medium'
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
                                            class='tw-w-8 tw-h-8 tw-rounded-full tw-border-light-surface tw-border-8 tw-tw-shadow-2xl'
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
                                                    class='tw-w-8 tw-h-8 tw-rounded-full tw-border-light-surface tw-border-8 tw-tw-shadow-2xl'
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

                <div class={`lg:tw-hidden ${this.burger ? 'tw-hidden' : 'tw-block'}`}>
                    <div class="tw-px-2 tw-pt-2 tw-pb-3">
                        {Object.entries(this.$t('components.navbar.links')).filter(e => e[0] !== 'sign_in').map((link, idx) => (
                            <nuxt-link
                                class={`${idx !== Object.entries(this.$t('components.navbar.links')).filter(e => {
                                    if (e[0] === 'sign_in') return false
                                    if (e[0] === 'account' && !this.$accessor.person) return false
                                    return true
                                }).length - 1
                                    ? 'tw-border-b'
                                    : ''} tw-flex tw-px-3 tw-py-2 tw-rounded-md tw-text-base tw-font-medium tw-text-gray-900 hover:tw-bg-gray-100 focus:tw-outline-none focus:tw-bg-gray-200 tw-transition tw-duration-150 tw-ease-in-out`}
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