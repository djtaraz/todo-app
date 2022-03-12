import axios from "axios";

export default async function toggle(id: number, status: boolean) {
  await axios
    .put(`http://localhost:8000/toggle/${id}`, { status: status })
    .catch((e) => console.error(e.message));
}
