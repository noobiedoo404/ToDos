update();
//add fuctionality getting add
add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);

//when we first add data in the list, getAndUpdate function is called.
function getAndUpdate() {
    if (document.getElementById("title").value.length == 0) {
        alert("Title can't be empty!")

    } else if (confirm(`${document.getElementById('title').value} will be added in queue.`)) {
        console.log("Updating List...");
        tit = document.getElementById('title').value;
        desc = document.getElementById('description').value;
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        //for the very first time localStorage is empty
        //localStorage is string type,so immutable
        if (localStorage.getItem('itemsJson') == null) {
            // document.getElementById("items").innerHTML = "<h2>Nothing to do yet :)</h2>";
            //maintaining array to achieve mutablity
            itemJsonArray = [];
            itemJsonArray.push([tit, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        } else {
            //as localStorage.getItem will also give string type data
            itemJsonArrayStr = localStorage.getItem('itemsJson')
            itemJsonArray = JSON.parse(itemJsonArrayStr);
            itemJsonArray.push([tit, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        }
        update();
    }
}



function update() {
    // console.log("update hocche!");

    if (localStorage.getItem('itemsJson') == "[]" || localStorage.getItem('itemsJson') == null) {

        document.getElementById("items").innerHTML = "<h2 style='margin-bottom:3rem;font-size: 1.5rem;'>Nothing to do yet :)</h2>";

    } else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);

        if (localStorage.length == 1) {
            document.getElementById("items").innerHTML = `<h2 id='list'>Your Items</h2>
            <table class='table'>
                <thead>
                    <tr>
                        <th scope='col'>Sno</th>
                        <th scope='col'>Item Title</th>
                        <th scope='col'>Item Description</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody id='tableBody'>
                </tbody>
            </table>`;
        }
        // Populate the table
        let tableBody = document.getElementById("tableBody");
        let str = "";
        itemJsonArray.forEach((element, index) => {
            str += `
                <tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td> 
                <td><button class="btn" onclick="deleted(${index})"><i class="fa-regular fa-trash-can"></i></button></td>
                </tr>`;
        });

        tableBody.innerHTML = str;
    }

}


//adding delete functionality
function deleted(itemIndex) {
    // console.log("Delete", itemIndex);

    if (confirm("Task will be removed from queue.")) {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        // Delete itemIndex element from the array
        itemJsonArray.splice(itemIndex, 1);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        console.log(localStorage.getItem('itemsJson'));
        update();
    } else { //do nothing}


    }
}

function clearStorage() {
    if (confirm("Do you areally want to clear?")) {
        console.log('Clearing the storage')
        localStorage.clear();
        update()
    }
}