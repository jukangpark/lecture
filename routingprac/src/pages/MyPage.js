import { Navigate } from "react-router";

const MyPage = () => {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return <div>MyPage</div>;
};

export default MyPage;
