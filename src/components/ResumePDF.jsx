import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useResume } from '../context/ResumeContext';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 10,
    color: '#544cd7',
    borderBottom: '1 solid #544cd7',
    paddingBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 5,
  },
  links: {
    fontSize: 10,
    color: '#544cd7',
    marginBottom: 5,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  itemSubtitle: {
    fontSize: 10,
    marginBottom: 2,
  },
  itemDetails: {
    fontSize: 10,
    marginBottom: 5,
  },
  bullet: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 2,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#f3f4f6',
    padding: '3 6',
    borderRadius: 3,
  },
});

const ResumePDF = () => {
  const { state } = useResume();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header / Personal Info */}
        <View style={styles.section}>
          <Text style={styles.header}>{state.personalInfo.name}</Text>
          <Text style={styles.contactInfo}>{state.personalInfo.email} | {state.personalInfo.phone}</Text>
          <Text style={styles.contactInfo}>{state.personalInfo.location}</Text>
          {state.personalInfo.links.linkedin && (
            <Text style={styles.links}>LinkedIn: {state.personalInfo.links.linkedin}</Text>
          )}
          {state.personalInfo.links.github && (
            <Text style={styles.links}>GitHub: {state.personalInfo.links.github}</Text>
          )}
        </View>

        {/* Experience */}
        {state.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Professional Experience</Text>
            {state.experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.itemTitle}>{exp.position} at {exp.company}</Text>
                <Text style={styles.itemSubtitle}>{exp.location} | {exp.startDate} - {exp.endDate}</Text>
                {exp.responsibilities.map((resp, idx) => (
                  <Text key={idx} style={styles.bullet}>• {resp}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {state.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Education</Text>
            {state.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.itemTitle}>{edu.institution}</Text>
                <Text style={styles.itemSubtitle}>{edu.degree} in {edu.major}</Text>
                <Text style={styles.itemDetails}>Graduated: {edu.graduationDate} {edu.gpa && `| GPA: ${edu.gpa}`}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {(state.skills.technical.length > 0 || state.skills.soft.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Skills</Text>
            {state.skills.technical.length > 0 && (
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.itemTitle}>Technical Skills</Text>
                <View style={styles.skillsContainer}>
                  {state.skills.technical.map((skill, index) => (
                    <Text key={index} style={styles.skill}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}
            {state.skills.soft.length > 0 && (
              <View>
                <Text style={styles.itemTitle}>Soft Skills</Text>
                <View style={styles.skillsContainer}>
                  {state.skills.soft.map((skill, index) => (
                    <Text key={index} style={styles.skill}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Projects */}
        {state.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Projects</Text>
            {state.projects.map((project, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.itemTitle}>{project.name}</Text>
                <Text style={styles.itemSubtitle}>Technologies: {project.technologies}</Text>
                <Text style={styles.itemDetails}>{project.description}</Text>
                {project.link && <Text style={styles.links}>Link: {project.link}</Text>}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;