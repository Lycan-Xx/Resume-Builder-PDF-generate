import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { getTemplate } from "../../templates";

// Helper function to safely render text
const SafeText = ({ children, style, ...props }) => {
  // Check if children is null, undefined, or empty string
  if (children === null || children === undefined || children === "")
    return null;

  // Convert to string and trim to check for whitespace-only content
  const content = String(children).trim();
  if (!content) return null;

  return (
    <Text style={style} {...props}>
      {children}
    </Text>
  );
};

export default function ResumePDF({ data, templateId = "professional-red" }) {
  const { state } = data;
  const template = getTemplate(templateId);

  // Validate that state exists
  if (!state) {
    return (
      <Document>
        <Page size="A4" style={{ padding: 40 }}>
          <View>
            <Text>No Data Available</Text>
          </View>
        </Page>
      </Document>
    );
  }

  // Generate dynamic styles from template
  const styles = StyleSheet.create({
    page: {
      fontFamily: template.fonts.body,
      fontSize: template.fonts.sizes.body,
      lineHeight: template.spacing.lineHeight,
      padding: `${template.spacing.page.top} ${template.spacing.page.right} ${template.spacing.page.bottom} ${template.spacing.page.left}`,
      backgroundColor: template.colors.background,
    },

    header: {
      marginBottom: template.spacing.headerMargin,
      borderBottom:
        template.layout.headerBorderWidth > 0
          ? `${template.layout.headerBorderWidth} solid ${template.colors.border}`
          : "none",
      paddingBottom: template.layout.headerBorderWidth > 0 ? 20 : 0,
    },

    name: {
      fontSize: 18,
      fontFamily: template.fonts.header,
      fontWeight: "bold",
      color: template.colors.primary,
      marginBottom: 8,
      textAlign: "left",
    },

    headline: {
      fontSize: 12,
      color: template.colors.lightText,
      marginBottom: 15,
      textAlign: "left",
    },

    contactInfo: {
      flexDirection: "row",
      justifyContent: "flex-start",
      flexWrap: "wrap",
      gap: 15,
      fontSize: template.fonts.sizes.contactInfo,
      color: template.colors.text,
    },

    contactLink: {
      color: template.colors.secondary,
      textDecoration: "none",
    },

    section: {
      marginBottom: template.spacing.sectionMargin,
    },

    sectionTitle: {
      fontSize: template.fonts.sizes.sectionTitle,
      fontFamily: template.fonts.header,
      fontWeight: "bold",
      color: template.colors.primary,
      marginBottom: 18,
      paddingBottom: 8,
      borderBottom:
        template.layout.sectionBorderWidth > 0
          ? `${template.layout.sectionBorderWidth} solid ${template.colors.primary}`
          : "none",
      textTransform: "capitalize",
      letterSpacing: 0.5,
    },

    item: {
      marginBottom: template.spacing.itemMargin,
    },

    itemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 8,
    },

    itemTitle: {
      fontSize: 12,
      fontFamily: template.fonts.header,
      fontWeight: "bold",
      color: template.colors.text,
    },

    itemSubtitle: {
      fontSize: template.fonts.sizes.body,
      color: template.colors.lightText,
      marginBottom: 10,
    },

    itemDate: {
      fontSize: 11,
      color: template.colors.lightText,
      fontWeight: 600,
    },

    description: {
      fontSize: template.fonts.sizes.body,
      color: template.colors.text,
      lineHeight: template.spacing.lineHeight,
    },

    bulletPoint: {
      fontSize: template.fonts.sizes.body,
      color: template.colors.text,
      marginLeft: 10,
      marginBottom: 8,
      lineHeight: template.spacing.lineHeight,
    },

    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },

    skill: {
      backgroundColor: template.colors.sectionBg,
      padding: "6 12",
      marginBottom: 8,
      color: template.colors.text,
      borderLeft:
        (template.layout.skillBorderWidth || 0) > 0
          ? `${template.layout.skillBorderWidth} solid ${template.colors.primary}`
          : "none",
    },

    twoColumn: {
      flexDirection: "row",
      gap: 20,
    },

    column: {
      flex: 1,
    },
  });

  const renderBasics = () => {
    const email = state.basics?.email || "";
    const phone = state.basics?.phone || "";
    const location = state.basics?.location || "";
    const website = state.basics?.website || "";

    return (
      <View style={styles.header}>
        <SafeText style={styles.name}>
          {state.basics?.fullName || "Your Name"}
        </SafeText>
        {state.basics?.headline && (
          <SafeText style={styles.headline}>{state.basics.headline}</SafeText>
        )}
        <View style={styles.contactInfo}>
          {email.trim() && <Text style={styles.contactLink}>{email}</Text>}
          {phone.trim() && (
            <Text style={{ color: template.colors.text }}>{phone}</Text>
          )}
          {location.trim() && (
            <Text style={{ color: template.colors.text }}>{location}</Text>
          )}
          {website.trim() && <Text style={styles.contactLink}>{website}</Text>}
        </View>
      </View>
    );
  };

  const renderSummary = () => {
    if (!state.summary?.content) return null;

    const cleanContent = state.summary.content.replace(/<[^>]*>/g, "").trim();
    if (!cleanContent) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <SafeText style={styles.description}>{cleanContent}</SafeText>
      </View>
    );
  };

  const renderExperience = () => {
    if (!state.experience?.length) return null;

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
                {exp.startDate || "Start"} -{" "}
                {exp.current ? "Present" : exp.endDate || "End"}
              </SafeText>
            </View>
            <SafeText style={styles.itemSubtitle}>
              {exp.company || "Company"}
              {exp.location && exp.location.trim() ? ` • ${exp.location}` : ""}
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
    );
  };

  const renderEducation = () => {
    if (!state.education?.length) return null;

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
              {edu.institution || "Institution"}
              {edu.location && edu.location.trim() ? ` • ${edu.location}` : ""}
            </SafeText>
            {edu.fieldOfStudy && (
              <SafeText style={styles.description}>
                Field of Study: {edu.fieldOfStudy}
              </SafeText>
            )}
            {edu.gpa && (
              <SafeText style={styles.description}>GPA: {edu.gpa}</SafeText>
            )}
            {edu.honors && (
              <SafeText style={styles.description}>
                Honors: {edu.honors}
              </SafeText>
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderSkills = () => {
    // Handle both old structure (array) and new structure (object with technical/soft)
    const hasSkills =
      state.skills?.technical?.length ||
      state.skills?.soft?.length ||
      state.skills?.length;
    if (!hasSkills) return null;

    // Combine technical and soft skills, or use the array directly
    let allSkills = [];
    if (state.skills?.technical || state.skills?.soft) {
      // New structure: object with technical and soft arrays
      allSkills = [
        ...(state.skills.technical || []),
        ...(state.skills.soft || []),
      ];
    } else if (Array.isArray(state.skills)) {
      // Old structure: array of objects with name property
      allSkills = state.skills;
    }

    if (allSkills.length === 0) return null;

    const skillLevels = ["Beginner", "Novice", "Intermediate", "Advanced", "Expert"];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {allSkills.map((skill, index) => {
            // Handle both string and object formats
            const skillName = typeof skill === "string" ? skill : skill?.name;
            const skillLevel = typeof skill === "object" && skill?.level ? skillLevels[skill.level - 1] : null;
            return skillName ? (
              <View key={index} style={styles.skill}>
                <SafeText style={{ fontSize: template.fonts.sizes.small, fontWeight: "bold" }}>
                  {skillName}
                </SafeText>
                {skillLevel && (
                  <SafeText style={{ fontSize: template.fonts.sizes.small - 1, color: template.colors.lightText }}>
                    {skillLevel}
                  </SafeText>
                )}
              </View>
            ) : null;
          })}
        </View>
      </View>
    );
  };

  const renderLanguages = () => {
    if (!state.languages?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Languages</Text>
        {state.languages.map((lang, index) =>
          lang?.name ? (
            <View key={index} style={styles.item}>
              <SafeText style={styles.itemTitle}>
                {lang.name}
                {lang.proficiency && lang.proficiency.trim()
                  ? ` - ${lang.proficiency}`
                  : ""}
              </SafeText>
            </View>
          ) : null
        )}
      </View>
    );
  };

  const renderAwards = () => {
    if (!state.awards?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Awards</Text>
        {state.awards.map((award, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <SafeText style={styles.itemTitle}>
                {award.title || "Award Title"}
              </SafeText>
              <SafeText style={styles.itemDate}>
                {award.date || "Date"}
              </SafeText>
            </View>
            <SafeText style={styles.itemSubtitle}>
              {award.issuer || "Issuer"}
            </SafeText>
            {award.description && (
              <SafeText style={styles.description}>
                {award.description}
              </SafeText>
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderProfiles = () => {
    if (!state.profiles?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profiles</Text>
        {state.profiles.map((profile, index) => (
          <View key={index} style={styles.item}>
            <SafeText style={styles.itemTitle}>
              {profile.network || "Network"}
            </SafeText>
            <SafeText style={styles.description}>
              {profile.username || profile.url || "Profile"}
            </SafeText>
          </View>
        ))}
      </View>
    );
  };

  const renderProjects = () => {
    if (!state.projects?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {state.projects.map((project, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <SafeText style={styles.itemTitle}>
                {project.name || "Project Name"}
              </SafeText>
              <SafeText style={styles.itemDate}>
                {project.startDate || "Start"} - {project.endDate || "End"}
              </SafeText>
            </View>
            {project.url && (
              <SafeText style={styles.itemSubtitle}>{project.url}</SafeText>
            )}
            {project.description && (
              <SafeText style={styles.description}>
                {project.description}
              </SafeText>
            )}
            {project.highlights?.map((highlight, idx) =>
              highlight && highlight.trim() ? (
                <SafeText key={idx} style={styles.bulletPoint}>
                  • {highlight}
                </SafeText>
              ) : null
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderInterests = () => {
    if (!state.interests?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interests</Text>
        {state.interests.map((interest, index) =>
          interest?.name ? (
            <View key={index} style={styles.item}>
              <SafeText style={styles.itemTitle}>
                {interest.name}
              </SafeText>
              {interest.description && interest.description.trim() && (
                <SafeText style={styles.description}>
                  {interest.description}
                </SafeText>
              )}
            </View>
          ) : null
        )}
      </View>
    );
  };

  const renderCertifications = () => {
    if (!state.certifications?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Certifications</Text>
        {state.certifications.map((cert, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <SafeText style={styles.itemTitle}>
                {cert.name || "Certification Name"}
              </SafeText>
              <SafeText style={styles.itemDate}>{cert.date || "Date"}</SafeText>
            </View>
            <SafeText style={styles.itemSubtitle}>
              {cert.issuer || "Issuer"}
            </SafeText>
            {cert.description && (
              <SafeText style={styles.description}>{cert.description}</SafeText>
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderPublications = () => {
    if (!state.publications?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Publications</Text>
        {state.publications.map((pub, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <SafeText style={styles.itemTitle}>
                {pub.title || "Publication Title"}
              </SafeText>
              <SafeText style={styles.itemDate}>{pub.date || "Date"}</SafeText>
            </View>
            <SafeText style={styles.itemSubtitle}>
              {pub.publisher || "Publisher"}
            </SafeText>
            {pub.url && (
              <SafeText style={styles.description}>{pub.url}</SafeText>
            )}
            {pub.description && (
              <SafeText style={styles.description}>{pub.description}</SafeText>
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderVolunteering = () => {
    if (!state.volunteering?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Volunteering</Text>
        {state.volunteering.map((vol, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <SafeText style={styles.itemTitle}>{vol.role || "Role"}</SafeText>
              <SafeText style={styles.itemDate}>
                {vol.startDate || "Start"} - {vol.endDate || "End"}
              </SafeText>
            </View>
            <SafeText style={styles.itemSubtitle}>
              {vol.organization || "Organization"}
            </SafeText>
            {vol.description && (
              <SafeText style={styles.description}>{vol.description}</SafeText>
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderReferences = () => {
    if (
      !state.references?.items?.length &&
      !state.references?.availableUponRequest
    )
      return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>References</Text>
        {state.references.availableUponRequest ? (
          <SafeText style={styles.description}>Available upon request</SafeText>
        ) : (
          state.references.items.map((ref, index) => (
            <View key={index} style={styles.item}>
              <SafeText style={styles.itemTitle}>
                {ref.name || "Reference Name"}
              </SafeText>
              <SafeText style={styles.itemSubtitle}>
                {(ref.title && ref.title.trim()) || "Title"} at{" "}
                {(ref.company && ref.company.trim()) || "Company"}
              </SafeText>
              {ref.email && (
                <SafeText style={styles.description}>{ref.email}</SafeText>
              )}
              {ref.phone && (
                <SafeText style={styles.description}>{ref.phone}</SafeText>
              )}
            </View>
          ))
        )}
      </View>
    );
  };

  // Render based on template layout type
  if (template.layout.type === "two-column") {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {renderBasics()}
          {renderSummary()}
          <View style={styles.twoColumn}>
            <View style={styles.column}>
              {renderExperience()}
              {renderEducation()}
              {renderProjects()}
              {renderVolunteering()}
              {renderPublications()}
            </View>
            <View style={styles.column}>
              {renderSkills()}
              {renderLanguages()}
              {renderAwards()}
              {renderCertifications()}
              {renderInterests()}
              {renderProfiles()}
              {renderReferences()}
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  // Single column layout (default)
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {renderBasics()}
        {renderSummary()}
        {renderExperience()}
        {renderEducation()}
        {renderSkills()}
        {renderProjects()}
        {renderLanguages()}
        {renderAwards()}
        {renderCertifications()}
        {renderPublications()}
        {renderVolunteering()}
        {renderInterests()}
        {renderProfiles()}
        {renderReferences()}
      </Page>
    </Document>
  );
}
