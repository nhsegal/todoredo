import masterList from './masterList';
import { renderMain, renderSideBar } from './render';
import makeTask from './task';
import currentSettings from './currentSettings';
import DOM from './DOMCache';

let editting = false;
let IDNumber = null;

function addCardEventListeners(task) {
  const checkbox = document.querySelector(`[data-id="${task.id}"] input`);
  checkbox.addEventListener('change', function (box) {
    IDNumber = box.target.getAttribute('data-id');
    const retrievedTask = masterList.data.filter((e) => (e.id == IDNumber))[0];
    if (this.checked) {
      retrievedTask.isCompleted = true;
      box.target.parentElement.classList.add('is-completed');
      masterList.editTask(retrievedTask, 'isCompleted', true);
    } else {
      retrievedTask.isCompleted = false;
      box.target.parentElement.classList.remove('is-completed');
    }
  });

  const editTask = (e) => {
    editting = true;
    IDNumber = e.target.parentElement.getAttribute('data-id');
    const taskToEdit = masterList.data.filter((e) => (e.id == IDNumber))[0];
    const yyyy = taskToEdit.date.getFullYear();
    const mm = taskToEdit.date.getMonth() + 1;
    const dd = taskToEdit.date.getDate();
    let taskDate = String(10000 * yyyy + 100 * mm + dd);
    taskDate = `${taskDate.slice(0, 4)}-${taskDate.slice(
      4,
      6,
    )}-${taskDate.slice(6, 8)}`;
    DOM.newTaskContent.value = taskToEdit.content;
    DOM.newTaskDate.value = taskDate;
    DOM.newTaskProject.value = taskToEdit.project;
    for (const option of DOM.newTaskPriority) {
      if (option.value === task.priority) {
        option.checked = true;
      }
    }
    DOM.addTaskModal.classList.toggle('closed');
  };

  const removeTask = (e) => {
    IDNumber = e.target.parentElement.getAttribute('data-id');
    const taskToDelete = masterList.data.filter((t) => (t.id == IDNumber))[0];
    masterList.removeTask(taskToDelete);
    localStorage.setItem('oldData', JSON.stringify(masterList.data));
    masterList.displayedList.splice(
      masterList.displayedList.indexOf(taskToDelete),
      1,
    );
    localStorage.setItem(
      'oldDisplayList',
      JSON.stringify(masterList.displayedList),
    );
    renderMain(
      masterList,
      currentSettings.viewBy,
      currentSettings.whichProject,
    );
    addMainEventListeners();
  };

  const editBtn = document.querySelectorAll(`[data-id="${task.id}"] button`)[0];
  editBtn.addEventListener('click', editTask);

  const removeBtn = document.querySelectorAll(
    `[data-id="${task.id}"] button`,
  )[1];
  removeBtn.addEventListener('click', removeTask);
}

export function addMainEventListeners() {
  for (const item of masterList.displayedList) {
    addCardEventListeners(item);
  }
}

export function addSideTimeEventListeners() {
  try {
    DOM.todaysTasksSideBar.addEventListener('click', () => {
      currentSettings.update('today', null);
      renderMain(
        masterList,
        currentSettings.viewBy,
        currentSettings.whichProject,
      );
      addMainEventListeners();
    });

    DOM.thisWeekSideBar.addEventListener('click', () => {
      currentSettings.update('this-week', null);
      renderMain(
        masterList,
        currentSettings.viewBy,
        currentSettings.whichProject,
      );
      addMainEventListeners();
    });

    DOM.allTasksSideBar.addEventListener('click', () => {
      currentSettings.update('all', null);
      renderMain(
        masterList,
        currentSettings.viewBy,
        currentSettings.whichProject,
      );
      addMainEventListeners();
    });
  } catch {
    console.log('failed to add today/week/all ELs');
  }
}

export function addSideProjectEventListeners() {
  const removeThis = function (e) {
    if (confirm('Delete this project and all tasks in it?')) {
      const tasksToRemove = masterList.produceTasksInAProject(
        e.target.previousElementSibling.id,
      );
      tasksToRemove.forEach((item) => masterList.removeTask(item));
      localStorage.setItem('oldData', JSON.stringify(masterList.data));
      localStorage.setItem(
        'oldDisplayList',
        JSON.stringify(masterList.displayedList),
      );
      renderMain(
        masterList,
        DOM.main,
        currentSettings.viewBy,
        currentSettings.whichProject,
      );
      console.log(masterList.getListOfProjects());
      renderSideBar(masterList.getListOfProjects());
      addSideProjectEventListeners();
      addMainEventListeners();
      console.log(masterList.getListOfProjects());
    } else {
      console.log('You pressed Cancel!');
    }
  };

  // SideBar Project Name ELs
  try {
    for (const item of DOM.sidebarProjectList) {
      const projectLink = item;
      projectLink.addEventListener('click', () => {
        currentSettings.update('byProject', projectLink.id);
        renderMain(
          masterList,
          currentSettings.viewBy,
          currentSettings.whichProject,
        );
        addMainEventListeners();
      });
    }
    for (const item of DOM.sidebarProjectListRemoveBtns) {
      const projectLinkRm = item;
      projectLinkRm.addEventListener('click', (e) => {
        if (
          currentSettings.viewBy === 'byProject'
          && currentSettings.whichProject
            === projectLinkRm.previousElementSibling.id
        ) {
          currentSettings.update('all');
        }
        removeThis(e);
        renderMain(
          masterList,
          currentSettings.viewBy,
          currentSettings.whichProject,
        );
        addMainEventListeners();
        renderSideBar(masterList.getListOfProjects());
        addSideProjectEventListeners();
      });
    }
  } catch {
    console.log('failed to add ELs to projects');
  }
}

export function addInitialEventListeners() {
  //  *** AddTaskModal open, submit, and close btn ELs ***
  // Callback for Submit Button:
  const taskSubmit = function (e) {
    e.preventDefault();
    DOM.addTaskModal.classList.toggle('closed');
    if (editting) {
      const taskToEdit = masterList.data.filter((e) => (e.id == IDNumber))[0];
      masterList.editTask(taskToEdit, 'content', DOM.newTaskContent.value);
      let taskDate = new Date(DOM.newTaskDate.value);
      taskDate.setHours(0, 0, 0, 0);  
      masterList.editTask(taskToEdit, 'date', taskDate);
      const option = Array.from(DOM.newTaskPriority).filter(
        (priorityLevel) => priorityLevel.checked,
      )[0];
      masterList.editTask(taskToEdit, 'priority', option.value);
      masterList.editTask(taskToEdit, 'project', DOM.newTaskProject.value);
      masterList.sortByDate();
      localStorage.setItem('oldData', JSON.stringify(masterList.data));
      localStorage.setItem(
        'oldDisplayList',
        JSON.stringify(masterList.displayedList),
      );
    } else {
      let newTaskPriorityValue = null;
      DOM.newTaskPriority.forEach((option) => {
        if (option.checked) {
          newTaskPriorityValue = option.value;
        }
      });
      const newTask = makeTask(
        DOM.newTaskDate.value,
        DOM.newTaskContent.value,
        newTaskPriorityValue,
        DOM.newTaskProject.value,
      );
      masterList.addTask(newTask);
      masterList.sortByDate();
      localStorage.setItem('oldData', JSON.stringify(masterList.data));
      localStorage.setItem(
        'oldDisplayList',
        JSON.stringify(masterList.displayedList),
      );
    }
  
    // Clear the modal input fields when modal is submitted
    DOM.newTaskContent.value = null;
    DOM.newTaskDate.value = null;
    // eslint-disable-next-line no-restricted-syntax
    for (const option of DOM.newTaskPriority) {
      option.checked = false;
    }
    DOM.newTaskProject.value = null;
    renderMain(
      masterList,
      DOM.main,
      currentSettings.viewBy,
      currentSettings.whichProject,
    );
    renderSideBar(masterList.getListOfProjects());
    addSideProjectEventListeners();
    addSideTimeEventListeners();
    addMainEventListeners();
    masterList.sortByDate();    
  };

  DOM.addTaskBtn.addEventListener('click', () => {
    editting = false;
    DOM.addTaskModal.classList.toggle('closed');
  });

  // Clear the modal input fields when modal is closed by the x
  DOM.closeModalButton.addEventListener('click', () => {
    DOM.addTaskModal.classList.toggle('closed');
    DOM.newTaskContent.value = null;
    DOM.newTaskDate.value = null;
    // eslint-disable-next-line no-restricted-syntax
    for (const option of DOM.newTaskPriority) {
      option.checked = false;
    }
    DOM.newTaskProject.value = null;
  });
  DOM.addTaskForm.addEventListener('submit', taskSubmit);

  // Today, Week, and All sideBar ELs
  try {
    DOM.todaysTasksSideBar.addEventListener('click', () => {
      currentSettings.update('today', null);
      renderMain(
        masterList,
        currentSettings.viewBy,
        currentSettings.whichProject,
      );
      addMainEventListeners();
    });

    DOM.thisWeekSideBar.addEventListener('click', () => {
      currentSettings.update('this-week', null);
      renderMain(
        masterList,
        currentSettings.viewBy,
        currentSettings.whichProject,
      );
      addMainEventListeners();
    });

    DOM.allTasksSideBar.addEventListener('click', () => {
      currentSettings.update('all', null);
      renderMain(
        masterList,
        currentSettings.viewBy,
        currentSettings.whichProject,
      );
      addMainEventListeners();
    });
  } catch {
    console.log('failed to add event listeners');
  }
}
