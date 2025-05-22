export async function getFingers(id) {
  return await fetch(`http://localhost:8000/bdfingers/${id}`).then((data) => data.json());
}

export async function getEyes(id) {
  return new Promise((res, rej) =>
    setTimeout(() => {
      console.log("Получены глаза по id ", id);
      res({ 801: "eye right", 802: "eye left" });
    }, 3000)
  );
}

export async function getText(id) {
  return await fetch(`http://localhost:8000/employees/${id}`).then((data) => data.json());
}
