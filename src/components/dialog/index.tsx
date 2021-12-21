import { useDialog } from '@react-aria/dialog'
import { FocusScope } from '@react-aria/focus'
import { useModal, useOverlay } from '@react-aria/overlays'
import { useRef } from 'react'
import styles from './dialog.module.scss'

export const Dialog = (props) => {
  let ref = useRef()
  let { modalProps } = useModal()
  let { overlayProps, underlayProps } = useOverlay(props, ref)
  let { dialogProps, titleProps } = useDialog(props, ref)
  return (
    <div className={styles.background} {...underlayProps}>
      <FocusScope contain restoreFocus autoFocus>
        <div {...overlayProps} {...dialogProps} {...modalProps} ref={ref}>
          {props.children}
        </div>
      </FocusScope>
    </div>
  )
}
