document.addEventListener('DOMContentLoaded', function() {
    // Load JSON file và render dữ liệu
    fetch('experience.json')
        .then(response => response.json())
        .then(data => {
            const experienceList = document.getElementById('experience-list');
            
            // Lặp qua từng item trong JSON và tạo HTML
            data.forEach(item => {
                const experienceItem = document.createElement('div');
                experienceItem.classList.add('item');
                experienceItem.innerHTML = `
                    <h4>${item.role}</h4>
                    <div class="time">
                        <span style="font-weight: bold;">${item.company}<br></span>
                        <span>${item.time}</span>
                    </div>
                    <div class="des">${item.description}</div>
                `;
                experienceList.appendChild(experienceItem);
            });
        })
        .catch(error => console.error('Error loading experience JSON:', error));

    // Lấy phần tử container của dự án
    const projectContainer = document.querySelector('.project');

    // Kiểm tra nếu phần tử projectContainer tồn tại
    if (projectContainer) {
        // Tải file JSON và hiển thị dự án
        fetch('projects.json') // Đường dẫn tệp JSON
            .then(response => response.json())
            .then(data => {
                renderProjects(data); // Gọi hàm để hiển thị các dự án
            })
            .catch(error => {
                console.error('Error loading projects JSON:', error);
                projectContainer.innerHTML = '<p>Error loading projects. Please try again later.</p>';
            });

        // Hàm hiển thị dự án
        function renderProjects(projects) {
            let html = '<h2>PROJECTS</h2>'; // Khai báo biến html để chứa nội dung

            // Lặp qua từng dự án trong JSON
            projects.forEach(project => {
                html += `
                    <div class="item">
                        <h4>${project.name}</h4>
                        <div class="time">${project.time}</div>
                        <div class="web">
                            <a href="${project.web}" target="_blank">${project.web}</a>
                        </div>
                        <div class="location">${project.location}</div>
                        <div class="des">
                            <p>${project.description}</p>
                            <ul>
                                ${
                                    project.features.map(feature => `<li>${feature}</li>`).join('')
                                }
                            </ul>
                        </div>
                    </div>
                `;
            });

            projectContainer.innerHTML = html; // Gán nội dung HTML vào container
        }
    } else {
        console.error('Project container not found!');
    }
});
