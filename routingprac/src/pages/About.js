import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";
// useLocation 이라는 훅은
// location 객체를 반환하며,
// 현재 사용자가 보고 있는 페이지 정보를 지니고 있습니다.
// 이 객체에는 다음과 같은 값들이 있습니다.

/* 
    1. pathname : 현재 주소의 경로 (쿼리스트링 제외)
    2. search : 맨 앞의 ? 문자 포함한 쿼리스트링 값
    3. hash : 주소의 # 문자열 뒤의 값 (주로 History API 가 지원되지 않는 구형 브라우저에서 클라이언트로
        라우팅을 사용할 때 쓰는 해시 라우터에서 사용합니다.)
    4. state : 페이지로 이동할 때 임의로 넣을 수 있는 값
    5. key : location 객체의 고유 값, 초기에는 default 이며 페이지가 변경될때마다,
    고유의 값이 생성됨.


    쿼리 스트링은 location.search 값을 통해 조회할 수 있습니다.
    URL 에 이렇게 작성해보삼.
    http://localhost:3001/about?detail=true&mode=1

    쿼리스트링을 따로 파싱까지 해야된다면 번거로울수도 있는데, 
    다행히도 리액트 라우터에서는 v6부터 useSearchParams 라는 
    Hook을 통해서 쿼리스트링을 더욱 쉽게 다룰 수 있게 됐습니다.
    다음은 이 Hook을 사용하여 쿼리스트링을 쉽게 파싱하여 사용하는 예시입니다.

    useSearchParams 는 배열 타입의 값을 반환하며, 
    첫번째 원소는 쿼리파라미터를 조회하거나 수정하는 메서드들이 담긴 객체를 반환합니다. 
    get 메서드를 통해 특정 쿼리파라미터를 조회할 수 있고, 
    set 메서드를 통해 특정 쿼리파라미터를 업데이트 할 수 있습니다. 
    만약 조회시에 쿼리파라미터가 존재하지 않는다면 null 로 조회됩니다. 
    두번째 원소는 쿼리파라미터를 객체형태로 업데이트할 수 있는 함수를 반환합니다.
*/

const About = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const detail = searchParams.get("detail");
  const mode = searchParams.get("mode");

  console.log(detail);
  console.log(mode);

  console.log(location);

  return (
    <div>
      <h1>소개</h1>
      <p>리엑트 라우터를 사용해</p>
      <p>쿼리 스트링 : {location.search}</p>
    </div>
  );
};

export default About;
