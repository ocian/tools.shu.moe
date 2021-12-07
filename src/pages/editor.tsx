import { Editor, render } from '../components'
import styles from '../styles/editor.module.scss'

const EditorPage = () => {
  return (
    <div className={styles.page}>
      <Editor />
    </div>
  )
}

render(EditorPage)
