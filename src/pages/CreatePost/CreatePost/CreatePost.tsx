import About from "../../Subreddit/About/About";
import styles from "./CreatePost.module.css";
import AddPostForm from "../AddPostForm/AddPostForm";
import CSSModules from "react-css-modules";

const CreatePost: React.FC = () => {
  return (
    <section styleName="section">
      <AddPostForm />
      <aside styleName="aside">
        <About />
      </aside>
    </section>
  );
};

export default CSSModules(CreatePost, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
