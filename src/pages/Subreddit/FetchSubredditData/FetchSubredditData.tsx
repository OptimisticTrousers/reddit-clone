import { useEffect } from "react"
import CSSModules from "react-css-modules"
import { Outlet, useParams } from "react-router-dom";
import styles from "./FetchSubredditData.module.css"

const FetchSubredditData = () => {

  const { subredditName } = useParams();
  console.log(subredditName)
  // useeffect(() => {

  // })
  return <Outlet />
}

export default CSSModules(FetchSubredditData, styles, {allowMultiple: true, handleNotFoundStyleName: "log"})