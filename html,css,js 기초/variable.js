// 변수란?

// 변수는 값의 위치(주소)를 기억하는 저장소이다.
// 즉 변수란 값이 위치하고 있는 메모리 주소에 접근하기 위해 사람이 이해할 수 있는 언어로 명명한 식별자(identifier) 이다.

// 데이터 타입

// 원시 타입 (primitive data type) vs 객체 타입 (object/reference type)

// 원시 타입
// boolean
// null
// undefined
// number
// string
// symbol (es6 에서 추가)

// 객체 타입
// object

// 리터럴
// 값을 새성할때는 '리터럴 표기법'을 사용함 (가장 간단)

// 숫자 리터럴
10.5;
// 문자 리터럴
("string");

// 객체 리터럴 {}
// 배열 리터럴 []
// 함수 리터럴 function () {}

var foo;

console.log(foo);

// 심볼 (Symbol)은 ES6 에서 추가된 7번째 타입으로 변경 불가능한 원시 타입의 값이다.
// 주로 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키를 만들기 위해 사용한다.
// 심볼은 Symbol 함수를 호출해 생성한다.
// 이때 생성된 심볼 값은 다른 심볼값들과 다른 유일한 심볼 값이다.
var key = Symbol("key");
console.log(typeof key); // symbol

// 타입을 컴파일 타임에 확인하는 언어를 정적타입 언어라 하고 런타임에 확인하는 언어를 동적타입 언어라 합니다.
// 자바스크립트는 동적 타입의 언어이다.
// 이것은 변수의 타입 지정없이 값이 할당되는 과정에서 값의 타입에 의해 자동으로 타입이 결정될 것 이라는 뜻이다.
// 따라서 같은 변수에 여러 타입의 값을 할당 할 수 있다. 이를 동적 타이핑 이라고 한다.

var foo2;

console.log(typeof foo2);

foo2 = null;

foo2 = {};

foo2 = 3;

foo2 = "hi";

foo2 = true;
// ------------------------------------------------------

// 변수 호이스팅 개념
// 변수는 3단계에 걸쳐 생성됨

// 선언단계 (Declaration phase)
// 초기화 단계 (Initialization phase)
// 할당 단계 (Assignment phase)

// 함수 레벨 스코프
// 블록 레벨 스코프

// var 키워드로 선언된 변수의 문제점
// var vs let, const (es6)
// EMAScript 가 나온 이유 ? -> 크로스 브라우징 이슈
// ES5 는 2009년에 발표되었고,
// ES6 는 2015년에 발표되었음.

// 표현식(expression)과 연산자(operator)

// 표현식이란 리터럴, 식별자, 연산자, 함수 호출등의 조합
// 표현식은 평가 (evaluation) 되어 하나의 '값'을 만듬.
// 즉 표현식은 하나의 값으로 평가될 수 있는 문(statement)이다.

10; // 리터럴 표현식
// 표현식은 평가되어 결국 하나의 값이 되므로 표현식과 값은 동등한 관계, 즉 동치(Equivalent) 이다.
// 다시 말해, 표현식은 값처럼 사용할 수 있다.

// 문이란(statement)
// 자바스크립트 엔진에게 내리는 명령이다.
var x;
x = 5;
function func() {}

if (x > 5) {
}

// 문은 리터럴, 연산자, 표현식, 키워드 등으로 구성되며 세미콜론(;)으로 끝나야 한다.

// 변수 호이스팅 (Variable Hoisting)

console.log(test); // undefined
var test = 123;
console.log(test); // 123
{
  var test = 456;
}

console.log(test); // 456

/* 
    호이스팅이란 (var, let, const, function, function*, class)등 모든 선언문이 
    해당 Scope 의 선두로 옮겨진 것처럼 동작하는 특성
    즉, 자바스크립트는 모든 선언문 (var, let, const, function, function*, class) 이 선언되기 이전에 참조 가능하다.

    변수가 생성되는 3 단계
    1. 선언 단계
    2. 초기화 단계
    3. 할당 단계
*/

/* 
    < 변수 호이스팅(variable hoisting) 정의 >

    var 키워드로 선언된 변수는 선언 단계와 초기화 단계가 한번에 이루어진다.
    즉, 스코프에 변수가 등록되고 변수는 메모리 공간을 확보한 후 undefined 로 초기화 된다.
    따라서 변수 선언문 이전에 접근하여도 에러가 발생하지 않는다.
    이러한 '현상' 을 변수 호이스팅(variable hoisting) 이라고 부른다.

    자바스크립트에서의 변수는 (ES5) 블록 레벨 스코프(block-level scope) 를 가지지 않고,
    함수 레벨 스코프(function-level-scope) 를 갖는다.
    es6 에서 도입된 let, const 키워드를 사용하면 블록 레벨 스코프를 사용할 수 있다.
 */

/* 
    < var 키워드로 선언된 변수의 문제점 >

    1. 함수 레벨 스코프 (전역 변수 남발, for loop 초기화 식에서 사용한 변수를 외부에서 또는 전역에서 참조 가능)
    2. var 키워드 생략 허용 (의도치 않은 전역 변수)
    3. 중복 선언 가능 (의도치 않은 갑의 변경)
    4. 변수 호이스팅 (변수 선언 이전에 참조 가능) 
 */

/* 
    < let 키워드 >

    let 

        1. 블록 레벨 스코프
        2. 변수 중복 선언 금지 (변수를 중복 선언하게 되면 SyntaxError 발생)
        3. 호이스팅 - var 키워드와 달리 선언문 이전에 참조하면 (ReferenceError) 가 발생한다.
            왜냐하면 일시적 사각지대(Temporal Dead Zone TDZ) 에 빠지기 때문이다.
*/

let test2 = 123;
{
  let test2 = 456;
  let test3 = 456;
}

console.log(test2); // 123
console.log(test3); // ReferenceError : test3 is not defined

/* 
    < let 호이스팅 vs var 호이스팅 >
    let 키워드로 선언된 변수는 선언단계와 초기화 단계가 분리되어 진행된다.

    즉 스코프에 변수를 등록(선언)하기는 하지만, 초기화 단계는 변수 선언문에 도달했을 때 이루어진다.
    따라서 초기화 이전에 변수에 접근하려고 하면 참조에러가 발생한다.
    따라서 스코프의 시작 지점 부터 초기화 시작 지점까지는 변수를 참조할 수가 없다.
    그리고 이것을 '일시적 사각지대'라고 부른다.

    호이스팅이 let 에도 존재한다는 '증거'
 */

let letTest1 = 1; // 전역 변수

{
  console.log(letTest1); // ReferenceError
  let letTest1 = 2; // 지역 변수
}

/* 
    < const 키워드 >

    const 
        1. const 는 반드시 선언과 동시에 할당이 이루어져야한다. 그렇지 않으면 SyntaxError
        2. 블록 레벨 스코프
        3. 상수는 기본적으로 재할당이 불가 하지만 객체의 내용 (프로퍼티의 추가, 삭제 변경)이 가능함
        4. 왜냐하면 객체의 내용이 변경되더라도, 객체에 할당된 메모리 주소값이 변경되지는 않기 때문입니다. (원시 타입 vs 객체 타입)
*/

// 객체와 배열의 소개

// 함수란?
// 어떤 작업을 수행하기 위해 필요한 문(statement) 들의 집합을 정의한 코드 블럭

const jukang = {
  age: 28,
  weight: 80,
};

function isPig(human) {
  if (human.weight > 90) return "이 사람은 돼지가 맞아요";
}

console.log(isPig(jukang));
