export default async function getPersons(dataBase) {
  return await fetch(`${dataBase}/employees/`, {
    method: "GET",
  })
    .then((data) => data.json())
    .then((data) => data.rows);
}
