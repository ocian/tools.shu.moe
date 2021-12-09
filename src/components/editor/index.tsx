import * as monaco from 'monaco-editor'
import { useEffect, useRef } from 'react'
import styles from './index.module.scss'

export function Editor() {
  const divEl = useRef<HTMLDivElement>(null)
  let editor: monaco.editor.IStandaloneCodeEditor
  useEffect(() => {
    if (divEl.current) {
      editor = monaco.editor.create(divEl.current, {
        value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join(
          '\n'
        ),
        language: 'typescript',
      })
    }
    return () => {
      editor.dispose()
    }
  }, [])
  return <div className={styles.editor} ref={divEl}></div>
}
