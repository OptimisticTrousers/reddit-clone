import About from "../../layouts/About/About";
import styles from "./CreatePost.module.css";
import AddPostForm from "./AddPostForm/AddPostForm";
import CSSModules from "react-css-modules";
import Main from "../../layouts/Main/Main";
import Aside from "../../layouts/Aside/Aside";

const CreatePost: React.FC = () => {
  return (
    <Main>
      <AddPostForm />
      <Aside>
        <About />
      </Aside>
    </Main>
  );
};

export default CSSModules(CreatePost, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
