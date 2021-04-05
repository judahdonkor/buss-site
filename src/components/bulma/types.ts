type Breakpoint =
  | 'is-mobile'
  | 'is-tablet'
  | 'is-desktop'
  | 'is-widescreen'
  | 'is-fullhd'

type Size = 'is-small' | 'is-medium' | 'is-large' | 'is-fullheight'

type Type =
  | 'is-primary'
  | 'is-danger'
  | 'is-info'
  | 'is-white'
  | 'is-black'
  | 'is-light'
  | 'is-dark'
  | 'is-success'
  | 'is-warning'

type Position =
  | 'is-top-right'
  | 'is-top'
  | 'is-top-left'
  | 'is-bottom-right'
  | 'is-bottom'
  | 'is-bottom-left'

export { Size, Type, Position, Breakpoint }
