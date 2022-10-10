import { useState, useEffect } from "react";

const PromiseTest = () => {
  const [users, setUsers] = useState([]);

  // 1. 함수의 호출 순서 예측하기
  // 스택 오버 플로우 -> 를 통해 스택 구조에 대한 설명
  // LIFO (Last In First Out) 후입선출
  // 실행 컨텍스트 -> 에 대해 설명드릴게요!!

  // 함수의 실행 순서

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

  first(); // 세번째 두번째 첫번째

  // 동기 vs 비동기
  // 노션에 '콜백'으로 작성된 페이지 참조하면서
  // 이벤트 루프와 테스크 큐 그리고 콜 스택에 대해 설명하기.

  function run() {
    console.log("동작");
  }
  console.log("시작");
  setTimeout(run, 0);
  console.log("끝");

  // 시작 끝 동작
  // -> 이유를 설명할 수 있나요?

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

  view(); // "현재 유저의 이름은 null"
  // 나는 유저의 데이터를 보고싶어!, 유저의 데이터로 무언가 작업을 하고 싶어! 하지만 null 이뜸.
  // 왜 여기서 userData 를 받아올 수 없어요? 자바스크립트는 기본적으로 동기적으로 동작하고, 지금 여기서는 논블로킹 하고 동작했다. fetchData 는 2초뒤에 실행됨.

  //-------------------------------------------------------------------------------------------

  // 콜백패턴 으로 이걸 해결할 수 있다.
  // fetchData2 가 언제 종료될지 모르기 때문에
  // fetchData2 가 종료된 이후에 view2() 를 호출하게 만듬으로서 해결할 수 있어.
  // 그런데 만약 비동기적인 작업이 여러번 이루어진다면 함수 안에 함수안에 함수를 작성해줘야해

  // 비동기 함수를 호출하면, 함수 내부의 비동기로 동작하는 코드가 완료되지 않았다 해도 기다리지 않고, 즉시 종료된다.
  // 즉 비동기 함수 내부의 비동기로 동작하는 코드는 비동기 함수가 종료된 이후에 완료된다.
  // 따라서 비동기 함수 내부의 비동기로 동작하는 코드에서 처리결과를 외부로 반환 하거나, 상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않는다

  // 이처럼 비동기 함수는 비동기 처리 결과를 외부에 반환할 수 없고, 상위 스코프의 변수에 할당할 수도 없다.
  // 따라서 비동기 함수의 처리 결과 (서버의 응답 등)에 대한 후속 처리는, 비동기 함수 내부에서 수행해야 한다.
  // 이때 비동기 함수를 범용적으로 사용하기 위해 비동기 함수에 비동기 처리 결과에 대한 후속 처리를 수행하는 콜백 함수를 전달하는 것이 일반적이다.
  // 필요에 따라 비동기 처리가 성공하면 호출될 콜백 함수와 비동기 처리가 실패하면 호출될 콜백 함수를 전달할 수 있다.

  /* 

  자바스크립트의 함수는 일급 객체다. 간단하게 자바스크립트에서 함수는

  1. 변수나 데이터안에 담길 수 있고
  2. 매개변수로 전달 할 수 있고 -> (콜백함수로 사용할 수 있다) 콜백함수란? 다른 함수안에 인자로 넘겨주는 함수(콜백) 를 말한다. 콜백함수의 제어권을 다른 함수에게 넘겨주고 해당 함수가 이후에 그 함수를 실행하고 우리는 어떤 값을 return 받음
  3. 반환 값으로 사용할 수 있고
  4. 실행도중에 생성될 수 있다
  
  */

  const callback = () => console.log("나는 2초뒤에 실행되는 콜백함수");
  setTimeout(callback, 2000);

  // 함수형 프로그래밍

  const addOne = (num) => num + 1;

  // 고차 함수(Higher Order Function) 이란?
  // 고차 함수는 함수를 인자로 받거나 또는 함수를 반환함으로써 작동 하는 함수를 말합니다. 간단히 말하자면, 고차 함수는 함수를 인자로 받거나 ,함수를 출력(output)으로 반환하는(return) 함수를 말합니다.
  // 대표적인 고차함수 Array.prototype.map()
  const higherFunction = (num, callback) => callback(num);

  console.log("고차함수 실행결과", higherFunction(1, addOne));

  let userData2 = null;

  const view2 = () => {
    console.log("콜백으로 해결한 유저의 이름은", userData2);
  };

  const fetchData2 = () => {
    console.log("데이터 받아오기 완료2");
    userData2 = { name: "jukang2" };
    view2();
  };

  setTimeout(fetchData2, 200);

  //-------------------------------------------------------------------------------------------

  // 만약 A 와 B 와 C 를 콘솔에 찍어볼건데, 1초가 지난 후에 A 1초가 지난 후에 B가 그 다음에 C가 나오게 하려면?

  setTimeout(function () {
    console.log("A");
    setTimeout(function () {
      console.log("B");
      setTimeout(function () {
        console.log("C");
      }, 1000);
    }, 1000);
  }, 1000);

  // 콜백 패턴의 복잡성
  // 너가 콜 하고 돌려줘 값을 -> 콜 ~~ 백 함수의 제어권을 넘긴다.
  // 런 콜백 패턴을 중첩해서 사용하게 되면 문장이 점점 더 깊숙하게 들어가게 되고 코드의 가독성이 떨어지게 된다.

  // Promise 란?
  // 자바스크립트 표준 내장 객체 안의
  // 제어 추상화 객체(코드 구조화에 도움을 줌, 특히 비동기 코드를 깊게 중첩된 함수 없이 작성 할 수 있다)이다.
  // 표준 내장 객체 는 전역 객체와 다름.

  // new Promise 에 전달되는 함수는 실행함수(executor) 라고 부릅니다.
  // executor 는 new Promise 가 만들어질 때 자동으로 '실행'되는데
  //                                                      executor 에서는 결과를 즉시 얻든 늦게 얻든 상관없이, 상황에 따라
  // 인수로 넘겨준 콜백(resolve, reject) 중 하나를 반드시 호출해야 합니다.

  // resolve(value) - 일이 성공적으로 끝난 경우 그 결과를 나타내는 value 와 함께 호출
  // reject(error) - 에러 발생 시 에러 객체를 나타내는 error 와 함께 호출

  // 요약하면

  let promise1 = new Promise((resolve, reject) => {});

  console.log("Promise 생성자 함수로 만든 promise 객체는? ", promise1); // promise state: pending(대기중), promise result , promise 의 prototype 이 있어요. object 라는 prototype 도 있음.

  let promise2 = new Promise((resolve, rejeect) => {
    setTimeout(() => resolve("data"), 5000);
  });

  console.log("promise2 에 resolve라는 콜백을 실행시킨다면?", promise2); // resolve 에서 data 를 받아오는데 시간이 걸린다라고 하면 여기서 promise state: fulfilled(충족됨)이 나오는게 아니라 pending 이 나올거야. 그럼 이거 어케 해결함?

  promise2.then((data) => console.log(data)); // then 이라는 메서드는 항상 promise 를 반환한다. 이건 5초 뒤에 resolve("data") 를 실행시켜주고 완료가 되면 콘솔에 찍힐거야.
  // data 라는 매개변수에 왜 promise result 가 들어온거에요?  -> 이유는 promise prototype 안에 들어있는 후속 처리 메서드의 콜백 함수에 프로미스 처리 결과가(result)가 인자로 전달되기 때문이다.

  // ------------------------------------ reject() 를 호출해보자.

  let promise3 = new Promise(function (resolve, reject) {
    // executor (실행자, 실행 함수)

    // setTimeout(() => resolve("done"), 3000);
    setTimeout(() => reject(new Error("에러발생!")), 1000);
  });

  // promise 객체의 프러퍼티는 state , result 가 존재하는데,
  // 이 프로퍼티 들은 '내부 프로퍼티' 이므로 개발자가 접근할 수 없습니다.
  // .then / .catch / .finally 메서드를 사용하면 접근 가능하긴 하다.

  promise3.then(
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
    fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
      console.log(res)
    )
    // 이런식으로 promise 의 후속 처리 메서드인 then 을 사용해서,
    // res 라는 매개변수에 Response 라는 서버로부터 받은 응답을 확인할 수 있음.
    // promise result 에 들어온 값이 한마디로 Response 라고 보면 됩니다.
    // 그런 다음 response.body 에 있는 데이터를 한번 구경해봅시다.
    // response 객체의 body 안에는 readableStream 이 존재하는데 이걸 javascript 가 이해할 수 있는 형태로 바꿔주려면
    // response.json() 을 사용
    // Response 의 인터페이스들은 본문(response.body) 를 추출할 수 있는 메서드를 가지고 있는데,
    // 추출 메서드는 모두 프라미스를 반환하며, 이 프라미스가 실제 본문 데이터로 이행합니다.
  );

  async function f() {
    return 1;
    // async 를 function 앞에 붙이게 되면 해당 함수는 항상 프라미스를 반환하게 됩니다.
    // 프라미스가 아닌 값을 반환하더라도, 이행 상태의 프라미스 (resolved promise) 로 감싸 이행된 프라미스가 반환되도록 합니다.
  }

  f().then((num) =>
    console.log("f() 라는 함수를 실행하여 then 으로 연결해서 받은 인자는", num)
  );

  console.log("f() 이라는 함수를 실행하여 받은 결과는 프라미스 일걸요?", f());

  // 명시적으로 프라미스를 반환하는 것도 가능한데, 결과는 동일합니다.
  // async 가 붙은 함수는 반드시 프라미스를 반환하고, 프라미스가 아닌 것은 프라미스로 감싸서 반환합니다.

  async function f1() {
    return Promise.resolve(1);
  }
  console.log(
    "명시적으로 프라미스를 반환하는 것도 가능한데, 결과는 어짜피 동일합니다.",
    f1()
  );
  // async 가 붙은 함수는 반드시 프라미스를 반환하고, 프라미스가 아닌 것은 프라미스로 감싸서 반환합니다.

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
    console.log(result);
  }

  f3();

  // async await 을 사용하면 promise.then 보다 훨씬 더 세련되게 프라미스의 result 값을 얻을 수 있도록 해줍니다.

  // 즉시 실행함수로도 사용가능
  async function f4() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("data"), 5000);
    });
    let result = promise; // 이렇게만 작성하면 프라미스가 대기중인 상태 이다.

    console.log("즉시실행함수 f4 를 실행한 결과", result); // 따라서 여기서 pending 중인 프라미스를 받게됨.

    let result2 = await promise;

    console.log("즉시실행함수 f4 를 실행한 결과", result2); // 따라서 이런식으로 await 키워드를 작성해주게 되면 해당 promise 의 result 를 받아올 수 있다~
  }
  f4();

  // 즉시 실행 함수를 통해 setter 함수에 state 에 담아보게 될때 주의할점.

  // async function f5() {
  //   let response = await fetch("https://jsonplaceholder.typicode.com/posts");
  //   console.log(response); // response 가 나옴
  //   const data = await response.json();
  //   setUsers(data);
  // }

  // f5();

  // 만약에 이런식으로 setUsers 라는 setter 함수에 useEffect() 안에서 호출하는게 아니라 이렇게 되면
  // 데이터 패칭을 계속하게됨? 이유는 ? ----> setUsers() 라는 세터 함수에 새로운 데이터를 넣게 되면 state 가 변경되게 되고,
  // 계속해서 리렌더링이 일어나게 될거임. 리렌더링이 된다라는 말은 이컴포넌트다 다시 호출 된다는 이야기일테니까, 다시 setter 함수를 실행시킬 거고, 다시 state 가 변경이 되어서 리렌더링이 일어나게 될거야.

  // 따라서

  useEffect(() => {
    (async function f5() {
      let response = await fetch("https://jsonplaceholder.typicode.com/posts");
      console.log("f5 함수를 통해 리턴 받은 데이터", response);

      const data = await response.json();
      console.log("f5 함수를 통해 리턴 받은 데이터를 파싱 한 결과", data);
      setUsers(data);
    })();
  }, []);

  // Array.prototype.map 에 대해서 설명하기
  // 왜 map() 함수는 선언하지도 않고, 사용할 수가 있는가?

  return (
    <div>
      <h1>PromiseTest</h1>
      {users?.map((user, index) => (
        <div key={index}>
          <h3>{user.id}</h3>
          <li key={index}>{user.title}</li>
        </div>
      ))}
    </div>
  );
};

export default PromiseTest;
