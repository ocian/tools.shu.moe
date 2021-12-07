import { Button, render } from '../components'
import styles from '../styles/bootstrap.module.scss'

const BootstrapPage = () => {
  return (
    <div className={styles.container}>
      <Button>一个按钮</Button>
      <Button size="lg">lg</Button>
      <Button size="sm">sm</Button>
      <Button outline>outline</Button>
    </div>
  )
}

render(BootstrapPage)
