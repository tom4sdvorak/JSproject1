function addTask(task, done){
    // Create new <li> element
    var newListItem = document.createElement('li');
    newListItem.setAttribute('class','item');
    
    // Create Checkbox for the <li> element
    var checkbox = document.createElement('input');
    checkbox.setAttribute('type','checkbox');
    checkbox.setAttribute('class','itemCheckbox');
    if(done){
        checkbox.setAttribute('checked','true');
    }
    checkbox.addEventListener("click", markDone);
    newListItem.appendChild(checkbox);

    // Create task text for the <li> element
    var taskText = document.createElement('span');
    taskText.setAttribute('class','itemLabel');
    taskText.innerHTML = task;
    newListItem.appendChild(taskText);

    // Create delete button for the <li> element
    var delButton = document.createElement('input');
    delButton.setAttribute('type','button');
    delButton.setAttribute('class','itemDelButton');
    delButton.setAttribute('value','×');
    delButton.addEventListener("click", removeTask);
    newListItem.appendChild(delButton);
    

    // Append new <li> element to one of two lists
    if(done){
        var list = document.getElementById('doneList');
    }
    else{
        var list = document.getElementById('toDoList');
        document.getElementById('counter').innerHTML = 1+Number(document.getElementById('counter').innerHTML);
    }
    list.appendChild(newListItem);
    console.log("Adding task " + task);
}

// Update todo list or done list
function updateSavedList(done){
    // Read <li> elements from todo/done list
    if(done){
        var list = document.getElementById('doneList');
    }
    else{
        var list = document.getElementById('toDoList');
    }
    var items = list.getElementsByClassName('itemLabel');

    // Loop thru <li> elements and save their value into array
    var itemsList = [];
    for (var item of items){
        itemsList.push(item.innerHTML);
        console.log("Saving item: " + item.innerHTML);
    }
    
    // Turn the array of items into one JSON string to save it in localStorage
    var itemsAsString = JSON.stringify(itemsList);
    console.log("Full JSON: " + itemsAsString);
    if(done){
        localStorage.setItem('doneList', itemsAsString);
    }
    else{
        localStorage.setItem('toDoList', itemsAsString);
    }
    
}

function loadList(){
    // localStorage.clear();
    // Parse JSON strings saved in local storage to two arrays of todo and done tasks
    var itemsAsString = localStorage.getItem('toDoList');
    var doneItemsAsString = localStorage.getItem('doneList');
    var itemsList = JSON.parse(itemsAsString);
    var doneItemsList = JSON.parse(doneItemsAsString);
    var toDoList = document.getElementById('toDoList');
    var doneList = document.getElementById('doneList');
    // Empty current lists just in case and populate with loaded tasks
    toDoList.innerHTML = "";
    doneList.innerHTML = "";
    for (var item of itemsList){
        addTask(item,false);
    }
    for (var item of doneItemsList){
        addTask(item,true);
    }
}

function addNewTask(){
    var newTask = document.getElementById('newTask').value;
    if(newTask.length < 3){
        return false;
    }
    addTask(newTask, false);
    updateSavedList(false);
}

function markDone(e){
    // Move item from one list to other depending on where it was when checkbox was clicked
    var parent = e.target.parentElement;
    if(parent.parentElement.id == 'toDoList'){
        console.log("Task done");
        var list = document.getElementById('doneList');
        document.getElementById('counter').innerHTML = Number(document.getElementById('counter').innerHTML)-1;
        list.appendChild(parent);
        updateSavedList(true);
        updateSavedList(false);
    }
    else if (parent.parentElement.id == 'doneList'){
        console.log("Task undone");
        var list = document.getElementById('toDoList');
        document.getElementById('counter').innerHTML = 1+Number(document.getElementById('counter').innerHTML);
        list.appendChild(parent);
        updateSavedList(true);
        updateSavedList(false);
    }

}

function removeTask(e){
    // Remove item from list when delete button was pressed
    var parent = e.target.parentElement;
    if(parent.parentElement.id == 'toDoList'){
        document.getElementById('counter').innerHTML = Number(document.getElementById('counter').innerHTML)-1;
    }
    parent.remove();
    updateSavedList(true);
    updateSavedList(false);
    console.log("Task removed");
}

function toggleDoneList(){
    var button = document.getElementById('toggleButton');
    if(button.value == "⇈"){
        button.value = "⇊";
        document.getElementById('doneList').style.display = 'none';
    }
    else{
        button.value = "⇈";
        document.getElementById('doneList').style.display = 'block';
    }
}

function clearDoneList(){
    document.getElementById('doneList').innerHTML = "";
    updateSavedList(true);
}