import React, { useState } from "react";
import axios from "axios"; // 1. Import Axios
import "../styles/AddEventPage.css";
import { Plus, Trash } from "lucide-react";

const ROLES = [
  "Manager", "Logistics", "Co-Manager", "Dev",
  "Communication", "Finance", "Design", "Sponsorship", "Volunteer",
];

// NOTE: Replace with your actual endpoint
const API_ENDPOINT = "YOUR_POST_API_ENDPOINT"; 

export default function AddEventPage() {
  // Event Details State
  const [eventName, setEventName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  
  const [organizers, setOrganizers] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  // --- Organizer Handlers ---
  const addOrganizer = () =>
    setOrganizers([...organizers, { name: "", role: "", img: null }]);
  const updateOrganizer = (i, key, val) => {
    const copy = [...organizers];
    copy[i][key] = val;
    setOrganizers(copy);
  };
  const removeOrganizer = (i) =>
    setOrganizers(organizers.filter((_, idx) => idx !== i));

  // --- Form Field Handlers ---
  const addField = (type) =>
    setFormFields([...formFields, { type, label: "", options: type==="text"?[]:[""], required:false }]);
  const updateField = (i, key, val) => {
    const copy = [...formFields];
    copy[i][key] = val;
    setFormFields(copy);
  };
  const removeField = (i) => setFormFields(formFields.filter((_, idx) => idx!==i));
  const updateOption = (fIndex, oIndex, val) => {
    const copy = [...formFields];
    copy[fIndex].options[oIndex] = val;
    setFormFields(copy);
  };
  const addOption = (fIndex) => {
    const copy = [...formFields];
    copy[fIndex].options.push("");
    setFormFields(copy);
  };
  const removeOption = (fIndex, oIndex) => {
    const copy = [...formFields];
    copy[fIndex].options.splice(oIndex, 1);
    setFormFields(copy);
  };

  // --- API Call Function using Axios ---
  const postEvent = async (eventData) => {
      // Axios automatically handles JSON stringification and returns the response data
      const response = await axios.post(API_ENDPOINT, eventData, {
        headers: {
            'Content-Type': 'application/json',
            // Add any required auth headers here
        },
      });
      return response.data; // Axios returns the response body directly in .data
  };

  // --- Submission Handler ---
  const handleCreatorSubmit = async (e) => {
    e.preventDefault();
    
    for(let o of organizers){
      if(o.role===""||o.role==="Select Role"){
        alert(`Please select a role for all organizers.`); 
        return;
      }
    }

    // Compile event data object
    const eventData = {
        eventName,
        category,
        description,
        startDate,
        endDate,
        startTime,
        endTime,
        location,
        organizers,
        customForm: formFields, 
        coverImage: coverImage ? coverImage.name : null, // Sending filename/placeholder
        bannerImage: bannerImage ? bannerImage.name : null // Sending filename/placeholder
    };
    
    // Call the API function
    try {
        const result = await postEvent(eventData);
        console.log("Event created successfully:", result);
        alert("Event submitted successfully!");
        // Add form reset or redirection logic here
    } catch (error) {
        // Axios errors are usually found in error.response
        console.error("Error submitting event:", error.response || error);
        alert(`Failed to submit event: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="add-event-page">
      <div className="add-event-container">
        <h1 className="add-event-title">Add New Event</h1>
        <form className="add-event-form" onSubmit={handleCreatorSubmit}>
          
          <label>Event Name
            <input 
              type="text" 
              placeholder="Event name" 
              value={eventName}
              onChange={e => setEventName(e.target.value)}
              required 
            />
          </label>
        
          <label>Category of the event
            <input 
              type="text" 
              placeholder="Category" 
              value={category}
              onChange={e => setCategory(e.target.value)}
              required 
            />
          </label>      

          {/* Cover Image */}
          <label>Cover Image</label>
          <div className="file-upload-label">
            <span className="file-upload-btn">{coverImage?"Image Uploaded ✅":"Choose File"}</span>
            <input type="file" className="file-upload-input" onChange={e=>setCoverImage(e.target.files[0])}/>
          </div>

          {/* Banner Image */}
          <label>Banner Image</label>
          <div className="file-upload-label">
            <span className="file-upload-btn">{bannerImage?"Image Uploaded ✅":"Choose File"}</span>
            <input type="file" className="file-upload-input" onChange={e=>setBannerImage(e.target.files[0])}/>
          </div>

          {/* Description */}
          <label>Description
            <textarea 
              placeholder="Event description" 
              rows={4} 
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>

          <div className="date-time-grid">
            {/* Start Date */}
            <label>Start Date
              <input 
                type="date" 
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                required 
              />
            </label>
            {/* End Date */}
            <label>End Date
              <input 
                type="date" 
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                required 
              />
            </label>
            {/* Start Time (Hour) */}
            <label>Start Time
              <input 
                type="time" 
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                required 
              />
            </label>
            {/* End Time (Hour) */}
            <label>End Time
              <input 
                type="time" 
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                required 
              />
            </label>
          </div>

          {/* Location */}
          <label>Location
            <input 
              type="text" 
              placeholder="Location" 
              value={location}
              onChange={e => setLocation(e.target.value)}
              required 
            />
          </label>

          {/* Organizers */}
          <div className="organizers-section">
            <div className="section-header">
              <h3>Organizers</h3>
              <button type="button" className="btn-add" onClick={addOrganizer}><Plus size={14}/> Add</button>
            </div>
            <div className="organizers-container">
              {organizers.map((o,i)=>(
                <div key={i} className="organizer-card">
                  <div className="file-upload-label">
                    <span className="file-upload-btn">{o.img?"Image Uploaded ✅":"Upload Image"}</span>
                    <input type="file" className="file-upload-input" onChange={e=>updateOrganizer(i,"img",e.target.files[0])}/>
                  </div>
                  <input type="text" placeholder="Name" value={o.name} onChange={e=>updateOrganizer(i,"name",e.target.value)} required/>
                  <select value={o.role} onChange={e=>updateOrganizer(i,"role",e.target.value)} required>
                    <option value="" disabled>Select Role</option>
                    {ROLES.map(r=><option key={r} value={r}>{r}</option>)}
                  </select>
                  <button type="button" className="btn-delete" onClick={()=>removeOrganizer(i)}><Trash size={16}/></button>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Registration Form */}
          <div className="registration-form-section">
            <h3>Custom Registration Form</h3>
            <div className="form-buttons">
              <button type="button" className="btn-add" onClick={()=>addField("text")}>Text Input</button>
              <button type="button" className="btn-add" onClick={()=>addField("radio")}>Radio Select</button>
              <button type="button" className="btn-add" onClick={()=>addField("checkbox")}>Checkbox Select</button>
            </div>
            {formFields.map((f,i)=>(
              <div key={i} className="field-card">
                <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                  <span style={{fontSize:'12px',fontWeight:'600',color:'#8b5cf6',textTransform:'uppercase'}}>
                    {f.type}
                  </span>
                  <input type="text" placeholder="Field Label" value={f.label} onChange={e=>updateField(i,"label",e.target.value)} style={{flexGrow:1}} required/>
                  <label>
                    <input type="checkbox" checked={f.required} onChange={e=>updateField(i,"required",e.target.checked)}/>Required
                  </label>
                </div>

                {(f.type==="radio"||f.type==="checkbox")&&
                  <div className="options-section">
                    {f.options.map((opt,oIndex)=>(
                      <div key={oIndex} className="option-editing-row">
                        <input type="text" value={opt} onChange={e=>updateOption(i,oIndex,e.target.value)} required/>
                        <button type="button" className="btn-delete" onClick={()=>removeOption(i,oIndex)}><Trash size={14}/></button>
                      </div>
                    ))}
                    <button type="button" className="btn-add" onClick={()=>addOption(i)}><Plus size={14}/> Add Option</button>
                  </div>
                }
                <button type="button" className="btn-delete" onClick={()=>removeField(i)}><Trash size={16}/> Remove Field</button>
              </div>
            ))}
          </div>

          <button type="submit" className="btn-submit">Save Event</button>
        </form>
      </div>
    </div>
  );
}