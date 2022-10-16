const masterList = function () {
  const data = [];
  const listToDisplay = [];

  const editTask = (task, attribute, value) => {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id == task.id) {
        this.data[i][attribute] = value;
        return;
      }
    }
    console.log("I couldn't find that task!");
  };

  const sortByDate = () => {
    data.sort(sortByDateThenPriorityThenAlpha);
  }

  const produceProjectList = (project) => {
    data.filter( (task) => task.project === project)
      .sort(sortByDateThenPriorityThenAlpha); 
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

  return {
    data,
    listToDisplay,
    editTask,
    sortByDate,
    produceProjectList,
    getListOfProjects
  }
}

const sortByDateThenPriorityThenAlpha = (a,b) => {
  const byDate = a.date - b.date;
  if (byDate !== 0) {
    return byDate;
  }
  if (a.priority.localeCompare(b.priority) !== 0) {
    return a.priority.localeCompare(b.priority);
  }
    return (a.content.toLowerCase().localeCompare(b.content.toLowerCase()));
};

export default masterList;


/*
  removeTask(task) {
    this.data.splice(this.data.indexOf(task), 1);
  }
*/