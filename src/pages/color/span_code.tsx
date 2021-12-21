export const SpanCode = (props: { code?: string }) => {
  function copy() {
    window.navigator.permissions
      .query({ name: 'clipboard-write' as any })
      .then((res) => {
        if (res.state === 'granted') {
          window.navigator.clipboard.writeText(props.code).then(() => {
            alert('success')
          })
        } else {
          console.log(res)
        }
      })
      .catch((res) => {
        console.log(res)
      })
  }

  return (
    <>
      <code>{props.code || '---'}</code>
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
