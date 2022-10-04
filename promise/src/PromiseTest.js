import { useState, useEffect } from "react";

const PromiseTest = () => {
  const [users, setUsers] = useState([]);
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

  // 자바스크립트에서 모든 함수는 실행될 때마다 함수 내부에 this 라는 객체가 추가된다.

  // 일반 함수에서의 this 는
  // 1. 함수 실행 시, 전역 (window) 객체를 가리킨다.
  // 2. 메서드로 실행 시에는 메서드를 소유하고 있는 객체를 가리킨다
  // 3. 생성자 실행 시에는 새롭게 만들어진 객체를 가리킨다.

  console.log(this); // 왜 안나올까? 화살표 함수 내에서 선언된 this 이니까

  function User(name) {
    this.name = name;
    this.isAdmin = false;
  }

  console.log(new User("주강"));

  // 화살표 함수에서의 this 는
  // 선언할 때 this 에 바인딩할 객체가 정적으로 결정된다.
  // 화살표 함수의 this 는 언제가 상위 스코프의 this 를 가리킨다. (Lexical this)

  // ---------------------- example

  function Fun() {
    this.name = "하이";
    return {
      name: "바이",
      speak: function () {
        console.log(this.name);
      },
    };
  }

  function ArrFun() {
    this.name = "하이";
    return {
      name: "바이",
      speak: () => {
        console.log(this.name);
      },
    };
  }

  const fun1 = new Fun();
  fun1.speak(); // 바이

  const fun2 = new ArrFun();
  fun2.speak(); // 하이

  // 생성자 함수를 통해 instance 를 만든다고 하더라도,
  // 결국 상속이라는 것은 prototype 에 의해 되는 것이다.

  console.log(new Array());
  console.log([]);

  // 프로토타입이 뭐임?
  function Person(name) {
    this.name = name;
    // this.getType: function () {
    //   return "인간";
    // }
  }

  const jukang = new Person();
  const jisu = new Person();

  Person.prototype.getType = function () {
    return "인간";
  };

  console.log(jukang.getType());
  console.log(jisu.getType());

  const array1 = [];

  console.log(array1);

  let animal = {
    eats: true,
    walk() {
      console.log("동물은 걷습니다.");
    },
  };

  let rabbit = {
    jumps: true,
    __proto__: animal, // 여기서 animal 이 rabbit 의 프로토타입이 되도록 설정하였습니다.
  };

  // rabbit.__proto__ = animal; // 여기서 animal 이 rabbit 의 프로토타입이 되도록 설정하였습니다.

  console.log(rabbit.eats);
  console.log(rabbit.jumps);

  console.log("내가 가진 래빗", rabbit.hasOwnProperty("jumps"));
  // object.prototype.hasOwnProperty 가 있기 때문에
  // 상속을 받아서 사용이 삽 가능

  // 배열 리터럴을 통해 instance 를 만드는 것과 생성자 함수를 통해 instance 를 만드는 것은 동일하게 동작한다.

  // 웹 브라우저 콘솔에서 console.log(this) 를 실행시켜보면
  // Window 객체가 나옴. -> 이거는 웹 브라우저를 의미함
  // console.log(this.innerWidth) 현재 브라우저의 너비
  // console.log(this.innerHeight) 현재 브라우저의 높이

  // ------------ 함수의 호출 순서 예측하기
  // 스택 오버 플로우 -> 를 통해 스택 구조에 대한 설명
  // LIFO (Last In First Out) 후입선출
  // 실행 컨텍스트 -> 에 대해 설명드릴게요!!

  function first() {
    second();
    console.log("첫 번째");
  }
  function second() {
    third();
    console.log("두 번째");
  }
  function third() {
    console.log("세 번째");
  }

  first();

  // 동기 vs 비동기
  // 노션에 '콜백'으로 작성된 페이지 참조하면서
  // 이벤트 루프와 테스크 큐 그리고 콜 스택에 대해 설명하기.

  function run() {
    console.log("동작");
  }
  console.log("시작");
  setTimeout(run, 0);
  console.log("끝");

  // -> 왜 콘솔에 시작 동작 끝 순서가 아니에요?? 이유 설명할 수 있어요?

  // 콜백 패턴 만들기

  let userData = null;

  const fetchData = () => {
    console.log("데이터 받아오기 완료");
    userData = { name: "JuKang" };
  };

  setTimeout(fetchData, 200);
  // 데이터 받아오는데 걸리는 시간이 있고, 이건 비동기적으로 동작할거니까, 다음 코드를 바로 수행해줄거야.

  const view = () => {
    console.log("현재 유저의 이름은", userData);
  };

  view(); // 나는 유저의 데이터를 보고싶어!, 유저의 데이터로 무언가 작업을 하고 싶어! 하지만 null 이뜸.

  // 콜백 헬 예시 2

  function squareAndCallBack(number) {
    let square;
    setTimeout(() => {
      square = number * number;
    }, 100);
    console.log(square);
  }

  squareAndCallBack(2);
  // square 는 undefined

  function squareAndCallBack2(number, callback) {
    setTimeout(() => {
      const square = number * number;
      callback(square);
    }, 100);
  }

  function consolePrint(value) {
    console.log(value);
  }

  squareAndCallBack2(2, consolePrint);

  const add5 = (number, callback) => {
    setTimeout(() => callback(number + 5), 1000);
  };

  const add10 = (number, callback) => {
    setTimeout(() => callback(number + 10), 1000);
  };

  const add15 = (number, callback) => {
    setTimeout(() => callback(number + 15), 1000);
  };

  const log = (number) => {
    console.log(number);
  };

  add5(0, (number) => add10(number, (number) => add15(number, log))); // 30
  // ----------------------------------------------------------------------------------------------------

  const add6 = (number) =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve(number + 6);
      }, 1000)
    );

  const add11 = (number) =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve(number + 11);
      }, 1000)
    );

  const add16 = (number) =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve(number + 16);
      }, 1000)
    );

  add6(0)
    .then((number) => add11(number))
    .then((number) => add16(number))
    .then((number) => log(number)); // 33

  // 콜백 패턴의 복잡성
  // 너가 콜 하고 돌려줘 값을 -> 콜 ~~ 백 함수의 제어권을 넘긴다.

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

  // ReadableStream 인터페이스는 바이트 데이터를 읽을 수 있는 스트림을 제공합니다.
  // streaming 이란 -> 데이터를 로드하는 행위를 뜻함.
  // 음악 스트리밍 -> 받아온 데이터만 미리 볼 수 있는것, 굳이 데이터를 다 받아올 필요는 없음

  // Data Stream 이라고 하는 것은 무엇일까? -> 로드된 데이터를 의미함

  console.log(
    "fetch api 에서 리턴되는거",
    fetch("https://jsonplaceholder.typicode.com/posts"),
    "프라미스 객체가 리턴되기 때문에 Prototype.then 을 사용가능하다. 순차적으로 처리해야 하는 비동기 작업이 있을 경우"
  );

  console.log(
    "fetch 함수를 통해서 리턴된 건? ",
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => console.log(res))
      // response 객체의 body 안에는 readableStream 이 존재하는데 이걸 javascript 가 이해할 수 있는 형태로 바꿔주려면
      // response.json() 을 사용
      // Response 의 인터페이스들은 본문(body) 를 추출할 수 있는 메서드를 가지고 있는데,
      // 추출 메서드는 모두 프라미스를 반환하며, 이 프라미스가 실제 본문 데이터로 이행합니다.
      .then((data) => console.log(data))
  );

  async function f() {
    return 1;
    // async 를 function 앞에 붙이게 되면 해당 함수는 항상 프라미스를 반환하게 됩니다.
    // 프라미스가 아닌 값을 반환하더라도, 이행 상태의 프라미스 (resolved promise) 로 감싸 이행된 프라미스가 반환되도록 합니다.
  }

  // f().then(alert);

  // 명시적으로 프라미스를 반환하는 것도 가능한데, 결과는 동일합니다.
  // async 가 붙은 함수는 반드시 프라미스를 반환하고, 프라미스가 아닌 것은 프라미스로 감싸서 반환합니다.

  async function f1() {
    return Promise.resolve(1);
  }
  console.log(f1());

  // 자바스크립트는 await 키워드를 만나면 프라미스가 처리될 때까지 기다립니다.
  // 그리고 await 는 async 함수 내에서만 동작합니다.

  async function f3() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("완료"), 1000);
    });

    let result = await promise;
    // await 는 말 그대로 프라미스가 처리될 때까지 함수 실행을 기다리게 만듭니다.
    // 프라미스가 처리되면 그 결과와 함께 실행이 재개됩니다.
    // 그리고 프라미스가 처리되는 동안에는 엔진이 다른 일을 할 수 있기 때문에,
    // CPU 리소스가 낭비되지 않습니다.

    // await 는 promise.then 보다 더 세련되게 프라미스의 result 값을 얻을 수 있도록 해주는 문법입니다.
    // promise.then 보다 가독성도 좋고 쓰기 쉽습니다.

    console.log(result);
  }

  f3();

  async function f4() {
    console.log("f4 실행되었음");
    let response = await new Promise((resolve, reject) => {
      setTimeout(() => resolve("데이터"), 1000);
    });
    console.log("f4를 통해 리턴된", response);
  }
  f4();

  useEffect(() => {}, []);

  // async function f5() {
  //   let response = await fetch("https://jsonplaceholder.typicode.com/posts");
  //   console.log(response); // response 가 나옴
  //   const data = await response.json();
  //   setUsers(data);
  // }

  // f5();

  useEffect(() => {
    (async function f5() {
      let response = await fetch("https://jsonplaceholder.typicode.com/posts");
      console.log(response);

      const data = await response.json();
      console.log(data);
      setUsers(data);
    })();
    // f5();
    // 즉시실행함수
  }, []);

  return (
    <div>
      <h1>PromiseTest</h1>
      {users?.map((user, index) => (
        <>
          <h3>{user.id}</h3>
          <li key={index}>{user.title}</li>
        </>
      ))}
    </div>
  );
};

export default PromiseTest;
