import s from './index.module.css'
import About from './About/About';

const Subreddit: React.FC = () => {
  return (
    <div className={s['subreddit']}>
      <aside>
        <About />
      </aside>
    </div>
  )
}

export default Subreddit;