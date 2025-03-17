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

    // Tải CV
    var container = document.querySelector('.container');
    var cache_width = container.offsetWidth;
    var a4 = [595.28, 841.89]; // Kích thước A4

    // Kiểm tra nút bấm
    const downloadButton = document.getElementById('download-pdf');
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            createPDF();
        });
    } else {
        console.error('Download button not found!');
    }

    // Tạo PDF từ container
    function createPDF() {
        if (container) {
            getCanvas(function(canvas) {
                var img = canvas.toDataURL("image/png");

                // Đảm bảo jsPDF đã được tải
                const { jsPDF } = window.jspdf;
                var doc = new jsPDF({
                    unit: 'px',
                    format: 'a4'
                });
                doc.addImage(img, 'PNG', 20, 20);  // Thêm ảnh vào PDF
                doc.save('Resume_Dao_Duy_Long.pdf');  // Lưu PDF
                container.style.width = cache_width + 'px';  // Khôi phục lại chiều rộng của phần tử
            });
        }
    }

    // Tạo đối tượng canvas từ phần tử HTML
    function getCanvas(callback) {
        if (container) {
            container.style.width = (a4[0] * 1.33333 - 80) + 'px'; // Điều chỉnh kích thước cho canvas
            html2canvas(container, {
                imageTimeout: 2000,  // Thời gian chờ tải hình ảnh
                removeContainer: true,
                onrendered: function(canvas) {
                    callback(canvas);  // Gọi callback với canvas
                }
            });
        } else {
            console.error('Container not found for canvas generation');
        }
    }
});
