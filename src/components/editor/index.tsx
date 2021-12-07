import * as monaco from 'monaco-editor'
import { useEffect, useRef } from 'react'
import styles from './index.module.scss'

// @ts-ignore
self.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: any, label: string) {
    if (label === 'json') {
      return new URL(
        'monaco-editor/esm/vs/language/json/json.worker',
        import.meta.url
      )
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new URL(
        'monaco-editor/esm/vs/language/css/css.worker',
        import.meta.url
      )
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new URL(
        'monaco-editor/esm/vs/language/html/html.worker',
        import.meta.url
      )
    }
    if (label === 'typescript' || label === 'javascript') {
      return new URL(
        'monaco-editor/esm/vs/language/typescript/ts.worker',
        import.meta.url
      )
    }
    return new URL(
      'monaco-editor/esm/vs/editor/editor.worker.js',
      import.meta.url
    )
  },
}

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
