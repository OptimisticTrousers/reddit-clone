import s from "./AddPostForm.module.css";

const AddPostForm: React.FC = () => {
  return (
    <div className={s["post-creator"]}>
      <div className={s["post-creator__header"]}>
        <div className={s["post-creator__title"]}>Create a post</div>
        <div className={s["post-creator__drafts"]}>
          <button className={s["post-creator__button_type_drafts"]}>
            Drafts
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPostForm;
