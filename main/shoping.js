
const users = JSON.parse(localStorage.getItem('users')) || [];
const allTabPanes = document.querySelectorAll('.tab-pane');

function loadContentForTab(tabPaneType) {
  $('#tabSwitchSpinner').show();

  return new Promise(resolve => {
    setTimeout(() => {
      $('#tabSwitchSpinner').hide();
      
      let compsHtml = '';
  
      for (let user of users) {
        if (user.comps) {
          for (let comp of user.comps) {
            if (tabPaneType.toUpperCase() === comp.mark.toUpperCase()) {
              const userPhone = user.phone || 'N/A';
  
              compsHtml += `<div class="computer pb-4 col">
                <img class="imgComps mt-2" src="${comp.img}" alt="comp">
                <p class="mx-3 mb-0 bg-opacity-25 bg-success">Name: ${comp.mark}</p>
                <p class="mx-3 mb-0 bg-opacity-25 bg-success">Opinion: ${comp.opinion}</p>
                <p class="mx-3 mb-0 bg-opacity-25 bg-success">Price: ${comp.price}</p>
                <p class="mx-3 mb-0 bg-opacity-25 bg-success">New: ${comp.new}</p>
                <p class="mx-3 mb-0 bg-opacity-25 bg-success">Phone: ${userPhone}</p>
                <button class="btn btn-primary moreBTN" data-bs-toggle="modal" data-bs-target="#moreModal" data-id="${comp.id}">More</button>
              </div>`;
            }
          }
        }
      }
  
      if (compsHtml === '') {
        compsHtml = `There is no computers`;
      }
  
      const tabPane = $(`#${tabPaneType}`);
      tabPane.html(compsHtml);

      resolve();
    }, 1000); 
  });
}

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', function () {
    const tabPaneType = link.getAttribute('data-bs-target').substring(1);
    loadContentForTab(tabPaneType);
  });
});

const firstTabPaneType = document.querySelector('.nav-link').getAttribute('data-bs-target').substring(1);
loadContentForTab(firstTabPaneType);


document.querySelectorAll('.tab-content').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    if (event.target.classList.contains('moreBTN')) {
      const compId = event.target.getAttribute('data-id');
      const selectedComp = getCompById(compId);
      const selectedUser = getUserByCompId(compId);

      if (selectedComp) {
        const modalBody = document.getElementById('moreModalBody');

        modalBody.innerHTML = `<img src="${selectedComp.photo}" alt="comp" class="size">
        <p>Name: ${selectedComp.name}</p>
        <p>Opinion: ${selectedComp.opinion}</p>
        <p>Price: ${selectedComp.price}</p>
        <p>Phone: ${selectedUser ? selectedUser.phone : 'N/A'}</p>
        <p>Memoryfull: ${selectedComp.fullMemory}</p>
        <p>Memorynotfull: ${selectedComp.notFullMemory}</p>
        <p>Memorytype: ${selectedComp.typeOfMemory}</p>
        <p>Processor: ${selectedComp.prosessor}</p>
        <p>System: ${selectedComp.sistem}</p>
        <p>Video Card: ${selectedComp.videoCart}</p>`;
      }
    }
  });
});
