import React, { useState } from "react";
import axios from "axios"; // 1. Import Axios
import "../styles/AddEventPage.css";
import { Plus, Trash } from "lucide-react";

const ROLES = [
  "Manager", "Logistics", "Co-Manager", "Dev",
  "Communication", "Finance", "Design", "Sponsorship", "Volunteer",
];

export default function AddEventPage() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

          // 1. Retrieve the token from localStorage
            const token = localStorage.getItem('authToken'); // Assuming 'authToken' is the key
            const clubId = localStorage.getItem("clubId");

            // 2. Check if the token exists before attempting to fetch
            if (!token) {
                setError("Authorization token is missing. Please log in again.");
                setLoading(false);
                // Optionally redirect to login here using navigate()
                return;
            }  // In your AddEventPage.jsx
const API_ENDPOINT = `http://localhost:5000/api/admins/api/admin/addEvent/${clubId}`;

const handleCreatorSubmit = async (e) => {
  e.preventDefault();

  // Use fixed images
  const banner = "https://images.unsplash.com/photo-1596496356933-9b6e0b186b88?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const cover = "https://plus.unsplash.com/premium_photo-1664304168263-f18dcc6fb94a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const organizerImg = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVvcGxlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D";

  // Make sure all organizers have this image
  const organizersFixed = organizers.map(o => ({
    name: o.name,
    role: o.role,
    avatar: organizerImg
  }));

  const eventData = {
    title: eventName,
    category,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    bannerImage: banner,
    coverImage: cover,
    organizers: organizersFixed,
    registrationForm: formFields
  };

  try {
    const res = await axios.post(API_ENDPOINT, eventData, {
      headers: {
                            // This format matches what your backend auth middleware expects: "Bearer <token>"
                            'Authorization': `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
    });
    console.log("Event created:", res.data);
    alert("Event created successfully!");
    // Redirect to the club page after creation
    window.location.href = `/profile?club=${res.data.clubId}`;
  } catch (err) {
    console.error(err);
    alert("Failed to create event");
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