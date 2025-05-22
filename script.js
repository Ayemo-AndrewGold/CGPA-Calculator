

let subjects = [];
let editIndex = -1;

function addSubject() {
    const subjectInput = 
        document.getElementById('subject');
    const grade = 
        document.getElementById('grade').value;
    const creditInput = 
        document.getElementById('credit');
    const credit = 
        parseInt(creditInput.value);

    // Validate credit input
    const inputError = 
        document.getElementById('inputError')
    const creditError = 
        document.getElementById('creditError');
    if (!subjectInput.value || isNaN(credit)) {
        inputError.textContent = 
            'Please fill out all fields.';
        return;
    }
    else if (credit < 1 || credit > 20) {
        creditError.textContent = 
            'Credit must be between 1 and 20';
        return;
    } else {
        creditError.textContent = '';
    }
    if (editIndex !== -1) {
        subjects[editIndex] = 
        { subject: subjectInput.value, grade, credit };
        editIndex = -1;
    } else {
        subjects.push(
            { subject: subjectInput.value, grade, credit });
    }

    displaySubjects();
    clearForm();
}

function displaySubjects() {
    const subjectList = 
        document.getElementById('subjectList');
    subjectList.innerHTML = '';

    subjects.forEach((s, index) => {
        const row = document.createElement('tr');

        const subjectCell = document.createElement('td');
        subjectCell.textContent = s.subject;

        const gradeCell = document.createElement('td');
        gradeCell.textContent = s.grade;

        const creditCell = document.createElement('td');
        creditCell.textContent = s.credit;

        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';
        editButton.onclick = () => editSubject(index);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteSubject(index);

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(subjectCell);
        row.appendChild(gradeCell);
        row.appendChild(creditCell);
        row.appendChild(actionCell);

        subjectList.appendChild(row);
    });
}

function editSubject(index) {
    const subjectInput = 
        document.getElementById('subject');
    const selectedSubject = subjects[index];

    subjectInput.value = selectedSubject.subject;
    document.getElementById('grade').value = 
        selectedSubject.grade;
    document.getElementById('credit').value = 
        selectedSubject.credit;

    editIndex = index;
}

function deleteSubject(index) {
    subjects.splice(index, 1);
    displaySubjects();
}

function calculateCGPA() {
    const totalCredits = subjects.reduce(
    (sum, s) => sum + s.credit, 0);
    const weightedSum = subjects.reduce(
    (sum, s) => sum + getGradePoint(s.grade) * s.credit, 0);

    const cgpa = totalCredits === 0 ? 0 : 
    (weightedSum / totalCredits).toFixed(2);
    document.getElementById('cgpa').textContent = cgpa;
}

function getGradePoint(grade) {
    // Assign grade points as per your grading system
    switch (grade) {
     case 'A1': return 5.0; //(assuming 75-100%)
     case 'A2': return 4.5; //(assuming 70-74%)
     case 'B1': return 4.0; //(assuming 65-69%)
     case 'B2': return 3.5; //(assuming 60-64%)
     case 'C1': return 3.0; //(assuming 55-59%)
     case 'C2': return 2.5; //(assuming 50-54%)
     case 'D': return 2.0; //(assuming 45-49%)
     case 'E': return 1.0; //(assuming 40-44%)
     case 'F': return 0.0; //(assuming below 40%)
      

        default: return 0.0;
    }
}

function clearForm() {
    document.getElementById('subject').value = '';
    document.getElementById('grade').value = 'A1';
    document.getElementById('credit').value = '';
}

function resetForm() {
    subjects = [];
    editIndex = -1;
    document.getElementById('subjectList').innerHTML = '';
    document.getElementById('cgpa').textContent = '0.00';
    clearForm();
}


const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')
const consentForm = document.getElementById('consent-form')
const modalText = document.getElementById('modal-text')
const declineBtn = document.getElementById('decline-btn')
const modalChoiceBtns = document.getElementById('modal-choice-btns')

setTimeout(function(){
    modal.style.display = 'inline'
}, 1500)

modalCloseBtn.addEventListener('click', function(){
    modal.style.display = 'none'
})

declineBtn.addEventListener('mouseenter', function(){
    modalChoiceBtns.classList.toggle('modal-choice-btns-reverse')
})

consentForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    const consentFormData = new FormData(consentForm)
    const fullName = consentFormData.get('fullName')
    
    modalText.innerHTML = `
    <div class="modal-inner-loading">
        <img src="image/loading.svg" class="loading">
        <p id="upload-text">Uploading your data to our server...</p>
    </div>` 
    
    setTimeout(function(){
        document.getElementById('upload-text').innerText = `
        Confirming your name and email...`
    }, 1500)
    
    
    setTimeout(function(){
        document.getElementById('modal-inner').innerHTML = `
        <h2>Thanks for signing up <span class="modal-display-name">${fullName}</span> </h2>
        <p>You can now explore our CGPA calculator! Calculate your grades with ease</p>
        <div class="idiot-gif">
            <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHdndWw3MzQwbGRmMjZzN2w5ZWM5eDI3N211N3VtaHluMnRuMnpkOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XD9o33QG9BoMis7iM4/giphy.webp">
        </div>
    `
    modalCloseBtn.disabled = false
    }, 3000)
  
}) 
