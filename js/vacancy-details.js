const selectedJob = JSON.parse(localStorage.getItem("selectedJob"));

if(selectedJob){
    const breadcrumb = document.getElementById("breadcrumb");
    const li = document.createElement("li");
    li.className = "crumbs__point crumbs__point--active";
    li.textContent = selectedJob.title;
    breadcrumb.appendChild(li);

    document.getElementById("job-title").textContent = selectedJob.title;
    
    document.getElementById("job-description").textContent = selectedJob.description;
    document.getElementById("job-salary").textContent = selectedJob.salary;
} else {
    document.querySelector(".job-details").textContent = "Никакой вакансии не выбрано.";
}
