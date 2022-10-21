import { Outlet } from "react-router";
import { Link, NavLink } from "react-router-dom";

const activeStyle = {
  color: "red",
  fontSize: 20,
};

// 반복되는 코드가 여러개 이기 때문에, 다음과 같이 '리팩토링' 하삼
const ArticleItem = ({ id }) => {
  return (
    <li>
      <NavLink
        to={`/articles/${id}`}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        게시글 {id}
      </NavLink>
    </li>
  );
};

const Articles = () => {
  return (
    <div>
      <Outlet />
      <ul>
        <ArticleItem id={1} />
        <ArticleItem id={2} />
        <ArticleItem id={3} />
      </ul>
    </div>
  );
};

export default Articles;
