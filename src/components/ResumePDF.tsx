import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';

// Register a default font
Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Inter',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#544cd7',
    textTransform: 'uppercase',
    borderBottom: '1 solid #544cd7',
    paddingBottom: 2,
  },
  experienceItem: {
    marginBottom: 10,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  companyName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  dates: {
    fontSize: 10,
    color: '#666666',
  },
  position: {
    fontSize: 11,
    fontWeight: 'medium',
    marginBottom: 5,
  },
  responsibility: {
    fontSize: 10,
    marginBottom: 2,
    paddingLeft: 10,
  },
  bullet: {
    width: 3,
    height: 3,
    backgroundColor: '#000000',
    borderRadius: '50%',
    marginRight: 5,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#f3f4f6',
    padding: '4 8',
    borderRadius: 4,
  },
  link: {
    color: '#544cd7',
    textDecoration: 'none',
  },
});

interface ResumePDFProps {
  data: {
    personalInfo: {
      name: string;
      email: string;
      phone: string;
      location: string;
      links: {
        linkedin?: string;
        github?: string;
      };
    };
    education: Array<{
      institution: string;
      degree: string;
      major: string;
      graduationDate: string;
      gpa?: string;
    }>;
    experience: Array<{
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      responsibilities: string[];
    }>;
    skills: {
      technical: string[];
      soft: string[];
    };
    projects: Array<{
      name: string;
      description: string;
      technologies: string[];
      links: string[];
    }>;
  };
}

const ResumePDF: React.FC<ResumePDFProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header / Personal Info */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.contact}>{data.personalInfo.email} • {data.personalInfo.phone}</Text>
        <Text style={styles.contact}>{data.personalInfo.location}</Text>
        {(data.personalInfo.links.linkedin || data.personalInfo.links.github) && (
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {data.personalInfo.links.linkedin && (
              <Link src={data.personalInfo.links.linkedin} style={[styles.contact, styles.link]}>
                LinkedIn
              </Link>
            )}
            {data.personalInfo.links.github && (
              <Link src={data.personalInfo.links.github} style={[styles.contact, styles.link]}>
                GitHub
              </Link>
            )}
          </View>
        )}
      </View>

      {/* Experience Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {data.experience.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.companyHeader}>
              <Text style={styles.companyName}>{exp.company}</Text>
              <Text style={styles.dates}>{exp.startDate} - {exp.endDate}</Text>
            </View>
            <Text style={styles.position}>{exp.position}</Text>
            {exp.responsibilities.map((resp, idx) => (
              <Text key={idx} style={styles.responsibility}>• {resp}</Text>
            ))}
          </View>
        ))}
      </View>

      {/* Education Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.companyHeader}>
              <Text style={styles.companyName}>{edu.institution}</Text>
              <Text style={styles.dates}>{edu.graduationDate}</Text>
            </View>
            <Text style={styles.position}>{edu.degree} in {edu.major}</Text>
            {edu.gpa && <Text style={styles.responsibility}>GPA: {edu.gpa}</Text>}
          </View>
        ))}
      </View>

      {/* Skills Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={{ gap: 8 }}>
          <View>
            <Text style={[styles.position, { marginBottom: 4 }]}>Technical Skills</Text>
            <View style={styles.skills}>
              {data.skills.technical.map((skill, index) => (
                <Text key={index} style={styles.skill}>{skill}</Text>
              ))}
            </View>
          </View>
          <View>
            <Text style={[styles.position, { marginBottom: 4 }]}>Soft Skills</Text>
            <View style={styles.skills}>
              {data.skills.soft.map((skill, index) => (
                <Text key={index} style={styles.skill}>{skill}</Text>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Projects Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {data.projects.map((project, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.companyName}>{project.name}</Text>
            <Text style={[styles.responsibility, { marginBottom: 4 }]}>{project.description}</Text>
            <View style={styles.skills}>
              {project.technologies.map((tech, idx) => (
                <Text key={idx} style={styles.skill}>{tech}</Text>
              ))}
            </View>
            {project.links.map((link, idx) => (
              <Link key={idx} src={link} style={[styles.contact, styles.link]}>
                View Project
              </Link>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ResumePDF;