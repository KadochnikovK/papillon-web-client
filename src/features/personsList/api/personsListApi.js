export default async function getPersons() {
  return await fetch("http://localhost:8000/employees/", {
    method: "GET"
  }).then(data => data.json()).then(data => data.rows)
}
