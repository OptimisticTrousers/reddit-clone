import About from "../About/About";
import styles from "./CreatePost.module.css";
import AddPostForm from "../AddPostForm/AddPostForm";
import CSSModules from "react-css-modules";

const CreatePost: React.FC = () => {
  return (
    <section styleName="section">
      <AddPostForm />
      <About />
    </section>
  );
};

export default CSSModules(CreatePost, styles, { allowMultiple: true });
