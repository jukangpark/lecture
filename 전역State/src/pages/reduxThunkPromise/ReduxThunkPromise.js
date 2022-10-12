import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../reduxThunk프라미스/action";

const ReudxThunkPromise = () => {
  // https://jsonplaceholder.typicode.com/posts

  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state);

  const handleClick = () => {
    dispatch(fetchData());
  };

  useEffect(() => {
    console.log("Redux Thunk Promise 가 리렌더링 되었습니다.");
    console.log(data);
  }, [data]);

  return (
    <div>
      <h1>Redux-Thunk 를 사용하여 AJAX 비동기 처리를 해봅시다.</h1>
      <p>Promise 웹 api</p>

      <button onClick={handleClick}>api 버튼</button>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div>
          {data?.map((user, index) => (
            <li key={index}>{user.title}</li>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReudxThunkPromise;
