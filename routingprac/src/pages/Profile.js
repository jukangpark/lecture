import { useParams } from "react-router-dom";
import { useEffect } from "react";

const data = {
  jukang: {
    name: "박주강",
    description: "리액트를 좋아하는 개발자",
  },
  suckhi: {
    name: "석히",
    description: "고전 소설 홍길동전의 주인공",
  },
};

const Profile = () => {
  const params = useParams();

  useEffect(() => {
    console.log(params);
  }, []);

  const profile = data[params.username];

  return (
    <div>
      <h1>사용자 프로필</h1>
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.description}</p>
        </div>
      ) : (
        <p>존재하지 않는 프로필입니다.</p>
      )}
    </div>
  );
};

export default Profile;
