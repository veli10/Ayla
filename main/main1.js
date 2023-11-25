const tbody = document.querySelector('tbody')
const addCompBtn = document.querySelector('#addComp')
const compTable = document.querySelector('table')

let users = JSON.parse(localStorage.getItem('users') )
let currentUser = localStorage.getItem('currentUser')
let computers = users.find(user => user.name === currentUser).comps

let Change = false

function updateTable() {


    tbody.innerHTML = ''

    computers.forEach(comp => {
        tbody.innerHTML += `<tr>
                                <td>${comp.id}</td>
                                <td>${comp.mark}</td>
                                <td>
                                    <img class="img" src="${comp.img}" alt="">
                                </td>
                                <td>${comp.price}</td>
                                <td>
                                    <button id='${comp.id}' class="btn btn-danger">Delete</button>
                                    <button id='${comp.id}' class="btn btn-primary" data-bs-toggle='modal' data-bs-target='#Modal'>Change</button>
                                </td>
                            </tr>`
    });
}

updateTable()


let allInputs
allInputs = document.querySelectorAll('.modal-body input')
function addComputer() {
    console.log('nbdfhv');
    if (!Change) {
        const newComputer = {
            id: computers.length != 0 ? +computers.at(-1).id + 1 : 1,
            mark: allInputs[0].value,
            img: allInputs[1].value,
            // price: allInputs[2].value,
            // memory: allInputs[3].value,
            // processororcpu: allInputs[4].value,
            // ram: allInputs[5].value,
            // memorytip: allInputs[6].value,
            // oc: allInputs[7].value,
            // videocardgb: allInputs[8].value,
            // videocard: allInputs[9].value,
        }

        computers.push(newComputer)

        users.find(user => user.name === currentUser).comps = computers

        localStorage.setItem('users', JSON.stringify(users))
        updateTable()
        for (let input of allInputs) {
            input.value = ''
        }
    } else {
        for (let computer of computers) {
            if (computer.id === currentComp.id) {
                console.log(computer);
                computer.mark = allInputs[0].value;
                computer.img = allInputs[1].value;
                computer.price = allInputs[2].value;
                computer.memory = allInputs[3].value;
                computer.processororcpu = allInputs[4].value;
                computer.ram = allInputs[5].value;
                computer.memorytip = allInputs[6].value;
                computer.oc = allInputs[7].value;
                computer.videocardgb = allInputs[8].value;
                computer.videocard = allInputs[9].value;
            }
        }
        localStorage.setItem('computers', JSON.stringify(computers))
        updateTable()
        for (let input of allInputs) {
            input.value = ''
        }
    }
}

function handleComputer(e) {
    if (e.target.innerText === 'Delete') {
        deleteComputer(e.target.id);
    } else if (e.target.innerText === 'Change') {
        changeComputer(e.target.id);
    }
}

function deleteComputer(id) {
    computers = computers.filter((comp) => comp.id != parseInt(id));

    users.find(user => user.name === currentUser).comps = computers
    localStorage.setItem('users', JSON.stringify(users))
    updateTable()
}

let currentComp

function changeComputer(id) {
    currentComp = computers.find((comp) => comp.id == parseInt(id))

    allInputs[0].value = currentComp.mark
    allInputs[1].value = currentComp.img
    allInputs[2].value = currentComp.price
    allInputs[3].value = currentComp.memory
    allInputs[4].value = currentComp.processororcpu
    allInputs[5].value = currentComp.ram
    allInputs[6].value = currentComp.memorytip
    allInputs[7].value = currentComp.oc
    allInputs[8].value = currentComp.videocardgb
    allInputs[9].value = currentComp.videocard

    Change = true
}

addCompBtn.addEventListener('click', addComputer)
compTable.addEventListener('click', handleComputer)

updateTable()