// เปลี่ยน URL ตรงนี้ด้วย RAW URL ของไฟล์ resume.json ของคุณ
const rawUrl = 'https://raw.githubusercontent.com/genomesylph/avanrada/refs/heads/main/resume.json';

async function fetchResumeData() {
    try {
        const response = await fetch(rawUrl);
        const data = await response.json();
        renderResume(data);
    } catch (error) {
        console.error('Error fetching resume data:', error);
        document.querySelector('.resume-container').innerHTML = '<h1>Oops! Failed to load resume data. Please check the GitHub URL.</h1>';
    }
}

function renderResume(data) {
    // Header
    document.getElementById('profile-image').src = data.profileImage;
    document.getElementById('user-name').textContent = data.name;
    document.getElementById('user-title').textContent = data.title;

    // Contact
    document.getElementById('email-link').textContent = data.contact.email;
    document.getElementById('email-link').href = `mailto:${data.contact.email}`;
    document.getElementById('phone-number').textContent = data.contact.phone;
    document.getElementById('linkedin-link').href = data.contact.linkedin;
    document.getElementById('github-link').href = data.contact.github;

    // Summary
    document.getElementById('user-summary').textContent = data.summary;

    // Skills
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = data.skills.map(skill => `<li>${skill}</li>`).join('');

    // Experience
    const experienceList = document.getElementById('experience-list');
    experienceList.innerHTML = data.experience.map(job => `
        <div class="job">
            <h4>${job.title}</h4>
            <p><strong>${job.company}</strong> | ${job.period}</p>
            <p>${job.description}</p>
        </div>
    `).join('');

    // Education
    const educationList = document.getElementById('education-list');
    educationList.innerHTML = data.education.map(edu => `
        <div class="education-item">
            <h4>${edu.degree}</h4>
            <p><strong>${edu.school}</strong> | ${edu.year}</p>
        </div>
    `).join('');
}

// เริ่มต้นดึงข้อมูลเมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', fetchResumeData);
