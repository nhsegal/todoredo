function dom() {
  const main = document.querySelector('main');
  const body = document.querySelector('body');
  const sideBar = document.querySelector('#sidebar');
  const todaysTasksSideBar = document.querySelector('#todays-tasks');
  const thisWeekSideBar = document.querySelector('#this-week');
  const allTasksSideBar = document.querySelector('#all-tasks');
  
  // Getters are used for DOM elements that change
  return {
    main,
    body,
    sideBar,
    todaysTasksSideBar,
    thisWeekSideBar,
    allTasksSideBar,
    get addTaskBtn() {
      return document.querySelector('#add-a-task');
    },
    get addTaskForm() {
      return document.querySelector('#task-form');
    },
    get addTaskModal() {
      return document.querySelector('#add-a-task-modal');
    },
    get closeModalButton() {
      return document.querySelector('#close-modal-button');
    },
    get newTaskContent() {
      return document.querySelector('#task-content');
    },
    get newTaskDate() {
      return document.querySelector('#date');
    },
    get newTaskPriority() {
      return [...document.querySelectorAll('input[name=priority]')];
    },
    get newTaskProject() {
      return document.querySelector('#project');
    },
    get cardEditBtns() {
      return [...document.querySelectorAll('.edit-task')];
    },
    get cardRemoveBtns() {
      return [...document.querySelectorAll('.remove-task')];
    },
    get cardCheckBoxs() {
      return [...document.querySelectorAll('[name="isCompletedCheckbox"]')];
    },
    get listByProject() {
      return document.querySelector('#list-by-project');
    },
    get sidebarProjectList() {
      const nodeListOfProjectLinks = document.getElementById('list-by-project').children;
      const arr = [];
      for (const child of nodeListOfProjectLinks) {
        arr.push(child.firstChild);
      }
      return arr;
    },
    get sidebarProjectListRemoveBtns() {
      const nodeListOfProjectLinks = document.getElementById('list-by-project').children;
      const arr = [];
      for (const child of nodeListOfProjectLinks) {
        arr.push(child.lastChild);
      }
      return arr;
    }
  };
}
const DOM = dom();
export default DOM;
