const masterList = function () {
  const data = [];
  const displayedList = [];

  const editTask = (task, attribute, value) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == task.id) {
        data[i][attribute] = value;
        return;
      }
    }
    console.log("I couldn't find that task!");
  };

  const sortByDate = () => {
    data.sort(sortByDateThenPriorityThenAlpha);
  }

  const produceTasksInAProject = (project) => {
    let filtered = data.filter( (task) => task.project === project);
    return filtered;
  }

  const getListOfProjects = () => {
    const allProjects = [];
    data.forEach((task) => {
      if (task.project != null && task.project !== '' && !allProjects.some((a) => a === task.project)) {
        allProjects.push(task.project);
      }
    });
    return allProjects;
  }

  const removeTask = (t) => {
    data.splice(data.indexOf(t), 1);
  }

  const addTask = (t) => {
    data.push(t);
    sortByDate();
  }

  return {
    data,
    displayedList,
    editTask,
    sortByDate,
    produceTasksInAProject,
    getListOfProjects,
    removeTask,
    addTask
  }
}

const sortByDateThenPriorityThenAlpha = (a,b) => {
  const byDate = a.date - b.date;
  if (byDate !== 0) {
    return byDate;
  }
  if (a.priority !== b.priority) {
    if (a.priority === "normal") {
      return 1
    } else {
      return -1
    }
  }
  return (b.content.localeCompare(a.content));
};

export default masterList();
