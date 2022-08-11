import About from "../About/About";
import s from "./CreatePost.module.css";
import AddPostForm from "../AddPostForm/AddPostForm";

const CreatePost: React.FC = () => {
  return (
    <section className={s["section"]}>
      <AddPostForm />
      <About />
    </section>
  );
};

export default CreatePost;
