function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function sortTareas(tareas) {
  const sortedTareas = [];
  const map = new Map();

  let idTarea = null;
  tareas.forEach((tarea, i) => {
    if (tarea.proceso_tarea.idTareaAntecesora === null) {
      idTarea = tarea.id
      sortedTareas.push(tarea);
    } else {
      map.set(tarea.proceso_tarea.idTareaAntecesora, i);
    }
  });

  while (sortedTareas.length < tareas.length) {
    let nextTarea = tareas[map.get(idTarea)];
    sortedTareas.push(nextTarea);
    idTarea = nextTarea.id;
  }

  return sortedTareas;
}

module.exports = {
  isEmpty,
  sortTareas
}
