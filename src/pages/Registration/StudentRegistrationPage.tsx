import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import colors from '../../styles/colors';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4444';

interface FormData {
    // Personal Details
    name: string;
    dateOfBirth: string;
    gender: string;
    mobileNumber: string;

    // Parent Details
    fatherName: string;
    fatherMobile: string;
    motherName: string;
    motherMobile: string;
    guardianName: string;
    guardianMobile: string;

    // Address Details
    presentAddressLine1: string;
    presentAddressLine2: string;
    presentState: string;
    presentCity: string;
    presentPinCode: string;
    permanentAddressLine1: string;
    permanentAddressLine2: string;
    permanentState: string;
    permanentCity: string;
    permanentPinCode: string;

    // MH MCA CET Details
    cetApplicationId: string;
    cetRank: string;
    course: string;

    // Category Details
    category: string;
    isPWD: boolean;
    pwdDetails?: string;
    isEWS: boolean;
    isReligiousMinority: boolean;
    religiousMinorityDetails?: string;

    // Password
    createPassword: string;
    confirmPassword: string;
    [key: string]: string | boolean | undefined;
}


interface ErrorState {
    [key: string]: string;
}

export default function StudentRegistrationPage() {
    const [isDarkMode] = useState(false);
    const currentColors = colors;
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorState>({});
    const [formError, setFormError] = useState<string | null>(null);
    const [sameAsPresent, setSameAsPresent] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        // Personal Details
        name: '',
        dateOfBirth: '',
        gender: '',
        mobileNumber: '',

        // Parent Details
        fatherName: '',
        fatherMobile: '',
        motherName: '',
        motherMobile: '',
        guardianName: '',
        guardianMobile: '',

        // Address Details
        presentAddressLine1: '',
        presentAddressLine2: '',
        presentState: '',
        presentCity: '',
        presentPinCode: '',
        permanentAddressLine1: '',
        permanentAddressLine2: '',
        permanentState: '',
        permanentCity: '',
        permanentPinCode: '',

        // CET Details
        cetApplicationId: '',
        cetRank: '',
        course: '',
        category: '',
        isPWD: false,
        pwdDetails: '',
        isEWS: false,
        isReligiousMinority: false,
        religiousMinorityDetails: '',

        // Password
        createPassword: '',
        confirmPassword: '',
    });


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        // Use functional update to ensure we're working with the latest state
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle phone input with direct updates
    const handlePhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const numericValue = value.replace(/\D/g, '').slice(0, 10);
        setFormData((prev) => ({ ...prev, [name]: numericValue }));
    };

    const validateForm = () => {
        const newErrors: ErrorState = {};

        // Password validation
        if (formData.createPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (formData.createPassword && formData.createPassword.length < 6) {
            newErrors.createPassword = 'Password must be at least 6 characters';
        }

        // Required field validation
        const optionalFields = ['guardianName', 'guardianMobile'];

        Object.entries(formData).forEach(([key, value]) => {
            if (!value && !optionalFields.includes(key)) {
                newErrors[key] = 'This field is required';
            }
        });

        // Mobile number validation
        const mobileRegex = /^[0-9]{10}$/;
        const mobileFields = ['mobileNumber', 'fatherMobile', 'motherMobile'];

        mobileFields.forEach(field => {
            const value = formData[field]; // Get the value
            if (typeof value === 'string' && !mobileRegex.test(value)) {
                newErrors[field] = 'Please enter a valid 10-digit mobile number';
            }
        });        

        if (formData.guardianMobile && !mobileRegex.test(formData.guardianMobile)) {
            newErrors.guardianMobile = 'Please enter a valid 10-digit mobile number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // if (!validateForm()) {
        //     setFormError('Please fix the errors in the form before submitting.');
        //     return;
        // }

        setLoading(true);
        setFormError(null);

        try {
            // API request with JSON instead of FormData
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Success handling
            alert('Registration successful!');
            window.location.href = '/index';

        } catch (error: any) {
            console.error("Registration Error:", error.message);
            setFormError(error.message || 'Failed to submit form. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    const renderInput = (name: string, label: string, type: string = 'text', required: boolean = true) => (
        <div>
            <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData] as string}
                onChange={handleInputChange}
                className={`w-full p-2 rounded border ${errors[name] ? 'border-red-500' : ''}`}
                required={required}
            />
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
        </div>
    );

    const renderCheckbox = (name: string, label: string) => (
        <div className="form-group flex items-center space-x-2">
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={formData[name as keyof FormData] as boolean}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        [name]: e.target.checked,
                    })
                }
            />
            <label htmlFor={name} className="text-sm font-semibold">
                {label}
            </label>
        </div>
    );

    const renderSelect = (name: string, label: string, options: string[]) => (
        <div className="form-group">
            <label htmlFor={name} className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                {label} <span className="text-red-500">*</span>
            </label>
            <select
                id={name}
                name={name}
                value={String(formData[name as keyof typeof formData])} // Convert value to string
                onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                className="border px-4 py-2 rounded-md w-full"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="min-h-screen p-6" style={{ backgroundColor: currentColors.background }}>
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="px-8 py-6" style={{ backgroundColor: currentColors.primary }}>
                    <h1 className="text-3xl font-bold text-white">Student Registration</h1>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Personal Details Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold" style={{ color: currentColors.textPrimary }}>Personal Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {renderInput('name', 'Full Name')}
                            {renderInput('dateOfBirth', 'Date of Birth', 'date')}
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    Mobile Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handlePhoneInput}
                                    className={`w-full p-2 rounded border ${errors.mobileNumber ? 'border-red-500' : ''}`}
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    required
                                />
                                {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    Gender <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 rounded border ${errors.gender ? 'border-red-500' : ''}`}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Parent Details Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold" style={{ color: currentColors.textPrimary }}>Parent Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {renderInput('fatherName', "Father's Name")}
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    Father&apos;s Mobile Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="fatherMobile"
                                    value={formData.fatherMobile}
                                    onChange={handlePhoneInput}
                                    className={`w-full p-2 rounded border ${errors.fatherMobile ? 'border-red-500' : ''}`}
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    required
                                />
                                {errors.fatherMobile && <p className="text-red-500 text-xs mt-1">{errors.fatherMobile}</p>}
                            </div>
                            {renderInput('motherName', "Mother's Name")}
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    Mother&apos;s Mobile Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="motherMobile"
                                    value={formData.motherMobile}
                                    onChange={handlePhoneInput}
                                    className={`w-full p-2 rounded border ${errors.motherMobile ? 'border-red-500' : ''}`}
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    required
                                />
                                {errors.motherMobile && <p className="text-red-500 text-xs mt-1">{errors.motherMobile}</p>}
                            </div>
                            {renderInput('guardianName', "Guardian's Name", 'text', false)}
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    Guardian&apos;s Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    name="guardianMobile"
                                    value={formData.guardianMobile}
                                    onChange={handlePhoneInput}
                                    className={`w-full p-2 rounded border ${errors.guardianMobile ? 'border-red-500' : ''}`}
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                />
                                {errors.guardianMobile && <p className="text-red-500 text-xs mt-1">{errors.guardianMobile}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Address Details Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold" style={{ color: currentColors.textPrimary }}>
                            Address Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Present Address Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold" style={{ color: currentColors.textPrimary }}>
                                    Present Address
                                </h3>
                                {renderInput('presentAddressLine1', 'Present Address Line 1')}
                                {renderInput('presentAddressLine2', 'Present Address Line 2')}
                                {renderInput('presentState', 'Present State')}
                                {renderInput('presentCity', 'Present City')}
                                {renderInput('presentPinCode', 'Present Pin Code')}
                            </div>

                            {/* Permanent Address Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold" style={{ color: currentColors.textPrimary }}>
                                    Permanent Address
                                </h3>
                                {renderInput('permanentAddressLine1', 'Permanent Address Line 1')}
                                {renderInput('permanentAddressLine2', 'Permanent Address Line 2')}
                                {renderInput('permanentState', 'Permanent State')}
                                {renderInput('permanentCity', 'Permanent City')}
                                {renderInput('permanentPinCode', 'Permanent Pin Code')}
                            </div>
                        </div>
                    </div>


                    {/* MH MCA CET Details Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold" style={{ color: currentColors.textPrimary }}>CET Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {renderInput('cetApplicationId', 'CET Application ID')}
                            {renderInput('cetRank', 'State Merit Number')}
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    Select Course <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="course"
                                    className="w-full border border-gray-300 rounded-md"
                                >
                                    <option value="">Select a course</option>

                                    {/* Diploma Courses */}
                                    <optgroup label="Diploma Courses">
                                        <option value="diplomaCivilEngineering">Diploma in Civil Engineering</option>
                                        <option value="diplomaElectricalEngineering">Diploma in Electrical Engineering</option>
                                        <option value="diplomaElectronicsEngineering">Diploma in Electronics Engineering</option>
                                        <option value="diplomaMechanicalEngineering">Diploma in Mechanical Engineering</option>
                                        <option value="diplomaTextileManufacturers">Diploma in Textile Manufacturers</option>
                                        <option value="diplomaChemicalEngineering">Diploma in Chemical Engineering</option>
                                    </optgroup>

                                    {/* Bachelor of Technology Degree Courses */}
                                    <optgroup label="Undergraduate Courses">
                                        <option value="btechCivilEngineering">B.Tech Degree in Civil Engineering</option>
                                        <option value="btechComputerEngineering">B.Tech Degree in Computer Engineering</option>
                                        <option value="btechElectricalEngineering">B.Tech Degree in Electrical Engineering</option>
                                        <option value="btechElectronicsEngineering">B.Tech Degree in Electronics Engineering</option>
                                        <option value="btechElectronicsTelecommunicationEngineering">B.Tech Degree in Electronics & Telecommunication Engineering</option>
                                        <option value="btechInformationTechnology">B.Tech Degree in Information Technology</option>
                                        <option value="btechMechanicalEngineering">B.Tech Degree in Mechanical Engineering</option>
                                        <option value="btechProductionEngineering">B.Tech Degree in Production Engineering</option>
                                        <option value="btechTextileTechnology">B.Tech Degree in Textile Technology</option>
                                    </optgroup>

                                    {/* Master of Technology Degree Courses */}
                                    <optgroup label="Postgraduate Courses">
                                        <option value="mca">Master of Computer Application</option>
                                        <option value="mtechCivilEngineering">M.Tech Degree in Civil Engineering</option>
                                        <option value="mtechComputerEngineering">M.Tech Degree in Computer Engineering</option>
                                        <option value="mtechElectricalEngineering">M.Tech Degree in Electrical Engineering</option>
                                        <option value="mtechIOT">M.Tech Degree in Internet of Things (IOT)</option>
                                        <option value="mtechElectronicsTelecommunicationEngineering">M.Tech Degree in Electronics & Telecommunication Engineering</option>
                                        <option value="mtechMechanicalEngineering">M.Tech Degree in Mechanical Engineering</option>
                                        <option value="mtechProductionEngineering">M.Tech Degree in Production Engineering</option>
                                        <option value="mtechProjectManagement">M.Tech Degree in Project Management</option>
                                        <option value="mtechTechnicalTextile">M.Tech Degree in Technical Textile</option>
                                        <option value="mtechDefenceTechnology">M.Tech Degree in Defence Technology</option>
                                    </optgroup>

                                    {/* Master of Computer Application */}
                                </select>
                            </div>
                            {renderSelect("category", "Category", [
                                "General",
                                "SC",
                                "ST",
                                "OBC",
                                "EWS",
                            ])}
                            {renderCheckbox("isPWD", "Is PWD (Person with Disability)")}
                            {renderInput("pwdDetails", "PWD Details (if applicable)", 'text', false)}
                            {renderCheckbox("isEWS", "Is EWS (Economically Weaker Section)")}
                            {renderCheckbox("isReligiousMinority", "Is Religious Minority")}
                            {renderInput("religiousMinorityDetails", "Religious Minority Details", 'text', false)}
                        </div>

                    </div>

                    {/* Password Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold" style={{ color: currentColors.textPrimary }}>Password</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {renderInput('createPassword', 'Create Password', 'password')}
                            {renderInput('confirmPassword', 'Confirm Password', 'password')}
                        </div>
                    </div>

                    {formError && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {formError}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 hover:scale-[1.02]"
                            style={{ backgroundColor: currentColors.primary }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Registration'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}