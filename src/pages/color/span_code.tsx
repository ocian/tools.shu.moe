export const SpanCode = (props: { code?: string }) => {
  return (
    <>
      <code>{props.code || '---'}</code>
      {props.code && (
        <button type="button" className="btn btn-outline-secondary btn-sm mx-3">
          copy
        </button>
      )}
    </>
  )
}
