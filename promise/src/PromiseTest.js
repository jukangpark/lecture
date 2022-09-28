const PromiseTest = () => {
  // Promise 란?
  // 자바스크립트 표준 내장 객체 안의
  // 제어 추상화 객체(코드 구조화에 도움을 줌, 특히 비동기 코드를 깊게 중첩된 함수 없이 작성 할 수 있다)이다.
  // 표준 내장 객체 는 전역 객체와 다름.

  // new 키워드란 뭔가요?
  // new 연산자와 생성자 함수

  // 자바스크립트에서 new 키워드를 통해 객체를 생성해보도록 할게요
  // 자바스크립트에서 생성자 함수는 화살표 함수를 통해 만들 수 없음.. const user = () => return 암튼 이게 안됨.
  // function (ES5) vs 화살표 함수
  // function 키워드로 생성한 일반 함수 vs 화살표 함수의 가장 큰 차이는 this 이다.

  function User(name) {
    this.name = name;
    this.isAdmin = false;
  }

  console.log(new User("주강"));

  // 웹 브라우저 콘솔에서 console.log(this) 를 실행시켜보면
  // Window 객체가 나옴. -> 이거는 웹 브라우저를 의미함
  // console.log(this.innerWidth) 현재 브라우저의 너비
  // console.log(this.innerHeight) 현재 브라우저의 높이

  // new Promise 에 전달되는 함수는 실행함수 라고 부릅니다.
  // executor 는 new Promise 가 만들어질 때 자동으로 '실행'되는데
  // executor 에서는 결과를 즉시 얻든 늦게 얻든 상관없이, 상황에 따라
  // 인수로 넘겨준 콜백 중 하나를 반드시 호출해야 합니다.

  // resolve(value) - 일이 성공적으로 끝난 경우 그 결과를 나타내는 value 와 함께 호출
  // reject(error) - 에러 발생 시 에러 객체를 나타내는 error 와 함께 호출

  // 요약하면

  let promise = new Promise(function (resolve, reject) {
    // executor (실행자, 실행 함수)

    // setTimeout(() => resolve("done"), 3000);
    setTimeout(() => reject(new Error("에러발생!")), 1000);
  });

  // promise 객체의 프러퍼티는 state , result 가 존재하는데,
  // 이 프로퍼티 들은 '내부 프로퍼티' 이므로 개발자가 접근할 수 없습니다.
  // .then / .catch / .finally 메서드를 사용하면 접근 가능하긴 하다.

  promise.then(
    (result) => console.log(result),
    (error) => console.log(error)
  );

  // promise 의 첫 번째 인자는 프라미스의 state 가 fulfilled 되었을 때 실행되는 함수이고 여기서 실행 결과(result) 를 받습니다.
  // promise 의 두 번째 인자는 프라미스가 state 가 rejected 가 되었을 때 실행되는 함수이고, 여기서 에러(error) 를 받습니다.

  // 만약 작업이 성공적으로 처리된 경우만 다루고 싶다면, .then 에 인수를 하나만 전달해주면 됩니다.

  // 프라미스 체이닝이란?
  // 스크립트를 불러오는 것과 같이 순차적으로 처리해야 하는 비동기 작업이 여러개 있다고 가정해봅시다.
  // 어떻게 해야 이런 상황을 코드로 풀어낼 수 있을까요?

  // 프라미스 체이닝을 이용한 비동기 처리에 대해 알아보도록 하겠습니다.

  // 프라미스 체이닝이 가능한 이유는? -> promise.then 을 호출하면 프라미스가 반환되기 때문이다.
  // 반환된 프라미스에는 당연히 .then 을 호출할 수 있습니다.

  // 한편 핸들러가 값을 반환할 때엔 이 값이 프라미스의 result 가 됩니다. 따라서 .then 은 이 값을 이용해 호출됩니다.

  // 초보자는 프라미스 하나에 .then 을 여러개 추가하고 나서, 이를 체이닝이라고 착각하는 경우가 있습니다. 하지만 이는 체이닝이 아닙니다.
  // 주석 처리 : 이 커밑은 user.name 은 jukangpark 이고, user.email 은 skyxxx9339@naver.com

  console.log(
    "fetch 함수를 통해서 리턴된 건? ",
    fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
      console.log(res)
    )
  );

  return <div>PromiseTest</div>;
};

export default PromiseTest;
