import ReactDOM from 'react-dom'
import './base.scss'

export function render(App: () => JSX.Element) {
  ReactDOM.render(<App />, document.querySelector('#root'), () => {
    console.log('render callback')
  })
}
