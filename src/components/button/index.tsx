import React from 'react'
import clsx from 'clsx'

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  colorType?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'
  outline?: boolean
  size?: 'lg' | 'sm' // 'large' or 'small'
}

export function Button(props: React.PropsWithChildren<ButtonProps>) {
  const {
    colorType = 'primary',
    outline = false,
    size,
    className,
    ...others
  } = props
  const outlinePrefix = outline ? 'outline-' : ''

  return (
    <button
      {...others}
      className={clsx(
        'btn',
        className,
        colorType ? 'btn-' + outlinePrefix + colorType : '',
        size ? 'btn-' + size : ''
      )}
    />
  )
}
