import { BiDotsVerticalRounded } from 'react-icons/bi';
import { getShortString } from '../../../../utils/string';
import Avatar from '../../../common/Avatar';
import './style.scss';

const NavUserDetails = () => {
  const name = 'John Doe';
  const username = 'i_am_john_doe';

  return (
    <div className="nav-user-details">
      <Avatar
        className="nav-avatar"
        name="Spider-man"
        src="https://i.insider.com/5f778d302400440019129c6a?width=700"
      />
      <div className="nav-details-right">
        <div className="details">
          <h3>{getShortString(name, 12)}</h3>
          <p>{`@${getShortString(username, 16)}`}</p>
        </div>
        <div className="options">
          <BiDotsVerticalRounded />
        </div>
      </div>
    </div>
  );
};

export default NavUserDetails;
