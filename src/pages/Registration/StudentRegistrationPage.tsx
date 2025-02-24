import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import colors from '../../styles/colors';

const darkModeColors = {
    ...colors,
    background: "#000000",
    surfaceLight: "#18181B",
    surfaceMedium: "#27272A",
    surfaceDark: "#3F3F46",
    textPrimary: "#FFFFFF",
    textSecondary: "#D4D4D8",
    textTertiary: "#A1A1AA",
    primaryLight: "#450000",
};

export default function StudentRegistrationPage() {
    const [isDarkMode] = useState(false);
    const currentColors = isDarkMode ? darkModeColors : colors;
    const [loading, setLoading] = useState(false);
    const [sameAsPresent, setSameAsPresent] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [formData, setFormData] = useState({
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

        // Present Address
        presentAddressLine1: '',
        presentAddressLine2: '',
        presentState: '',
        presentCity: '',
        presentPinCode: '',

        // Permanent Address
        permanentAddressLine1: '',
        permanentAddressLine2: '',
        permanentState: '',
        permanentCity: '',
        permanentPinCode: '',

        //MH MCA CET Details
        cetApplicationId: '',
        cetRank: '',

        // Admission Details
        category: '',
        admissionCategory: '',
        pwdCategory: '',
        religiousMinority: '',
        ewsStatus: false,
        orphanStatus: false,
        mhmcacetId: '',
        stateMeritNumber: '',
        feesPaid: '',

        // Documents
        admissionReceipt: null as File | null,
        feesReceipt: null as File | null,
        aadharCard: null as File | null,
        aadharNumber: '',
        
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                [fieldName]: file
            }));
        }
    };

    const handleAddressToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSameAsPresent(e.target.checked);
        if (e.target.checked) {
            setFormData(prev => ({
                ...prev,
                permanentAddressLine1: prev.presentAddressLine1,
                permanentAddressLine2: prev.presentAddressLine2,
                permanentState: prev.presentState,
                permanentCity: prev.presentCity,
                permanentPinCode: prev.presentPinCode
            }));
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // Required field validation
        Object.entries(formData).forEach(([key, value]) => {
            if (!value && key !== 'presentAddressLine2' && key !== 'permanentAddressLine2' && key !== 'pwdCategory') {
                newErrors[key] = 'This field is required';
            }
        });

        // Mobile number validation
        const mobileRegex = /^[0-9]{10}$/;
        ['mobileNumber', 'fatherMobile', 'motherMobile'].forEach(field => {
            if (formData[field as keyof typeof formData] && !mobileRegex.test(formData[field as keyof typeof formData] as string)) {
                newErrors[field] = 'Please enter a valid 10-digit mobile number';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            // API call would go here
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Form submitted:', formData);
        } catch (error) {
            console.error('Submission error:', error);
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
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        handleInputChange({
                                            target: {
                                                name: 'mobileNumber',
                                                value
                                            }
                                        });
                                    }}
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
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
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
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        handleInputChange({
                                            target: {
                                                name: 'fatherMobile',
                                                value
                                            }
                                        });
                                    }}
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
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        handleInputChange({
                                            target: {
                                                name: 'motherMobile',
                                                value
                                            }
                                        });
                                    }}
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
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        handleInputChange({
                                            target: {
                                                name: 'guardianMobile',
                                                value
                                            }
                                        });
                                    }}
                                    className={`w-full p-2 rounded border ${errors.guardianMobile ? 'border-red-500' : ''}`}
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                />
                                {errors.guardianMobile && <p className="text-red-500 text-xs mt-1">{errors.guardianMobile}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold" style={{ color: currentColors.textPrimary }}>Address Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Present Address */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium" style={{ color: currentColors.textSecondary }}>Present Address</h3>
                                <div className="space-y-4">
                                    {renderInput('presentAddressLine1', 'Address Line 1')}
                                    {renderInput('presentAddressLine2', 'Address Line 2', 'text', false)}
                                    <div className="grid grid-cols-2 gap-4">
                                        {renderInput('presentState', 'State')}
                                        {renderInput('presentCity', 'City')}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                            Pin Code <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="presentPinCode"
                                            value={formData.presentPinCode}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                                handleInputChange({
                                                    target: {
                                                        name: 'presentPinCode',
                                                        value
                                                    }
                                                });
                                            }}
                                            className={`w-full p-2 rounded border ${errors.presentPinCode ? 'border-red-500' : ''}`}
                                            pattern="[0-9]{6}"
                                            maxLength={6}
                                            required
                                        />
                                        {errors.presentPinCode && <p className="text-red-500 text-xs mt-1">{errors.presentPinCode}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Permanent Address */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium" style={{ color: currentColors.textSecondary }}>Permanent Address</h3>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={sameAsPresent}
                                            onChange={handleAddressToggle}
                                            className="rounded"
                                        />
                                        <span className="text-sm" style={{ color: currentColors.textTertiary }}>Same as Present</span>
                                    </label>
                                </div>
                                <div className="space-y-4">
                                    {renderInput('permanentAddressLine1', 'Address Line 1')}
                                    {renderInput('permanentAddressLine2', 'Address Line 2', 'text', false)}
                                    <div className="grid grid-cols-2 gap-4">
                                        {renderInput('permanentState', 'State')}
                                        {renderInput('permanentCity', 'City')}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                            Pin Code <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="permanentPinCode"
                                            value={formData.permanentPinCode}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                                handleInputChange({
                                                    target: {
                                                        name: 'permanentPinCode',
                                                        value
                                                    }
                                                });
                                            }}
                                            className={`w-full p-2 rounded border ${errors.permanentPinCode ? 'border-red-500' : ''}`}
                                            pattern="[0-9]{6}"
                                            maxLength={6}
                                            required
                                        />
                                        {errors.permanentPinCode && <p className="text-red-500 text-xs mt-1">{errors.permanentPinCode}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MH MCA CET Details Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold" style={{ color: currentColors.textPrimary }}>MH MCA CET Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {renderInput('cetApplicationId', 'CET Application ID')}
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    CET Rank <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="cetRank"
                                    value={formData.cetRank}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 rounded border ${errors.cetRank ? 'border-red-500' : ''}`}
                                    min="1"
                                    required
                                />
                                {errors.cetRank && <p className="text-red-500 text-xs mt-1">{errors.cetRank}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Admission Details Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold" style={{ color: currentColors.textPrimary }}>Admission Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 rounded border ${errors.category ? 'border-red-500' : ''}`}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="general">General</option>
                                    <option value="obc">OBC</option>
                                    <option value="sc">SC</option>
                                    <option value="st">ST</option>
                                </select>
                                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    Admission Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="admissionCategory"
                                    value={formData.admissionCategory}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 rounded border ${errors.admissionCategory ? 'border-red-500' : ''}`}
                                    required
                                >
                                    <option value="">Select Admission Category</option>
                                    <option value="general">General</option>
                                    <option value="obc">OBC</option>
                                    <option value="sc">SC</option>
                                    <option value="st">ST</option>
                                </select>
                                {errors.admissionCategory && <p className="text-red-500 text-xs mt-1">{errors.admissionCategory}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    PWD Category
                                </label>
                                <select
                                    name="pwdCategory"
                                    value={formData.pwdCategory}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 rounded border ${errors.pwdCategory ? 'border-red-500' : ''}`}
                                >
                                    <option value="">Select PWD Category</option>
                                    <option value="blindness">Blindness</option>
                                    <option value="low-vision">Low Vision</option>
                                    <option value="hearing-impairment">Hearing Impairment</option>
                                    <option value="locomotor-disability">Locomotor Disability</option>
                                    <option value="intellectual-disability">Intellectual Disability</option>
                                    <option value="mental-illness">Mental Illness</option>
                                    <option value="autism">Autism Spectrum Disorder</option>
                                    <option value="multiple-disabilities">Multiple Disabilities</option>
                                    <option value="">Other</option>
                                    <option value="">No</option>
                                </select>
                                {errors.pwdCategory && <p className="text-red-500 text-xs mt-1">{errors.pwdCategory}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    Religious Minority Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="religiousMinority"
                                    value={formData.religiousMinority}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 rounded border ${errors.religiousMinority ? 'border-red-500' : ''}`}
                                    required
                                >
                                    <option value="">Select Religious Minority</option>
                                    <option value="muslim">Muslim</option>
                                    <option value="christian">Christian</option>
                                    <option value="sikh">Sikh</option>
                                    <option value="buddhist">Buddhist</option>
                                    <option value="parsi">Parsi</option>
                                    <option value="jain">Jain</option>
                                    <option value="none">None</option>
                                </select>
                                {errors.religiousMinority && <p className="text-red-500 text-xs mt-1">{errors.religiousMinority}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    EWS Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="ewsStatus"
                                    value={formData.ewsStatus ? "yes" : "no"}
                                    onChange={(e) => handleInputChange({
                                        target: {
                                            name: "ewsStatus",
                                            value: e.target.value === "yes"
                                        }
                                    })}
                                    className={`w-full p-2 rounded border ${errors.ewsStatus ? 'border-red-500' : ''}`}
                                    required
                                >
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>
                                {errors.ewsStatus && <p className="text-red-500 text-xs mt-1">{errors.ewsStatus}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    Orphan Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="orphanStatus"
                                    value={formData.orphanStatus ? "yes" : "no"}
                                    onChange={(e) => handleInputChange({
                                        target: {
                                            name: "orphanStatus",
                                            value: e.target.value === "yes"
                                        }
                                    })}
                                    className={`w-full p-2 rounded border ${errors.orphanStatus ? 'border-red-500' : ''}`}
                                    required
                                >
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>
                                {errors.orphanStatus && <p className="text-red-500 text-xs mt-1">{errors.orphanStatus}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Document Upload Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold" style={{ color: currentColors.textPrimary }}>Document Upload</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    Admission Receipt <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, 'admissionReceipt')}
                                    className={`w-full p-2 ${errors.admissionReceipt ? 'border-red-500' : ''}`}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    required
                                />
                                {errors.admissionReceipt && <p className="text-red-500 text-xs mt-1">{errors.admissionReceipt}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    Fees Receipt <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, 'feesReceipt')}
                                    className={`w-full p-2 ${errors.feesReceipt ? 'border-red-500' : ''}`}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    required
                                />
                                {errors.feesReceipt && <p className="text-red-500 text-xs mt-1">{errors.feesReceipt}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    Fees Paid <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="feesPaid"
                                    value={formData.feesPaid}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 rounded border ${errors.feesPaid ? 'border-red-500' : ''}`}
                                    min="0"
                                    required
                                />
                                {errors.feesPaid && <p className="text-red-500 text-xs mt-1">{errors.feesPaid}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    Aadhar Card <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, 'aadharCard')}
                                    className={`w-full p-2 ${errors.aadharCard ? 'border-red-500' : ''}`}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    required
                                />
                                {errors.aadharCard && <p className="text-red-500 text-xs mt-1">{errors.aadharCard}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                                    Aadhar Card Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="aadharNumber"
                                    value={formData.aadharNumber}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                                        handleInputChange({
                                            target: {
                                                name: 'aadharNumber',
                                                value
                                            }
                                        });
                                    }}
                                    className={`w-full p-2 rounded border ${errors.aadharNumber ? 'border-red-500' : ''}`}
                                    placeholder="Enter 12 digit Aadhar number"
                                    pattern="[0-9]{12}"
                                    maxLength={12}
                                    required
                                />
                                {errors.aadharNumber && <p className="text-red-500 text-xs mt-1">{errors.aadharNumber}</p>}
                            </div>
                        </div>
                    </div>

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