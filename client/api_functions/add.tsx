import axios from "axios";

export default async function toggle(name: string) {
  await axios
    .post(`http://localhost:8000/todo`, { name: name })
    .catch((e) => console.error(e.message));
}
