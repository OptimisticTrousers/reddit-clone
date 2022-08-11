import About from "../About/About";
import s from "./CreatePost.module.css";

const CreatePost: React.FC = () => {
  return (
    <section className={s["section"]}>
      <AddPostForm />
      <About />
    </section>
  );
};

export default CreatePost;
