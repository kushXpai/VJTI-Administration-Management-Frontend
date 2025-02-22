const colors = {
    // Primary Colors
    primary: "#800000", // Maroon red - for primary actions, headers
    primaryDark: "#660000", // Darker maroon for hover states
    primaryLight: "#FFE6E6", // Light maroon/pink for backgrounds, highlights

    // Secondary Colors
    secondary: "#7C3AED", // Royal purple - for accents, secondary elements
    secondaryDark: "#6D28D9", // Deeper purple for hover states
    secondaryLight: "#EDE9FE", // Light purple for backgrounds, highlights

    // Neutrals
    background: "#F9FAFB", // Off-white for main backgrounds
    surfaceLight: "#FFFFFF", // Pure white for cards, elevated surfaces
    surfaceMedium: "#F3F4F6", // Light gray for alternative sections
    surfaceDark: "#E5E7EB", // Medium gray for borders, dividers

    // Text Colors
    textPrimary: "#111827", // Near-black for primary text
    textSecondary: "#4B5563", // Dark gray for secondary text
    textTertiary: "#6B7280", // Medium gray for less important text
    textInverse: "#FFFFFF", // White text for dark backgrounds

    // Semantic Colors
    success: "#10B981", // Green for success messages, completed status
    error: "#EF4444", // Red for errors, important alerts
    warning: "#F59E0B", // Amber for warnings, attention needed
    info: "#3B82F6", // Blue for informational messages

    // Academic Department Colors
    scienceDept: "#0EA5E9", // Sky blue for science departments
    artsDept: "#EC4899", // Pink for arts and humanities
    businessDept: "#F97316", // Orange for business studies
    engineeringDept: "#8B5CF6", // Violet for engineering

    // Status Colors
    active: "#84CC16", // Lime green for active status
    pending: "#F59E0B", // Amber for pending status
    inactive: "#9CA3AF", // Gray for inactive status

    // Accessibility
    focus: "#800000", // Focus ring color (changed to match primary)
    selection: "#FFE6E6", // Text selection color (changed to match primaryLight)
};

const withOpacity = {
    primaryAlpha10: "rgba(128, 0, 0, 0.1)",
    primaryAlpha20: "rgba(128, 0, 0, 0.2)", 
    secondaryAlpha10: "rgba(124, 58, 237, 0.1)", 
    secondaryAlpha20: "rgba(124, 58, 237, 0.2)",
    
    successAlpha10: "rgba(16, 185, 129, 0.1)", 
    successAlpha20: "rgba(16, 185, 129, 0.2)", 
    errorAlpha10: "rgba(239, 68, 68, 0.1)", 
    errorAlpha20: "rgba(239, 68, 68, 0.2)", 
    warningAlpha10: "rgba(245, 158, 11, 0.1)", 
    warningAlpha20: "rgba(245, 158, 11, 0.2)"
};

export default {
    ...colors,
    ...withOpacity
};