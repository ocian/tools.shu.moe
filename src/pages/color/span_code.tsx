import { useRef, useState } from 'react'
import * as utils from '../../utils'

export const SpanCode = (props: { code?: string }) => {
  const ref = useRef<HTMLElement>()
  const [htmlId] = useState((Math.random() + '_' + Date.now()).replace('.', ''))

  function copy() {
    utils.clipboard.copy(props.code)
  }

  return (
    <>
      <code ref={ref} id={htmlId}>
        {props.code || '---'}
      </code>
      {props.code && (
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm mx-3"
          onClick={copy}
        >
          copy
        </button>
      )}
    </>
  )
}
