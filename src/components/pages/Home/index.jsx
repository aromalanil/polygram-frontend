import PostQuestion from './PostQuestion';
import UserFeed from '../../common/UserFeed';

const Home = () => (
  <>
    <PostQuestion />
    <UserFeed following />
  </>
);

export default Home;
