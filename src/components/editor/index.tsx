import * as monaco from 'monaco-editor'
import { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

export function Editor() {
  const [loading, setLoading] = useState(false)
  const divEl = useRef<HTMLDivElement>(null)
  let editor: monaco.editor.IStandaloneCodeEditor
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      editor?.layout()
    })
    if (divEl.current) {
      import('monaco-editor').then((m) => {
        setLoading(false)
        editor = m.editor.create(divEl.current, {
          value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join(
            '\n'
          ),
          language: 'typescript',
          fontSize: 16,
          tabSize: 2,
          fontLigatures: true,
          renderWhitespace: 'boundary',
          wordWrap: 'on',
          renderControlCharacters: true,
          rulers: [80, 120],
          theme: 'vs-light+',
        })
        resizeObserver.observe(divEl.current)
      })
    }
    return () => {
      editor.dispose()
      resizeObserver.disconnect()
    }
  }, [])
  return (
    <div className={styles.editor} ref={divEl}>
      {loading && 'loading...'}
    </div>
  )
}
