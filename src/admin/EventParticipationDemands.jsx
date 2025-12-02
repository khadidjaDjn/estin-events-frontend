import React, { useState } from 'react';
import { 
    Download, Mail, UserPlus, Check, X, Eye, Menu
} from 'lucide-react';
import AdminNavbar from './AdminNavbar'; 
import '../styles/EventParticipationDemands.css'; 


const MOCK_EVENT_TITLE = "AI Summit 2024";

const MOCK_REGISTRATION_FORM = [
    { label: "Your Full Name", type: "text", required: true },
    { label: "Email Address", type: "text", required: true },
    { label: "Why do you want to attend?", type: "textarea", required: true },
    { label: "Select your main AI interest areas", type: "checkbox", required: true, options: ["Machine Learning", "NLP", "Robotics", "Ethical AI"] },
    { label: "Are you a student or professional?", type: "radio", required: true, options: ["Student", "Professional", "Other"] }
];

const MOCK_DEMANDS_LIST = [
    { 
        id: 201, 
        name: "Tarek Benali", 
        email: "tarek.b@mail.com", 
        date: "2024-11-20", 
        answers: [
            { label: "Your Full Name", value: "Tarek Benali" },
            { label: "Email Address", value: "tarek.b@mail.com" },
            { label: "Why do you want to attend?", value: "I'm a final year engineering student working on a thesis about large language models. This summit is crucial for networking and research." },
            { label: "Select your main AI interest areas", value: ["Machine Learning", "NLP"] },
            { label: "Are you a student or professional?", value: "Student" },
        ]
    },
    { 
        id: 202, 
        name: "Lyna Mansour", 
        email: "lyna.m@mail.com", 
        date: "2024-11-21", 
        answers: [
            { label: "Your Full Name", value: "Lyna Mansour" },
            { label: "Email Address", value: "lyna.m@mail.com" },
            { label: "Why do you want to attend?", value: "As a software developer, I want to pivot into AI ethics and understand the latest regulatory frameworks." },
            { label: "Select your main AI interest areas", value: ["Ethical AI", "Robotics"] },
            { label: "Are you a student or professional?", value: "Professional" },
        ]
    },
    { 
        id: 203, 
        name: "Mehdi Chouit", 
        email: "mehdi.c@mail.com", 
        date: "2024-11-22", 
        answers: [
            { label: "Your Full Name", value: "Mehdi Chouit" },
            { label: "Email Address", value: "mehdi.c@mail.com" },
            { label: "Why do you want to attend?", value: "General interest in technology." },
            { label: "Select your main AI interest areas", value: ["Robotics"] },
            { label: "Are you a student or professional?", value: "Other" },
        ]
    },
];

// Helper component for the Answer Modal/Popup
const AnswerModal = ({ demand, form, onClose, onAccept, onRefuse }) => {
    // Helper function to render the form fields and user answers
    const renderAnswer = (field, answer) => {
        const value = answer.value;
        
        switch (field.type) {
            case 'text':
            case 'textarea':
                return <p className="answer-text">{value || 'No Answer Provided'}</p>;

            case 'checkbox':
                // For checkboxes, value is an array of selected options
                const selectedOptions = Array.isArray(value) ? value : [];
                return (
                    <ul className="answer-options-list">
                        {field.options.map((option, index) => (
                            <li key={index} className={selectedOptions.includes(option) ? 'checked' : 'unchecked'}>
                                {selectedOptions.includes(option) ? <Check size={16} /> : <span className="unchecked-icon"></span>}
                                {option}
                            </li>
                        ))}
                    </ul>
                );
            case 'radio':
                // For radio buttons, value is a single selected option string
                return (
                    <ul className="answer-options-list">
                        {field.options.map((option, index) => (
                            <li key={index} className={value === option ? 'checked' : 'unchecked'}>
                                <span className={`radio-dot ${value === option ? 'checked-dot' : ''}`}></span>
                                {option}
                            </li>
                        ))}
                    </ul>
                );
            default:
                return <p className="answer-text">Answer Type Not Supported</p>;
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Review Demand: {demand.name}</h3>
                    <button onClick={onClose} className="modal-close-button"><X size={20} /></button>
                </div>
                <div className="modal-body">
                    <p className="demand-review-intro">
                        Review the registration form answers submitted by {demand.name} for the {MOCK_EVENT_TITLE} event.
                    </p>
                    {form.map((field, index) => {
                        // Find the corresponding answer for this form field
                        const answer = demand.answers.find(a => a.label === field.label);
                        
                        // We must find answers for name and email, but other fields might be optional 
                        // in a real scenario, so we use optional chaining/check.
                        if (!answer) return null;

                        return (
                            <div key={index} className="answer-detail-item">
                                <label className="answer-label">
                                    {field.label} 
                                    {field.required && <span className="required-star">*</span>}
                                </label>
                                <div className="answer-value-container">
                                    {renderAnswer(field, answer)}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="modal-footer">
                    <button onClick={onClose} className="action-button secondary-action">Close</button>
                    <button 
                        onClick={() => { onAccept(demand.id); onClose(); }} 
                        className="action-button accept-action"
                    >
                        Accept Demand <Check size={16} />
                    </button>
                    <button 
                        onClick={() => { onRefuse(demand.id); onClose(); }} 
                        className="action-button refuse-action"
                    >
                        Refuse Demand <X size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};


const AdminDemandsPage = () => {
    const [demands, setDemands] = useState(MOCK_DEMANDS_LIST);
    const [showAnswersModal, setShowAnswersModal] = useState(false);
    const [selectedDemand, setSelectedDemand] = useState(null);

    const handleViewAnswers = (demand) => {
        setSelectedDemand(demand);
        setShowAnswersModal(true);
    };

    const handleAccept = (id) => {
        console.log(`Accepted demand ID: ${id}`);
        // Filter out the accepted demand from the list
        setDemands(demands.filter(d => d.id !== id));
        alert(`Demand ${id} accepted and moved to Attendees list.`);
    };

    const handleRefuse = (id) => {
        console.log(`Refused demand ID: ${id}`);
        // Filter out the refused demand from the list
        setDemands(demands.filter(d => d.id !== id));
        alert(`Demand ${id} refused.`);
    };


    return (
        <div className="demands-page">
            <AdminNavbar />

            {/* Answer Modal */}
            {showAnswersModal && selectedDemand && (
                <AnswerModal 
                    demand={selectedDemand} 
                    form={MOCK_REGISTRATION_FORM} 
                    onClose={() => setShowAnswersModal(false)}
                    onAccept={handleAccept}
                    onRefuse={handleRefuse}
                />
            )}

            <div className="content-area">
                <div className="page-header">
                    <h1 className="page-title">
                        <UserPlus size={32} className="icon-margin-right" />
                        Registration Demands Review
                    </h1>
                    <p className="page-subtitle">
                        Event: {MOCK_EVENT_TITLE} — Review and approve pending registrations based on custom form answers.
                    </p>
                </div>

                <div className="card full-width-card">
                    <div className="demands-table-header">
                        <h2 className="section-title">
                            <Menu size={24} className="icon-margin-right" />
                            Pending Demands ({demands.length})
                        </h2>
                        <button className="action-button secondary-action">
                            <Download size={18} />
                            Export All Demands
                        </button>
                    </div>

                    <div className="demands-table-container">
                        <table className="demands-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Date Submitted</th>
                                    <th className="action-column">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {demands.length > 0 ? (
                                    demands.map(demand => (
                                        <tr key={demand.id}>
                                            <td>{demand.id}</td>
                                            <td className="demand-name">{demand.name}</td>
                                            <td>{demand.email}</td>
                                            <td>{demand.date}</td>
                                            <td className="action-column">
                                                <button 
                                                    className="table-action-button view-action"
                                                    onClick={() => handleViewAnswers(demand)}
                                                >
                                                    <Eye size={16} /> View Answers
                                                </button>
                                                <button 
                                                    className="table-action-button accept-action"
                                                    onClick={() => handleAccept(demand.id)}
                                                >
                                                    <Check size={16} /> Accept
                                                </button>
                                                <button 
                                                    className="table-action-button refuse-action"
                                                    onClick={() => handleRefuse(demand.id)}
                                                >
                                                    <X size={16} /> Refuse
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="empty-state">
                                            🎉 **All demands reviewed!** The queue is currently empty.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDemandsPage;