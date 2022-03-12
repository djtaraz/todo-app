import axios from "axios";

export default async function remove(id: number) {
  await axios
    .delete(`http://localhost:8000/todos/${id}`)
    .then((res) => {
      console.log(res.statusText);
    })
    .catch((e) => console.error(e.message));
}
