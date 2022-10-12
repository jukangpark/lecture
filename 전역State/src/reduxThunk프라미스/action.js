/* 액션 타입 */

// DATA 가져오기
export const GET_DATAS = "GET_DATAS"; // 요청 시작
export const GET_DATAS_SUCCESS = "GET_DATAS_SUCCESS"; // 요청 성공
export const GET_DATAS_ERROR = "GET_DATAS_ERROR"; // 요청 실패

// thunk 를 사용 할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없습니다.
// 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮습니다.

export const fetchData = () => async (dispatch) => {
  dispatch({ type: GET_DATAS }); // 요청이 시작됨
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts").then(
      (res) => res.json()
    ); // API 호출
    dispatch({ type: GET_DATAS_SUCCESS, data }); // 성공
  } catch (e) {
    dispatch({ type: GET_DATAS_ERROR, error: e }); // 실패
  }
};

// thunk 함수에서도 파라미터를 받아와서 사용할 수 가 있습니다.
