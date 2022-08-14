import Comments from "../Comments/Comments";

const CommentsSection = () => {
  return (
    <div>
      <textarea placeholder="What are your thoughts"></textarea>
      <Comments />
    </div>
  );
};

export default CommentsSection;
