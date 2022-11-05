import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <li>
        <Link to="/">Home</Link>
        <Link to="/post">작성하기</Link>
      </li>
    </header>
  );
};

export default Header;
