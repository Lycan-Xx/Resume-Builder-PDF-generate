from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('Helvetica', 'B', 16)
        self.cell(0, 10, "Mohammad Sani Bello - Resume", ln=True, align='C')
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('Helvetica', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

# Helper function to replace en-dash with hyphen to avoid encoding issues.
def sanitize_text(text):
    return text.replace("–", "-")

pdf = PDF()
pdf.add_page()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.set_font("Helvetica", size=12)

# Contact Information
pdf.cell(0, 10, "Mohammad Sani Bello", ln=True)
pdf.cell(0, 10, " +234 7062284169 | msbello514@gmail.com | LinkedIn: https://www.linkedin.com/in/mohammad-bello-94abbb1aa", ln=True)
pdf.ln(5)

# Summary
pdf.set_font("Helvetica", 'B', 14)
pdf.cell(0, 10, "Summary", ln=True)
pdf.set_font("Helvetica", size=12)
summary = (
    "A Chemistry student transitioning to software development, I am an emerging frontend developer eager to master backend systems "
    "and tackle real-world problems with the latest frameworks. Driven by curiosity and a commitment to continuous learning, I enjoy working "
    "independently but also thrive in collaborative environments that challenge me to grow. With a strong work ethic and passion for open-source and "
    "Linux communities, I leverage my expertise in React.js, responsive design, and web application development, along with Git proficiency and version control "
    "systems, to design, implement, and deliver effective solutions that prioritize efficiency and innovation."
)
pdf.multi_cell(0, 8, sanitize_text(summary))
pdf.ln(5)

# Technical Skills
pdf.set_font("Helvetica", 'B', 14)
pdf.cell(0, 10, "Technical Skills", ln=True)
pdf.set_font("Helvetica", size=12)
skills = [
    "Programming Languages: JavaScript, HTML, CSS",
    "Frameworks & Libraries: React.js",
    "Web Development: Responsive design, UI/UX, web application development",
    "Tools & Systems: Git, version control, Linux systems and administration",
    "Soft Skills: Time management, strong work ethic, collaborative design"
]
for skill in skills:
    pdf.cell(0, 8, f"- {skill}", ln=True)
pdf.ln(5)

# Professional Experience
pdf.set_font("Helvetica", 'B', 14)
pdf.cell(0, 10, "Professional Experience", ln=True)
pdf.set_font("Helvetica", 'B', 12)
pdf.cell(0, 10, "Frontend Web Developer, eVault", ln=True)
pdf.set_font("Helvetica", 'I', 12)
pdf.cell(0, 10, sanitize_text("September 2024 - Present"), ln=True)
pdf.set_font("Helvetica", size=12)
exp1 = (
    "Developed functional, responsive, and visually appealing web pages using modern technologies.\n"
    "Contributed to projects including subscription services, e-commerce platforms, and mobile applications.\n"
    "Focused on optimizing user experience, performance, and accessibility."
)
pdf.multi_cell(0, 8, sanitize_text(exp1))
pdf.ln(3)

pdf.set_font("Helvetica", 'B', 12)
pdf.cell(0, 10, "Mobile Phone Repair Apprentice, Emergency Phone Repair, Jimeta Shopping Complex", ln=True)
pdf.set_font("Helvetica", 'I', 12)
pdf.cell(0, 10, sanitize_text("June 2022 - June 2024 (2 years 1 month)"), ln=True)
pdf.set_font("Helvetica", size=12)
exp2 = (
    "Diagnosed and repaired various mobile phone issues under expert supervision.\n"
    "Developed strong problem-solving skills through hands-on troubleshooting of hardware and software.\n"
    "Delivered quality customer service while ensuring effective repairs across multiple phone models."
)
pdf.multi_cell(0, 8, sanitize_text(exp2))
pdf.ln(3)

pdf.set_font("Helvetica", 'B', 12)
pdf.cell(0, 10, "IT Support Technician, Federal College of Education, Yola", ln=True)
pdf.set_font("Helvetica", 'I', 12)
pdf.cell(0, 10, sanitize_text("March 2019 - October 2021 (2 years 8 months)"), ln=True)
pdf.set_font("Helvetica", size=12)
exp3 = (
    "Assisted in IT infrastructure maintenance and provided technical support.\n"
    "Gained experience in troubleshooting, repairing computer systems, networking, and software management.\n"
    "Set up network infrastructure and exam software installations for the CBT center, supporting various examinations.\n"
    "Monitored and supervised exam sessions to ensure smooth, uninterrupted operations."
)
pdf.multi_cell(0, 8, sanitize_text(exp3))
pdf.ln(5)

# Education
pdf.set_font("Helvetica", 'B', 14)
pdf.cell(0, 10, "Education", ln=True)
pdf.set_font("Helvetica", 'B', 12)
pdf.cell(0, 10, "BSc. Chemistry", ln=True)
pdf.set_font("Helvetica", 'I', 12)
pdf.cell(0, 10, "Modibbo Adama University, Yola, Adamawa State", ln=True)
pdf.cell(0, 10, sanitize_text("April 2023 - Present"), ln=True)
pdf.ln(3)

pdf.set_font("Helvetica", 'B', 12)
pdf.cell(0, 10, "High School/Secondary Certificate", ln=True)
pdf.set_font("Helvetica", 'I', 12)
pdf.cell(0, 10, "Federal Government College, Kiyawa, Jigawa State", ln=True)
pdf.cell(0, 10, sanitize_text("August 2015 - August 2018"), ln=True)
pdf.ln(5)

# Additional Information
pdf.set_font("Helvetica", 'B', 14)
pdf.cell(0, 10, "Additional Information", ln=True)
pdf.set_font("Helvetica", size=12)
additional = (
    "Passionate about the open-source and Linux communities.\n"
    "Committed to continuous learning and personal growth.\n"
    "A team player who thrives in collaborative, purpose-driven environments.\n"
    "References available upon request."
)
pdf.multi_cell(0, 8, sanitize_text(additional))

pdf.output("Updated-Developer-Resume.pdf")
print("PDF generated successfully as 'Updated-Developer-Resume.pdf'")
EOF
