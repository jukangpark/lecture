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
  for (const a of list) {
    console.log(a);
  }
  for (const a of str) {
    console.log(a);
  }

  // console.clear();

  // array, set, map 차이

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

  return <div>Home</div>;
};
export default App;
