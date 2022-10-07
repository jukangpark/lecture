import { useState } from "react";

const Comment = () => {
  const [comment, setComment] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/user/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message));

    setComment("");
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <form>
        <input placeholder="댓글" onChange={handleChange} />
        <button onClick={handleSubmit}>등록</button>
      </form>
    </div>
  );
};

export default Comment;
