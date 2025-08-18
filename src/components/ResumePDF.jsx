import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer"

// Register fonts
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2",
      fontWeight: "bold",
    },
  ],
})

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.4,
    padding: 40,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 5,
  },
  headline: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 15,
    fontSize: 9,
    color: "#4b5563",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 10,
    paddingBottom: 3,
    borderBottom: "1 solid #e5e7eb",
  },
  item: {
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1f2937",
  },
  itemSubtitle: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 3,
  },
  itemDate: {
    fontSize: 9,
    color: "#9ca3af",
  },
  description: {
    fontSize: 9,
    color: "#4b5563",
    lineHeight: 1.3,
  },
  bulletPoint: {
    fontSize: 9,
    color: "#4b5563",
    marginLeft: 10,
    marginBottom: 2,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skill: {
    fontSize: 9,
    backgroundColor: "#f3f4f6",
    padding: "3 8",
    borderRadius: 3,
    color: "#374151",
  },
  twoColumn: {
    flexDirection: "row",
    gap: 20,
  },
  column: {
    flex: 1,
  },
})

const ResumePDF = ({ data, template = "modern" }) => {
  const { state } = data

  const renderBasics = () => (
    <View style={styles.header}>
      <Text style={styles.name}>{state.basics.fullName}</Text>
      {state.basics.headline && <Text style={styles.headline}>{state.basics.headline}</Text>}
      <View style={styles.contactInfo}>
        {state.basics.email && <Text>{state.basics.email}</Text>}
        {state.basics.phone && <Text>{state.basics.phone}</Text>}
        {state.basics.location && <Text>{state.basics.location}</Text>}
        {state.basics.website && <Text>{state.basics.website}</Text>}
      </View>
    </View>
  )

  const renderSummary = () => {
    if (!state.summary.content) return null

    // Strip HTML tags for PDF
    const cleanContent = state.summary.content.replace(/<[^>]*>/g, "")

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.description}>{cleanContent}</Text>
      </View>
    )
  }

  const renderExperience = () => {
    if (!state.experience.length) return null

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {state.experience.map((exp, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{exp.position}</Text>
              <Text style={styles.itemDate}>
                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </Text>
            </View>
            <Text style={styles.itemSubtitle}>
              {exp.company} • {exp.location}
            </Text>
            {exp.description && <Text style={styles.description}>{exp.description}</Text>}
            {exp.achievements &&
              exp.achievements.map(
                (achievement, idx) =>
                  achievement && (
                    <Text key={idx} style={styles.bulletPoint}>
                      • {achievement}
                    </Text>
                  ),
              )}
          </View>
        ))}
      </View>
    )
  }

  const renderEducation = () => {
    if (!state.education.length) return null

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {state.education.map((edu, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{edu.degree}</Text>
              <Text style={styles.itemDate}>
                {edu.startDate} - {edu.endDate}
              </Text>
            </View>
            <Text style={styles.itemSubtitle}>
              {edu.institution} • {edu.location}
            </Text>
            {edu.fieldOfStudy && <Text style={styles.description}>Field of Study: {edu.fieldOfStudy}</Text>}
            {edu.gpa && <Text style={styles.description}>GPA: {edu.gpa}</Text>}
            {edu.honors && <Text style={styles.description}>Honors: {edu.honors}</Text>}
          </View>
        ))}
      </View>
    )
  }

  const renderSkills = () => {
    if (!state.skills.length) return null

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {state.skills.map((skill, index) => (
            <Text key={index} style={styles.skill}>
              {skill.name}
            </Text>
          ))}
        </View>
      </View>
    )
  }

  const renderLanguages = () => {
    if (!state.languages.length) return null

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Languages</Text>
        {state.languages.map((lang, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemTitle}>
              {lang.name} - {lang.proficiency}
            </Text>
          </View>
        ))}
      </View>
    )
  }

  if (template === "modern") {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {renderBasics()}
          {renderSummary()}
          <View style={styles.twoColumn}>
            <View style={styles.column}>
              {renderExperience()}
              {renderEducation()}
            </View>
            <View style={styles.column}>
              {renderSkills()}
              {renderLanguages()}
            </View>
          </View>
        </Page>
      </Document>
    )
  }

  // Classic template (single column)
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {renderBasics()}
        {renderSummary()}
        {renderExperience()}
        {renderEducation()}
        {renderSkills()}
        {renderLanguages()}
      </Page>
    </Document>
  )
}

export default ResumePDF
