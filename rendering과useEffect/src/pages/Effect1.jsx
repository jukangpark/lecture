import { useEffect } from "react";

const Effect1 = () => {
  useEffect(() => {
    console.log(
      "Effect1 페이지가 최초로 화면에 나타나게 되었을 때, console.log 가 실행됨"
    );
  }, []);

  return (
    <div>
      <h1>Effect1</h1>
      <p>content</p>
    </div>
  );
};

export default Effect1;
