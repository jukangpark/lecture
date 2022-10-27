const App = () => {
  // 기존의 es5 에서의 순회
  const list = [1, 2, 3];
  for (var i = 0; i < list.length; i++) {
    console.log(list[i]);
  }
  const str = "abc";
  for (var i = 0; i < str.length; i++) {
    console.log(str[i]);
  }

  // es6 에서의 순회
  for (const a of list) {
    console.log(a);
  }
  for (const a of str) {
    console.log(a);
  }

  // console.clear();

  // array, set, map 차이
  // array 는 여러 개의 값을 순차적으로 나열한 자료구조이다.
  // 자바스크립트의 모든 '값'은 배열의 요소가 될 수 있다.

  console.log("Arr -----------");
  const arr = [1, 2, 3];
  let iter1 = arr[Symbol.iterator]();
  for (const a of iter1) console.log(a);

  /* 
   Set 객체는 중복되지 않는 유일한 값들의 집합이다.
   Set 객체의 특성은 수학적 집합의 특성과 일치한다.
   따라서, Set 을 통해 교집합, 합집합, 차집합, 여집합 등을 구현할 수 있다.
  */

  const array1 = [1, 1, 2, 3, 4, 5, 6, 6];
  const uniq = new Set([...array1]); // set객체를 통해 중복된 요소를 삭제 가능.
  console.log(uniq);

  /* 
    Set 객체
    1. 동일한 값을 중복하여 포함할 수 있다. (x)
    2. 요소 순서에 의미가 있다. (x)
    3. 인덱스로 요소에 접근할 수 있다. (x)
    Set 생성자 함수는 이터러블을 인수로 전달받아 Set 객체를 생성한다.
    이때 이터러블의 중복된 값은 Set 객체에 요소로 저장되지 않는다.
  */

  console.log("Set -----------");
  const set = new Set([1, 2, 3]);
  for (const a of set) console.log(a);

  /* 
    Map 객체는 키와 값의 쌍으로 이루어진 컬렉션이다.
    Map 객체는 객체와 유사 하지만 다음과 같은 차이가 있다.
    
    객체는 문자열 또는 심벌값만 '키'로 사용할 수 있지만,
    Map 객체는 '키로 사용할 수 있는 값'이 "객체를 포함한 모든 값"이다.

    객체는 이터러블이 아니지만,
    Map 객체는 이터러블이다. 
    
    객체는 요소의 개수를 확인할 때, Object.keys(obj).length 를 사용하지만
    Map 객체는 요소의 개수를 확인할 때. map.size() 를 사용한다.

    Map 생성자 함수는 이터러블을 인수로 전달받아, Map 객체를 생성한다.
    이때 인수로 전달되는 이터러블은 키와 값의 쌍으로 이루어진 요소로 구성되어야 한다.
    Map 객체에는 중복된 '키'를 갖는 요소가 존재할 수 없다.
  */

  console.log("Map -----------");
  const map = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
  ]);
  for (const a of map.keys()) console.log(a);
  for (const a of map.values()) console.log(a);
  for (const a of map.entries()) console.log(a);

  // es6에서 부터 달라진 순회
  // 데이터 소비자 (Data consumer) 인 for ...of 문, spread 문법 등은 이터레이션 프로토콜을 준수하는 이터러블에서 사용이 가능하다.
  // 즉 이터러블은 (Data Provider) 의 역할을 한다.
  // 즉 이터레이션 프로토콜은 다양한 데이터 소스가 하나의 순회 방식을 가지도록 규정하여, 소비자가 효율적으로 다양한 데이터 소스를 사용할 수 있도록
  // 데이터 소비자와 데이터 소스를 연결하는 인터페이스의 역할을 한다.
  // ES6 에서 제공하는 '빌트인 이터러블'
  // Array, String, Map, Set, TypedArray(Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array),
  // DOM data structure(NodeList, HTMLCollection), Arguments

  // 이터러블 (iterable) - 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값
  const iterable = {
    [Symbol.iterator]() {
      let i = 3;
      return {
        next() {
          return i === 0 ? { done: true } : { value: i--, done: false };
        },
        [Symbol.iterator]() {
          return this;
        },
      };
    },
  };

  let iterator = iterable[Symbol.iterator]();

  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());

  /* 
    for…of 문은 내부적으로 이터레이터의 next 메소드를 호출하여 
    이터러블을 순회하며 next 메소드가 반환한 이터레이터 리절트 객체의 value 프로퍼티 값을 
    for…of 문의 변수에 할당한다. 
    그리고 이터레이터 리절트 객체의 done 프로퍼티 값이 false이면 이터러블의 순회를 계속하고 
    true이면 이터러블의 순회를 중단한다.
  */

  for (const item of ["a", "b", "c"]) {
    console.log(item);
  }

  // 문자열
  for (const letter of "abc") {
    console.log(letter);
  }

  // Map
  for (const [key, value] of new Map([
    ["a", "1"],
    ["b", "2"],
    ["c", "3"],
  ])) {
    console.log(`key : ${key} value : ${value}`); // key : a value : 1 ...
  }

  // Set
  for (const val of new Set([1, 2, 3])) {
    console.log(val);
  }

  // 제너레이터(es6)란?

  /*   
      generator 는 코드 블록의 실행을 일시 중지 했다가 필요한 시점에 재개할 수 있는 특수한 함수이다.
   */

  return <div>Home</div>;
};
export default App;
