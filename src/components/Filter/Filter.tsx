import CSSModules from "react-css-modules";
import Card from "../Card/Card";
import styles from './Filter.module.css'

const Filter:React.FC = () => {
  return (
    <Card >
      <h1>Bob jones</h1>
      <h1>Bob jones</h1>
      <h1>Bob jones</h1>
    </Card>
  )
}

export default CSSModules(Filter, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});