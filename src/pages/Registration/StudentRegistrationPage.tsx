import React, { useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../../../supabase/supabaseClient';

type RegistrationFormData = {
    email: string;
    password: string;
    name: string;
    date_of_birth: string;
    gender: string;
    mobile_number: string;
    father_name: string;
    father_mobile: string;
    mother_name: string;
    mother_mobile: string;
    guardian_name: string;
    guardian_mobile: string;
    present_address_line1: string;
    present_address_line2: string;
    present_state: string;
    present_city: string;
    present_pin_code: string;
    permanent_address_line1: string;
    permanent_address_line2: string;
    permanent_state: string;
    permanent_city: string;
    permanent_pin_code: string;
    cet_application_id: string;
    cet_rank: string;
    course: string;
    category: string;
    is_pwd: boolean;
    pwd_details: string;
    is_ews: boolean;
    is_religious_minority: boolean;
    religious_minority_details: string;
};

const StudentRegistrationPage: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<RegistrationFormData>({
        email: '',
        password: '',
        name: '',
        date_of_birth: '',
        gender: '',
        mobile_number: '',
        father_name: '',
        father_mobile: '',
        mother_name: '',
        mother_mobile: '',
        guardian_name: '',
        guardian_mobile: '',
        present_address_line1: '',
        present_address_line2: '',
        present_state: '',
        present_city: '',
        present_pin_code: '',
        permanent_address_line1: '',
        permanent_address_line2: '',
        permanent_state: '',
        permanent_city: '',
        permanent_pin_code: '',
        cet_application_id: '',
        cet_rank: '',
        course: '',
        category: '',
        is_pwd: false,
        pwd_details: '',
        is_ews: false,
        is_religious_minority: false,
        religious_minority_details: '',
    });

    const [sameAsPresent, setSameAsPresent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSameAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setSameAsPresent(checked);

        if (checked) {
            setFormData(prev => ({
                ...prev,
                permanent_address_line1: prev.present_address_line1,
                permanent_address_line2: prev.present_address_line2,
                permanent_state: prev.present_state,
                permanent_city: prev.present_city,
                permanent_pin_code: prev.present_pin_code,
            }));
        }
    };

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });
            
            if (authError) throw authError;
            if (!authData.user) throw new Error('User registration failed');
            
            await new Promise(resolve => setTimeout(resolve, 1000));

            
            const { error: profileError } = await supabase
                .from('students')
                .insert({
                    id: authData.user.id,
                    email: formData.email,
                    name: formData.name,
                    date_of_birth: formData.date_of_birth,
                    gender: formData.gender,
                    mobile_number: formData.mobile_number,
                    father_name: formData.father_name || null,
                    father_mobile: formData.father_mobile || null,
                    mother_name: formData.mother_name || null,
                    mother_mobile: formData.mother_mobile || null,
                    guardian_name: formData.guardian_name || null,
                    guardian_mobile: formData.guardian_mobile || null,
                    present_address_line1: formData.present_address_line1,
                    present_address_line2: formData.present_address_line2 || null,
                    present_state: formData.present_state,
                    present_city: formData.present_city,
                    present_pin_code: formData.present_pin_code,
                    permanent_address_line1: formData.permanent_address_line1,
                    permanent_address_line2: formData.permanent_address_line2 || null,
                    permanent_state: formData.permanent_state,
                    permanent_city: formData.permanent_city,
                    permanent_pin_code: formData.permanent_pin_code,
                    cet_application_id: formData.cet_application_id,
                    cet_rank: formData.cet_rank,
                    course: formData.course,
                    category: formData.category,
                    is_pwd: formData.is_pwd,
                    pwd_details: formData.pwd_details || null,
                    is_ews: formData.is_ews,
                    is_religious_minority: formData.is_religious_minority,
                    religious_minority_details: formData.religious_minority_details || null,
                });

            if (profileError) {
                console.error('Profile creation error:', profileError);
                throw profileError;
            }

            router.push('/');
        } catch (err: any) {
            console.error('Registration error:', err);
            setError(err.message || 'An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Account & Basic Information</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                        required
                                        minLength={8}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="date_of_birth"
                                        value={formData.date_of_birth}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobile_number"
                                        value={formData.mobile_number}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Parent/Guardian Information</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                                    <input
                                        type="text"
                                        name="father_name"
                                        value={formData.father_name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Father's Mobile</label>
                                    <input
                                        type="tel"
                                        name="father_mobile"
                                        value={formData.father_mobile}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
                                    <input
                                        type="text"
                                        name="mother_name"
                                        value={formData.mother_name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mother's Mobile</label>
                                    <input
                                        type="tel"
                                        name="mother_mobile"
                                        value={formData.mother_mobile}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Guardian's Name (if applicable)</label>
                                    <input
                                        type="text"
                                        name="guardian_name"
                                        value={formData.guardian_name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Guardian's Mobile</label>
                                    <input
                                        type="tel"
                                        name="guardian_mobile"
                                        value={formData.guardian_mobile}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Address Information</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium mb-2">Present Address</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                                        <input
                                            type="text"
                                            name="present_address_line1"
                                            value={formData.present_address_line1}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                                        <input
                                            type="text"
                                            name="present_address_line2"
                                            value={formData.present_address_line2}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">State</label>
                                            <input
                                                type="text"
                                                name="present_state"
                                                value={formData.present_state}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">City</label>
                                            <input
                                                type="text"
                                                name="present_city"
                                                value={formData.present_city}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">PIN Code</label>
                                            <input
                                                type="text"
                                                name="present_pin_code"
                                                value={formData.present_pin_code}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="sameAsPresent"
                                    checked={sameAsPresent}
                                    onChange={handleSameAddressChange}
                                    className="h-4 w-4 text-red-600 focus:ring-red-800 border-gray-300 rounded"
                                />
                                <label htmlFor="sameAsPresent" className="ml-2 block text-sm text-gray-700">
                                    Same as Present Address
                                </label>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-2">Permanent Address</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                                        <input
                                            type="text"
                                            name="permanent_address_line1"
                                            value={formData.permanent_address_line1}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                                        <input
                                            type="text"
                                            name="permanent_address_line2"
                                            value={formData.permanent_address_line2}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">State</label>
                                            <input
                                                type="text"
                                                name="permanent_state"
                                                value={formData.permanent_state}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">City</label>
                                            <input
                                                type="text"
                                                name="permanent_city"
                                                value={formData.permanent_city}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">PIN Code</label>
                                            <input
                                                type="text"
                                                name="permanent_pin_code"
                                                value={formData.permanent_pin_code}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 4:
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Course & CET Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">CET Application ID</label>
                                <input
                                    type="text"
                                    name="cet_application_id"
                                    value={formData.cet_application_id}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">CET Rank</label>
                                <input
                                    type="text"
                                    name="cet_rank"
                                    value={formData.cet_rank}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Course</label>
                                <select
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                    required
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
                                </select>
                            </div>
                        </div>
                    </>
                );
            case 5:
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Category Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="General">General</option>
                                    <option value="OBC">OBC</option>
                                    <option value="SC">SC</option>
                                    <option value="ST">ST</option>
                                    <option value="NT">NT</option>
                                    <option value="SBC">SBC</option>
                                </select>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_ews"
                                    name="is_ews"
                                    checked={formData.is_ews}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-red-600 focus:ring-red-800 border-gray-300 rounded"
                                />
                                <label htmlFor="is_ews" className="ml-2 block text-sm text-gray-700">
                                    Economically Weaker Section (EWS)
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_pwd"
                                    name="is_pwd"
                                    checked={formData.is_pwd}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-red-600 focus:ring-red-800 border-gray-300 rounded"
                                />
                                <label htmlFor="is_pwd" className="ml-2 block text-sm text-gray-700">
                                    Person with Disability (PwD)
                                </label>
                            </div>

                            {formData.is_pwd && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">PwD Details</label>
                                    <textarea
                                        name="pwd_details"
                                        value={formData.pwd_details}
                                        onChange={handleChange}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                    />
                                </div>
                            )}

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_religious_minority"
                                    name="is_religious_minority"
                                    checked={formData.is_religious_minority}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-red-600 focus:ring-red-800 border-gray-300 rounded"
                                />
                                <label htmlFor="is_religious_minority" className="ml-2 block text-sm text-gray-700">
                                    Religious Minority
                                </label>
                            </div>

                            {formData.is_religious_minority && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Religious Minority Details</label>
                                    <input
                                        type="text"
                                        name="religious_minority_details"
                                        value={formData.religious_minority_details}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
                                    />
                                </div>
                            )}
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Student Registration</h1>
                    <p className="mt-2 text-gray-600">Please fill in all required information to complete your registration</p>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {Array.from({ length: totalSteps }, (_, i) => (
                            <div key={i} className="text-xs font-medium">
                                Step {i + 1}
                            </div>
                        ))}
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                        <div
                            className="h-full bg-red-600 rounded-full transition-all"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <strong className="font-bold">Error: </strong>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
                    {renderStepContent()}

                    <div className="mt-8 flex justify-between">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Previous
                            </button>
                        )}

                        {currentStep < totalSteps ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="ml-auto bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={loading}
                                className="ml-auto bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : 'Submit Registration'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentRegistrationPage;