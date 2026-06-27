import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { getTemplate } from "../../templates";

// Helper function to safely render text
const SafeText = ({ children, style, ...props }) => {
  if (children === null || children === undefined || children === "")
    return null;
  const content = String(children).trim();
  if (!content) return null;
  return (
    <Text style={style} {...props}>
      {children}
    </Text>
  );
};

// Helper function to calculate duration for PDF
const calculateDuration = (startDate, endDate, isCurrent = false) => {
  if (!startDate) return '';
  const [startYear, startMonth] = startDate.split('-').map(Number);
  let endYear, endMonth;
  if (isCurrent || !endDate) {
    const now = new Date();
    endYear = now.getFullYear();
    endMonth = now.getMonth() + 1;
  } else {
    [endYear, endMonth] = endDate.split('-').map(Number);
  }
  if (!startYear || !startMonth || !endYear || !endMonth) return '';
  let totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
  if (totalMonths === 0) return '1 month';
  if (totalMonths < 0) return '';
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years === 0) {
    return `${months} ${months === 1 ? 'month' : 'months'}`;
  }
  if (months === 0) {
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  }
  return `${years} ${years === 1 ? 'year' : 'years'} ${months} ${months === 1 ? 'month' : 'months'}`;
};

// Helper to format month-year
const formatMonthYear = (dateString, uppercase = false) => {
  if (!dateString) return '';
  const [year, month] = dateString.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthIndex = parseInt(month, 10) - 1;
  if (monthIndex < 0 || monthIndex > 11 || !year) return dateString;
  let formatted = `${monthNames[monthIndex]} ${year}`;
  return uppercase ? formatted.toUpperCase() : formatted;
};

// Helper to get section title with proper casing
const getSectionTitle = (title, template) => {
  const casing = template.layout?.sectionTitleCase || 'title';
  switch (casing) {
    case 'uppercase':
      return title.toUpperCase();
    case 'lowercase':
      return title.toLowerCase();
    default:
      return title;
  }
};

// Helper to get bullet character
const getBullet = (template) => {
  return template.layout?.bulletCharacter || '•';
};

// Helper to check if a layout option is enabled
const isLayoutOption = (template, option, defaultValue = false) => {
  return template.layout?.[option] !== undefined ? template.layout[option] : defaultValue;
};

export default function ResumePDF({ data, templateId = "professional-red" }) {
  const { state } = data;
  const template = getTemplate(templateId);

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

  // Get layout options
  const showSummaryTitle = isLayoutOption(template, 'showSummaryTitle', true);
  const skillsFormat = template.layout?.skillsFormat || 'tags';
  const educationDateUppercase = isLayoutOption(template, 'educationDateUppercase', false);
  const projectUrlInline = isLayoutOption(template, 'projectUrlInline', false);
  const bulletChar = getBullet(template);
  const showDurationInExp = isLayoutOption(template, 'showDurationInExperience', true);
  const companyTitleFormat = template.layout?.companyTitleFormat || 'title-company';
  const experienceDateFormat = template.layout?.experienceDateFormat || 'mixed';

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
      fontSize: template.fonts.sizes.name,
      fontFamily: template.fonts.header,
      fontWeight: "bold",
      color: template.colors.primary,
      marginBottom: 2,
      textAlign: "left",
      lineHeight: 1.2,
    },

    headline: {
      fontSize: template.fonts.sizes.headline,
      color: template.colors.lightText,
      marginTop: 2,
      marginBottom: 12,
      textAlign: "left",
      lineHeight: 1.3,
    },

    contactInfo: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
      fontSize: template.fonts.sizes.contactInfo,
      color: template.colors.text,
      marginTop: 8,
    },

    contactLink: {
      color: template.colors.secondary,
      textDecoration: "none",
    },

    contactSeparator: {
      color: template.colors.text,
      marginHorizontal: 4,
    },

    section: {
      marginBottom: template.spacing.sectionMargin,
    },

    sectionTitle: {
      fontSize: template.fonts.sizes.sectionTitle,
      fontFamily: template.fonts.header,
      fontWeight: "bold",
      color: template.colors.primary,
      marginBottom: 10,
      paddingBottom: 4,
      borderBottom:
        template.layout.sectionBorderWidth > 0
          ? `${template.layout.sectionBorderWidth} solid ${template.colors.primary}`
          : "none",
      letterSpacing: 0.5,
    },

    item: {
      marginBottom: template.spacing.itemMargin,
    },

    itemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 4,
    },

    itemTitle: {
      fontSize: template.fonts.sizes.itemTitle,
      fontFamily: template.fonts.header,
      fontWeight: "bold",
      color: template.colors.text,
    },

    itemSubtitle: {
      fontSize: template.fonts.sizes.body,
      color: template.colors.lightText,
      marginBottom: 6,
    },

    itemDate: {
      fontSize: 10,
      color: template.colors.lightText,
      fontWeight: 600,
      marginBottom: 2,
    },

    description: {
      fontSize: template.fonts.sizes.body,
      color: template.colors.text,
      lineHeight: template.spacing.lineHeight,
    },

    summaryText: {
      fontSize: template.fonts.sizes.headline,
      color: template.colors.text,
      lineHeight: template.spacing.lineHeight,
      marginBottom: template.spacing.sectionMargin,
    },

    bulletPoint: {
      fontSize: template.fonts.sizes.body,
      color: template.colors.text,
      marginLeft: 0,
      marginBottom: 4,
      lineHeight: template.spacing.lineHeight,
    },

    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },

    skill: {
      backgroundColor: template.colors.sectionBg,
      padding: "4 10",
      marginBottom: 6,
      color: template.colors.text,
      borderLeft:
        (template.layout.skillBorderWidth || 0) > 0
          ? `${template.layout.skillBorderWidth} solid ${template.colors.primary}`
          : "none",
    },

    skillCategory: {
      fontSize: template.fonts.sizes.body,
      color: template.colors.text,
      lineHeight: template.spacing.lineHeight,
      marginBottom: 4,
    },

    skillCategoryName: {
      fontWeight: "bold",
    },

    twoColumn: {
      flexDirection: "row",
      gap: 20,
    },

    column: {
      flex: 1,
    },
  });

  // ==================== RENDER FUNCTIONS ====================

  const renderBasics = () => {
    const email = state.basics?.email || "";
    const phone = state.basics?.phone || "";
    const location = state.basics?.location || "";
    const website = state.basics?.website || "";
    const linkedin = state.profiles?.find(p => p.network?.toLowerCase().includes('linkedin') || p.url?.toLowerCase().includes('linkedin'));
    const github = state.profiles?.find(p => p.network?.toLowerCase().includes('github') || p.url?.toLowerCase().includes('github'));

    const contactItems = [];
    if (phone.trim()) contactItems.push({ type: 'text', value: phone });
    if (email.trim()) contactItems.push({ type: 'text', value: email });
    if (linkedin?.username || linkedin?.url) {
      contactItems.push({ type: 'link', label: 'LinkedIn', value: linkedin.username || linkedin.url });
    }
    if (website.trim()) {
      contactItems.push({ type: 'link', label: 'Portfolio', value: website });
    }
    if (github?.username || github?.url) {
      contactItems.push({ type: 'link', label: 'GitHub', value: github.username || github.url });
    }
    if (location.trim() && contactItems.length === 0) {
      contactItems.push({ type: 'text', value: location });
    }

    return (
      <View style={styles.header}>
        <SafeText style={styles.name}>
          {state.basics?.fullName || "Your Name"}
        </SafeText>
        {state.basics?.headline && (
          <SafeText style={styles.headline}>{state.basics.headline}</SafeText>
        )}
        {contactItems.length > 0 && (
          <View style={styles.contactInfo}>
            {contactItems.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row' }}>
                {index > 0 && (
                  <Text style={styles.contactSeparator}> | </Text>
                )}
                {item.type === 'link' ? (
                  <Text style={styles.contactLink}>{item.label} - {item.value}</Text>
                ) : (
                  <Text style={{ color: template.colors.text }}>{item.value}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderSummary = () => {
    if (!state.summary?.content) return null;
    const cleanContent = state.summary.content.replace(/<[^>]*>/g, "").trim();
    if (!cleanContent) return null;

    return (
      <View style={styles.section}>
        {showSummaryTitle && (
          <Text style={styles.sectionTitle}>{getSectionTitle("Professional Summary", template)}</Text>
        )}
        <SafeText style={styles.summaryText}>{cleanContent}</SafeText>
      </View>
    );
  };

  const renderSkills = () => {
    const hasSkills = state.skills?.technical?.length || state.skills?.soft?.length || state.skills?.length;
    if (!hasSkills) return null;

    // CATEGORIZED FORMAT
    if (skillsFormat === 'categorized') {
      const categorized = {};
      let allSkills = [];

      if (state.skills?.technical || state.skills?.soft) {
        allSkills = [
          ...(state.skills.technical || []).map(s => ({ ...s, _type: 'technical' })),
          ...(state.skills.soft || []).map(s => ({ ...s, _type: 'soft' })),
        ];
      } else if (Array.isArray(state.skills)) {
        allSkills = state.skills;
      }

      allSkills.forEach(skill => {
        const skillName = typeof skill === "string" ? skill : skill?.name;
        const category = (typeof skill === "object" && skill?.category) ? skill.category : 
          (typeof skill === "object" && skill?._type) ? skill._type.charAt(0).toUpperCase() + skill._type.slice(1) : 'Other';
        if (skillName) {
          if (!categorized[category]) {
            categorized[category] = [];
          }
          categorized[category].push(skillName);
        }
      });

      const categories = Object.keys(categorized);
      if (categories.length === 0) return null;

      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{getSectionTitle("Technical Skills", template)}</Text>
          {categories.map((category, index) => (
            <View key={index} style={styles.skillCategory}>
              <Text><Text style={styles.skillCategoryName}>{category}: </Text>{categorized[category].join(', ')}</Text>
            </View>
          ))}
        </View>
      );
    }

    // TAGS FORMAT
    let allSkills = [];
    if (state.skills?.technical || state.skills?.soft) {
      allSkills = [...(state.skills.technical || []), ...(state.skills.soft || [])];
    } else if (Array.isArray(state.skills)) {
      allSkills = state.skills;
    }

    if (allSkills.length === 0) return null;
    const skillLevels = ["Beginner", "Novice", "Intermediate", "Advanced", "Expert"];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{getSectionTitle("Skills", template)}</Text>
        <View style={styles.skillsContainer}>
          {allSkills.map((skill, index) => {
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

  const renderExperience = () => {
    if (!state.experience?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{getSectionTitle("Professional Experience", template)}</Text>
        {state.experience.map((exp, index) => {
          const duration = showDurationInExp ? calculateDuration(exp.startDate, exp.endDate, exp.current) : '';
          let startDate = formatMonthYear(exp.startDate);
          let endDate = exp.current ? 'PRESENT' : formatMonthYear(exp.endDate);

          if (experienceDateFormat === 'uppercase') {
            startDate = startDate.toUpperCase();
            endDate = endDate.toUpperCase();
          } else if (experienceDateFormat === 'lowercase') {
            startDate = startDate.toLowerCase();
            endDate = endDate.toLowerCase();
          }

          const dateRange = `${startDate} - ${endDate}${duration ? ` (${duration})` : ''}`;

          return (
            <View key={index} style={styles.item}>
              <SafeText style={styles.itemDate}>{dateRange}</SafeText>
              {companyTitleFormat === 'company-location-title' ? (
                <SafeText style={styles.itemSubtitle}>
                  {exp.company || "Company"}
                  {exp.location && exp.location.trim() ? `, ${exp.location}` : ""}
                  {exp.position ? ` - ${exp.position}` : ""}
                </SafeText>
              ) : (
                <>
                  <SafeText style={styles.itemTitle}>
                    {exp.position || "Position"}
                  </SafeText>
                  <SafeText style={styles.itemSubtitle}>
                    {exp.company || "Company"}
                    {exp.location && exp.location.trim() ? ` • ${exp.location}` : ""}
                  </SafeText>
                </>
              )}
              {exp.description && (
                <SafeText style={styles.description}>{exp.description}</SafeText>
              )}
              {exp.achievements?.map((achievement, idx) =>
                achievement && achievement.trim() ? (
                  <SafeText key={idx} style={styles.bulletPoint}>
                    {bulletChar} {achievement}
                  </SafeText>
                ) : null
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const renderEducation = () => {
    if (!state.education?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{getSectionTitle("Education", template)}</Text>
        {state.education.map((edu, index) => {
          const startDate = formatMonthYear(edu.startDate, educationDateUppercase);
          const endDate = formatMonthYear(edu.endDate, educationDateUppercase);
          const dateRange = `${startDate} - ${endDate}`;

          return (
            <View key={index} style={styles.item}>
              <SafeText style={styles.itemDate}>{dateRange}</SafeText>
              <SafeText style={styles.itemSubtitle}>
                {edu.institution || "Institution"}
                {edu.location && edu.location.trim() ? `, ${edu.location}` : ""}
              </SafeText>
              <SafeText style={styles.itemTitle}>
                {edu.degree || "Degree"}
                {edu.fieldOfStudy ? ` - ${edu.fieldOfStudy}` : ""}
              </SafeText>
              {edu.description && (
                <SafeText style={styles.description}>{edu.description}</SafeText>
              )}
              {edu.gpa && (
                <SafeText style={styles.description}>GPA: {edu.gpa}</SafeText>
              )}
              {edu.honors && (
                <SafeText style={styles.description}>Honors: {edu.honors}</SafeText>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const renderProjects = () => {
    if (!state.projects?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{getSectionTitle("Key projects", template)}</Text>
        {state.projects.map((project, index) => {
          if (projectUrlInline) {
            return (
              <View key={index} style={styles.bulletPoint}>
                <SafeText>
                  {bulletChar} {project.name || "Project Name"}
                  {project.url && (
                    <Text style={styles.contactLink}> - {project.url}</Text>
                  )}
                </SafeText>
                {project.description && (
                  <SafeText style={styles.description}>
                    {project.description}
                    {project.technologies ? ` (${project.technologies})` : ""}
                  </SafeText>
                )}
                {project.highlights?.map((highlight, idx) =>
                  highlight && highlight.trim() ? (
                    <SafeText key={idx} style={styles.bulletPoint}>
                      {bulletChar} {highlight}
                    </SafeText>
                  ) : null
                )}
              </View>
            );
          }

          const duration = calculateDuration(project.startDate, project.endDate, project.current);
          const hasDateRange = project.startDate && (project.endDate || project.current);

          return (
            <View key={index} style={styles.item}>
              <View style={styles.itemHeader}>
                <SafeText style={styles.itemTitle}>
                  {project.name || "Project Name"}
                </SafeText>
                {hasDateRange && (
                  <SafeText style={styles.itemDate}>
                    {formatMonthYear(project.startDate)} - {project.current ? "Present" : formatMonthYear(project.endDate)}
                    {duration && ` (${duration})`}
                  </SafeText>
                )}
              </View>
              {project.url && (
                <SafeText style={styles.itemSubtitle}>{project.url}</SafeText>
              )}
              {project.technologies && (
                <SafeText style={styles.description}>
                  Technologies: {project.technologies}
                </SafeText>
              )}
              {project.description && (
                <SafeText style={styles.description}>
                  {project.description}
                </SafeText>
              )}
              {project.highlights?.map((highlight, idx) =>
                highlight && highlight.trim() ? (
                  <SafeText key={idx} style={styles.bulletPoint}>
                    {bulletChar} {highlight}
                  </SafeText>
                ) : null
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const renderAdditionalInfo = () => {
    if (!state.additionalInfo?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{getSectionTitle("Additional Information", template)}</Text>
        {state.additionalInfo.map((item, index) => {
          const text = typeof item === 'string' ? item : item?.text;
          if (!text?.trim()) return null;
          return (
            <SafeText key={index} style={styles.bulletPoint}>
              {bulletChar} {text}
            </SafeText>
          );
        })}
      </View>
    );
  };

  const renderLanguages = () => {
    if (!state.languages?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{getSectionTitle("Languages", template)}</Text>
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
        <Text style={styles.sectionTitle}>{getSectionTitle("Awards", template)}</Text>
        {state.awards.map((award, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <SafeText style={styles.itemTitle}>
                {award.title || "Award Title"}
              </SafeText>
              <SafeText style={styles.itemDate}>
                {formatMonthYear(award.date) || "Date"}
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

  const renderCertifications = () => {
    if (!state.certifications?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{getSectionTitle("Certifications", template)}</Text>
        {state.certifications.map((cert, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <SafeText style={styles.itemTitle}>
                {cert.name || "Certification Name"}
              </SafeText>
              <SafeText style={styles.itemDate}>
                {formatMonthYear(cert.date) || "Date"}
              </SafeText>
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
        <Text style={styles.sectionTitle}>{getSectionTitle("Publications", template)}</Text>
        {state.publications.map((pub, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <SafeText style={styles.itemTitle}>
                {pub.title || "Publication Title"}
              </SafeText>
              <SafeText style={styles.itemDate}>
                {formatMonthYear(pub.date) || "Date"}
              </SafeText>
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
        <Text style={styles.sectionTitle}>{getSectionTitle("Volunteering", template)}</Text>
        {state.volunteering.map((vol, index) => {
          const duration = calculateDuration(vol.startDate, vol.endDate, vol.current);
          return (
            <View key={index} style={styles.item}>
              <View style={styles.itemHeader}>
                <SafeText style={styles.itemTitle}>{vol.role || "Role"}</SafeText>
                <SafeText style={styles.itemDate}>
                  {formatMonthYear(vol.startDate) || "Start"} - {vol.current ? "Present" : formatMonthYear(vol.endDate) || "End"}
                  {duration && ` (${duration})`}
                </SafeText>
              </View>
              <SafeText style={styles.itemSubtitle}>
                {vol.organization || "Organization"}
              </SafeText>
              {vol.description && (
                <SafeText style={styles.description}>{vol.description}</SafeText>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const renderInterests = () => {
    if (!state.interests?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{getSectionTitle("Interests", template)}</Text>
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

  const renderProfiles = () => {
    if (!state.profiles?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{getSectionTitle("Profiles", template)}</Text>
        {state.profiles.map((profile, index) => (
          <View key={index} style={styles.item}>
            <SafeText style={styles.itemTitle}>
              {profile.network || "Network"}
            </SafeText>
            {profile.url ? (
              <Text style={styles.contactLink} src={profile.url}>
                {profile.username || profile.url}
              </Text>
            ) : (
              <SafeText style={styles.description}>
                {profile.username || "Profile"}
              </SafeText>
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderReferences = () => {
    const hasRefItems = state.references?.items?.length > 0;
    const availableOnRequest = state.references?.availableUponRequest;
    if (!hasRefItems && !availableOnRequest) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{getSectionTitle("References", template)}</Text>
        {hasRefItems ? (
          state.references.items.map((ref, index) => (
            <View key={index} style={styles.item}>
              {ref.email ? (
                <Text style={styles.contactLink} src={`mailto:${ref.email}`}>
                  {ref.name || "Reference Name"}
                </Text>
              ) : (
                <SafeText style={styles.itemTitle}>
                  {ref.name || "Reference Name"}
                </SafeText>
              )}
              <SafeText style={styles.itemSubtitle}>
                {(ref.title && ref.title.trim()) || "Title"} at{" "}
                {(ref.company && ref.company.trim()) || "Company"}
              </SafeText>
              {ref.relationship && (
                <SafeText style={styles.description}>
                  Relationship: {ref.relationship}
                </SafeText>
              )}
              {ref.email && (
                <SafeText style={styles.description}>{ref.email}</SafeText>
              )}
              {ref.phone && (
                <SafeText style={styles.description}>{ref.phone}</SafeText>
              )}
            </View>
          ))
        ) : (
          <SafeText style={styles.description}>References available upon request.</SafeText>
        )}
      </View>
    );
  };

  // Helper to render sections in order
  const renderSection = (sectionId) => {
    const sectionRenderers = {
      basics: renderBasics,
      summary: renderSummary,
      skills: renderSkills,
      experience: renderExperience,
      education: renderEducation,
      projects: renderProjects,
      additionalInfo: renderAdditionalInfo,
      languages: renderLanguages,
      awards: renderAwards,
      certifications: renderCertifications,
      publications: renderPublications,
      volunteering: renderVolunteering,
      interests: renderInterests,
      profiles: renderProfiles,
      references: renderReferences,
    };

    const renderer = sectionRenderers[sectionId];
    if (!renderer) return null;

    // Check if section should be included
    if (sectionId !== 'basics' && state.includedSections?.[sectionId] === false) {
      return null;
    }

    return renderer();
  };

  // Two-column layout
  if (template.layout.type === "two-column") {
    const leftSections = ['experience', 'education', 'projects', 'volunteering', 'publications'];
    const rightSections = ['skills', 'languages', 'awards', 'certifications', 'interests', 'profiles', 'references', 'additionalInfo'];

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {renderSection('basics')}
          {renderSection('summary')}
          <View style={styles.twoColumn}>
            <View style={styles.column}>
              {leftSections.map(s => renderSection(s))}
            </View>
            <View style={styles.column}>
              {rightSections.map(s => renderSection(s))}
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  // Single column layout - render in order from sectionsOrder
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {state.sectionsOrder?.map(sectionId => renderSection(sectionId))}
      </Page>
    </Document>
  );
}
