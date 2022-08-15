import CSSModules from "react-css-modules";
import styles from './Filter.module.css'

const Filter:React.FC = () => {
  return (
    <div>
      <h1></h1>
    </div>
  )
}

export default CSSModules(Filter, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});