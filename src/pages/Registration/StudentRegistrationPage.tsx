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

    // MH MCA CET Details
    cetApplicationId: string;
    cetRank: string;

    // Password
    createPassword: string;
    confirmPassword: string;
    [key: string]: string;
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

        // MH MCA CET Details
        cetApplicationId: '',
        cetRank: '',

        // Password
        createPassword: '',
        confirmPassword: '',
        
        // Adding missing properties referenced in the code
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
            if (formData[field] && !mobileRegex.test(formData[field])) {
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

                    {/* MH MCA CET Details Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold" style={{ color: currentColors.textPrimary }}>MH MCA CET Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {renderInput('cetApplicationId', 'MH MCA CET ID')}
                            {renderInput('cetRank', 'State Merit Number')}
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