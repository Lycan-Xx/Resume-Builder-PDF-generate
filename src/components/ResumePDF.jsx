import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer"

// Use standard PDF fonts instead of web fonts
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
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
    fontFamily: "Helvetica-Bold",
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
    fontFamily: "Helvetica-Bold",
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
    fontFamily: "Helvetica-Bold",
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

// Helper function to safely render text
const SafeText = ({ children, style, ...props }) => {
  if (!children || children === '') return null;
  return <Text style={style} {...props}>{children}</Text>;
}

const ResumePDF = ({ data, template = "modern" }) => {
  const { state } = data

  // Validate that state exists
  if (!state) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.name}>No Data Available</Text>
          </View>
        </Page>
      </Document>
    )
  }

  const renderBasics = () => (
    <View style={styles.header}>
      <SafeText style={styles.name}>
        {state.basics?.fullName || "Your Name"}
      </SafeText>
      {state.basics?.headline && (
        <SafeText style={styles.headline}>
          {state.basics.headline}
        </SafeText>
      )}
      <View style={styles.contactInfo}>
        {state.basics?.email && <SafeText>{state.basics.email}</SafeText>}
        {state.basics?.phone && <SafeText>{state.basics.phone}</SafeText>}
        {state.basics?.location && <SafeText>{state.basics.location}</SafeText>}
        {state.basics?.website && <SafeText>{state.basics.website}</SafeText>}
      </View>
    </View>
  )

  const renderSummary = () => {
    if (!state.summary?.content) return null

    // Strip HTML tags and ensure non-empty content
    const cleanContent = state.summary.content.replace(/<[^>]*>/g, "").trim()
    if (!cleanContent) return null

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <SafeText style={styles.description}>{cleanContent}</SafeText>
      </View>
    )
  }

  const renderExperience = () => {
    if (!state.experience?.length) return null

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {state.experience.map((exp, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <SafeText style={styles.itemTitle}>
                {exp.position || "Position"}
              </SafeText>
              <SafeText style={styles.itemDate}>
                {exp.startDate || "Start"} - {exp.current ? "Present" : (exp.endDate || "End")}
              </SafeText>
            </View>
            <SafeText style={styles.itemSubtitle}>
              {exp.company || "Company"}{exp.location ? ` • ${exp.location}` : ""}
            </SafeText>
            {exp.description && (
              <SafeText style={styles.description}>{exp.description}</SafeText>
            )}
            {exp.achievements?.map((achievement, idx) => 
              achievement && achievement.trim() ? (
                <SafeText key={idx} style={styles.bulletPoint}>
                  • {achievement}
                </SafeText>
              ) : null
            )}
          </View>
        ))}
      </View>
    )
  }

  const renderEducation = () => {
    if (!state.education?.length) return null

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {state.education.map((edu, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <SafeText style={styles.itemTitle}>
                {edu.degree || "Degree"}
              </SafeText>
              <SafeText style={styles.itemDate}>
                {edu.startDate || "Start"} - {edu.endDate || "End"}
              </SafeText>
            </View>
            <SafeText style={styles.itemSubtitle}>
              {edu.institution || "Institution"}{edu.location ? ` • ${edu.location}` : ""}
            </SafeText>
            {edu.fieldOfStudy && (
              <SafeText style={styles.description}>
                Field of Study: {edu.fieldOfStudy}
              </SafeText>
            )}
            {edu.gpa && (
              <SafeText style={styles.description}>
                GPA: {edu.gpa}
              </SafeText>
            )}
            {edu.honors && (
              <SafeText style={styles.description}>
                Honors: {edu.honors}
              </SafeText>
            )}
          </View>
        ))}
      </View>
    )
  }

  const renderSkills = () => {
    if (!state.skills?.length) return null

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {state.skills.map((skill, index) => 
            skill?.name ? (
              <SafeText key={index} style={styles.skill}>
                {skill.name}
              </SafeText>
            ) : null
          )}
        </View>
      </View>
    )
  }

  const renderLanguages = () => {
    if (!state.languages?.length) return null

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Languages</Text>
        {state.languages.map((lang, index) => 
          lang?.name ? (
            <View key={index} style={styles.item}>
              <SafeText style={styles.itemTitle}>
                {lang.name}{lang.proficiency ? ` - ${lang.proficiency}` : ""}
              </SafeText>
            </View>
          ) : null
        )}
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