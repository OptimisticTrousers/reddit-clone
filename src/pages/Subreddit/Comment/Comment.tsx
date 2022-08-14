import s from './Comment.module.css'
const Comment = () => {
  return (
    <div className={s["comment"]}>
      <div className={s["comment__author"]}>
        Example comment
      </div>
    </div>
  )
}

export default Comment