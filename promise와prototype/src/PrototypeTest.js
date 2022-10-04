const Prototype = () => {
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
  return (
    <div>
      <h1>Prototype</h1>
    </div>
  );
};

export default Prototype;
