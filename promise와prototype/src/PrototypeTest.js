const Prototype = () => {
  // 자바스크립트는 어떤 언어입니까?
  // 명령형 (imperative) 함수형(functional) 포로토타입(prototype-based) 기반 객체지향 프로그래밍을 지원하는 멀티 패러다임 프로그래밍 언어 이다.
  // 자바스크립트는 '프로토타입'으로 상속을 구현

  // 생성자 함수를 통해 instance(자식 객체) 생성하기
  function Person(name, age) {
    // 3. 생성자 실행시에는 새롭게 만들어진 객체를 가리킨다.
    this.name = name;
    this.age = age;
    // this.getAge = function () {
    //  return this.age; 이렇게 생성자 함수내에 메서드를 정의하게 되면,
    // 각 인스턴스마다 메서드를 가지게 되기 때문에, 메모리 낭비가 심하다. 따라서 프로토타입으로 상속을 구현시켜주면 좋다.
    // }
  }

  const jukang = new Person("jukang", 30);

  console.log(jukang);

  // prototype 을 사용하여 상속 시키기
  Person.prototype.getName = function () {
    return this.name;
  };

  Person.prototype.getAge = function () {
    return this.age;
  };

  Person.prototype.getOlder = function () {
    return (this.age = this.age + 1);
  };

  // prototype 으로 상속을 구현하게 되면
  // 메모리 용량 최적화, -> 각 인스턴스 마다 메서드를 만들어주게되면 메모리적으로 굉장히 낭비가 되기 때문
  // 따라서 프로토타입으로 인한 상속을 구현하게 되면
  // 메모리를 효율적으로 사용할 수 있다.
  // 특정 집단의 공통적 속성 파악 가능

  console.log(jukang.getName()); // jukang
  console.log(jukang.getAge()); // age
  console.log(jukang.getOlder()); // getOlder

  // Class 문법을 사용하여 instance(자식 객체) 생성하기
  /*
    클래스는 객체 지향 프로그래밍에서 특정 객체를 생성하기 위해 
    변수와 메소드를 정의하는 일종의 틀로, 
    객체를 정의하기 위한 상태(멤버 변수)와 메서드(함수)로 구성된다.
  */

  class Person2 {
    // constructor 메서드는 class 로 생성된 객체를 생성하고,
    // 초기화 하기 위한 특수한 메서드 입니다.
    // 클래스안에 한개만 존재할 수 있습니다.
    // constructor 는 부모 클래스의 constructor 를 호출하기 위해 super 라는 키워드를 사용할 수 있습니다.
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    // 메서드
    getName() {
      return this.name;
    }

    getAge() {
      return this.age;
    }

    getOlder() {
      return (this.age = this.age + 1);
    }
    // 클래스 내에서 정의된 메서드를 Person2.prototype 에 저장합니다.
    // new Person2 를 호출해 객체를 만들고, 객체의 메서드를 호출하면,
    // 메서드를 prototype 프로퍼티를 통해 가져옵니다.
    // 이 과정이 있기 때문에 객체에서 클래스 메서드에 접근할 수 있습니다.
  }

  console.log("class는 함수입니다", typeof Person2);

  console.log(
    "클래스는 정확히 생성자 메서드와 동일합니다.",
    Person2 === Person2.prototype.constructor
  ); // true

  console.log(
    "클래스 내부에서 정의한 메서드는 Person2.prototype에 저장됩니다",
    Person2.prototype.getOlder
  );

  // 현재 프로토타입에는 메서드가 4개입니다.
  console.log(Object.getOwnPropertyNames(Person2.prototype)); // constructor, getName, getAge, getOlder

  const jukang2 = new Person2("jukang2", 27);

  console.log(jukang2);

  // function 키워드로 생성자 함수를 만들어보았는데,
  // 그럼 화살표 함수로도 생성자 함수를 만들 수 있나요? -> 불가능 하다. 왜냐하면 prototype 이라는게 화살표 함수에는 없다.

  // const Person2 = (name, age) => {
  //   this.name = name;
  //   this.age = age;
  // };

  // const person2 = new Person2();

  // console.log(person2); // Person2 is not a constructor 라고 에러가 뜰것임.

  // -> 화살표 함수로도 생성자 함수를 만들어볼까요?
  // -> 화살표 함수는 생성자 함수로 사용할 수 없다. 왜냐하면 prototype 이라는게 화살표 함수에는 없어서

  // const jukang1 = new Person1("Jukang", 20);

  // console.log(jukang1); // Person1 is not a constructor (생성자 함수가 아닙니다)
  // 이유는 화살표 함수 내에서 호출하는 this 는 현재 생성되는 객체를 가리키지 않음.

  // ------------------------------------------------------
  // function 일반 함수 vs 화살표 함수

  // << 일반함수 >>
  // 1. 함수 실행시에는 전역(window) 객체를 가리킨다. => 이건 웹 브라우저 콘솔창에서 this 를 찍어보고, console.log(this) 도 찍어본다.
  // 2. 메소드 실행시에는 메소드를 소유하고 있는 객체를 가리킨다.
  // 3. 생성자 실행시에는 새롭게 만들어진 객체를 가리킨다.
  // 주의 : 일반 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고,
  // 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.

  // ------------------------------------------------------------
  // << 화살표 함수 >>
  // 1. 화살표 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정된다.
  // 화살표 함수의 this 언제나 상위 스코프의 this를 가리킨다.(Lexical this)

  // 설명할 때 1. 브라우저에서 this 찍어보기

  // 2. 일반 함수를 객체에서의 메서드 실행시에는 메서드를 소유하고 있는 객체를 가리킵니다.
  const object1 = {
    name: "이건 오브젝트입니다.",
    method: function () {
      console.log(this);
    },
  };

  object1.method();

  // 3. 생성자 함수 내에서 this 는 이미 앞에서 설명했음.

  // ------------------------------------------
  // 그러면 화살표 함수 내에서의 this 는 정적으로 결정된다고 했는데, 상위 스코프의 this 를 참조한다고 했는데, 그게 무슨 말이에요?

  // 웹 브라우저에서 실행하세요 아래의 코드는
  // const cat = {
  //   name: 'meow',
  //   callName: () => console.log(this.name);
  // }

  // cat.callName();	//  undefined 가 나옴 ? 이유는 window 라는 객체 안에 name 이라는 프로퍼티가 없기 때문임. this.name 이 아니라, this 를 호출한다고 하면 window 라는 객체가 나온다.

  // --------------- 생성자 함수에 대해 이야기를 해봤고, 그럼 prototype 이 뭔지 말씀 드릴게요!!

  const array1 = [1, 2, 3, 4];

  console.log(array1);

  console.log(array1.__proto__); // 이렇게도 prototype 에 접근할 수 있고,

  console.log(Object.getPrototypeOf(array1)); // 이렇게도 prototype 에 접근할 수 있는데, 이게 공식적인 접근 방법임. 이걸 사용하길 권고

  // 아니 그러면 array1.prototype 이라는 프로퍼티는 누가 준거에요???

  console.log(Array.prototype); // 뭐야 Array 라는 배열 생성자 함수 내에 prototype 이라는 속성이 있네요?

  const array2 = new Array(1, 2, 3, 4);
  // 이건 위의 array1 = [1,2,3,4] 랑 정확히 똑같은 말임.

  console.log(array2);

  console.log(Array);

  // 프로토타입 이라는 것 역시 객체 이기 때문에
  // Object 생성자 함수와 new 키워드를 통해 생성된 객체라는 의미입니다.
  // Object.prototype에 있는 메서드도
  // 마치 자신의 것 처럼 사용할 수가 있습니다.
  // 이것이 바로 프로토타입 체인
  // 객체의 프로토타입에 있는 메서드는 모든 데이터 타입에 적용되기 때문이죠.

  // 이 말이 무슨말이냐면 , 원시형 데이터들도 객체 프로토타입의 메서드를 사용할 수 있다.

  const array3 = [1, 2, 3, 4];

  console.log(array3.toString());

  delete Array.prototype.toString;

  console.log(array3.toString()); // [object Array]

  // delete Object.prototype.toString;

  // console.log(array3.toString()); // is not a function

  // 이건 무슨 의미이냐 array 로 된 배열도 결국 Object.prototype 을 상속받기 때문에 Object.prototype.toString() 을 호출할 수 있다.
  // 보통의 상태에서는 Object.prototype 까지 체인을 타고 올라가지 않습니다.
  // 즉 가장 먼저 발견된 메서드를 실행하게 됩니다.
  // 이건 스코프 체인이랑 개념이 같죠!

  const string3 = "asdfa";
  console.log(string3.hasOwnProperty("age"));

  console.log(Object.getPrototypeOf(string3));

  return (
    <div>
      <h1>Prototype</h1>
    </div>
  );
};

export default Prototype;
