const colors = {
    // Primary Colors
    primary: "#2563EB", // Academic blue - for primary actions, headers
    primaryDark: "#1D4ED8", // Darker blue for hover states
    primaryLight: "#DBEAFE", // Light blue for backgrounds, highlights

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
    focus: "#2563EB", // Focus ring color
    selection: "#BFDBFE", // Text selection color
};

const withOpacity = {
    primaryAlpha10: "rgba(37, 99, 235, 0.1)",
    primaryAlpha20: "rgba(37, 99, 235, 0.2)",
    secondaryAlpha10: "rgba(124, 58, 237, 0.1)",
    secondaryAlpha20: "rgba(124, 58, 237, 0.2)",
};

export default {
    ...colors,
    ...withOpacity
};