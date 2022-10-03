export function makeImagePath(id, format) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
// string인 id 랑 format 을 받을거지만,
// format 은 안넘어올 수도 있으니까 이런식으로 처리
// format 이 없다면 original 을 사용할거라고 명시.
