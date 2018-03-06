(function() {

  const tasksList = document.querySelectorAll('li div'),
        // checkbox = document.getElementsByClassName('custom-checkbox'),
        incompleteTasksList = document.getElementById('incomplete-tasks'),
        completeTasksList = document.getElementById('complete-tasks');
  
  var editTaskElement = undefined,
      id = tasksList.length;

  function hide() {
    let noTaskToDisplay = document.getElementsByClassName('font-weight-light');
    if(document.getElementById('incomplete-tasks').children.length !== 0) {
      noTaskToDisplay[0].classList.add('hide');
    }
    else {
      noTaskToDisplay[0].classList.remove('hide');
    }
    if(document.getElementById('complete-tasks').children.length !== 0) {
      noTaskToDisplay[1].classList.add('hide');
    }
    else {
      noTaskToDisplay[1].classList.remove('hide');
    }
  }

  window.completeTask = function(event) {
    let task = event.srcElement.parentElement.parentElement;
    task.parentElement.removeChild(task);
    if(event.srcElement.checked) {
      completeTasksList.appendChild(task);
    }
    else {
      incompleteTasksList.appendChild(task);
    }
    hide();
  }

  window.editTask = function() {
    let inputTask = document.getElementById('add-task');
    if(inputTask.value == null || inputTask.value === '') {
      editTaskElement = this.parentElement.parentElement;
      editTaskElement.parentElement.removeChild(editTaskElement);
      inputTask.value = this.previousElementSibling.innerText;
      hide();
    }
    else {
      alert('Finish this entry first!');
    }
  };

  window.deleteTask = function() {
    this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
    hide();
  };

  // for(let i=0; i<checkbox.length; i++) {
  //   checkbox[i].onchange = completeTask;
  // }

  // for(let i=0; i<tasksList.length; i++) {
  //   tasksList[i].innerHTML += `<i class="far fa-edit edit"></i>
  //                             <i class="fas fa-trash-alt delete"></i>`;
  // }

  // const editTask = document.getElementsByClassName('edit');
  // for(let i=0; i<editTask.length; i++) {
  //   editTask[i].onclick = window.editTask;
  // }

  // const deleteTask = document.getElementsByClassName('delete');
  // for(let i=0; i<deleteTask.length; i++) {
  //   deleteTask[i].onclick = window.deleteTask;
  // }

  //hide();

  window.addOrEditTask = function(event) {
    if(event.keyCode === 13) {
      var inputTask = document.getElementById('add-task');
      if(inputTask.value == null || inputTask.value === '') {
        alert('No text specified!');
      }
      else {
        if(!editTaskElement) {
          //addTask
          let li = document.createElement('li'),
                  taskId = 'task-' + id++;

          li.className = 'list-group-item';
          li.innerHTML = `<div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="${taskId}" onchange="completeTask(event)">
                            <label class="custom-control-label" for="${taskId}">${inputTask.value}</label>
                            <i class="far fa-edit edit"></i>
                            <i class="fas fa-trash-alt delete"></i>
                          </div>`;

          li.children[0].children[2].onclick = window.editTask;
          li.children[0].children[3].onclick = window.deleteTask;
          
          incompleteTasksList.appendChild(li);
        }
        else {
          //editTask
          editTaskElement.children[0].children[1].innerText = inputTask.value;
          if(editTaskElement.children[0].children[0].checked) {
            completeTasksList.appendChild(editTaskElement);
          }
          else {
            incompleteTasksList.appendChild(editTaskElement);
          }
          editTaskElement = undefined;
        }
        inputTask.value = '';
        hide();
      }
    }
  }

})();