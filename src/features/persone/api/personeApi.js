

export async function getFingers(dataBase, id) {
  return await fetch(`${dataBase}/bdfingers/${id}`).then((data) => data.json());
}

export async function getEyes(id) {
  return new Promise((res, rej) =>
    setTimeout(() => {
      console.log("Получены глаза по id ", id);
      res({ 801: "eye right", 802: "eye left" });
    }, 3000)
  );
}

export async function getText(dataBase, id) {
  return await fetch(`${dataBase}/employees/${id}`).then((data) => data.json());
}

export async function createPerson(dataBase, data) {
  return await fetch(`${dataBase}/employees`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  }).then((data) => data.json());
}

export async function updateTextFields(dataBase, data) {
  return await fetch(`${dataBase}/employees`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  }).then((data) => data.json());
}

export async function updateFingers(dataBase, data) {
  return await fetch(`${dataBase}/bdfingers`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  }).then((data) => data.json());
}

export async function updateEyes(dataBase, data) {
  return await fetch(`${dataBase}/bdeyes`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  }).then((data) => data.json());
}
