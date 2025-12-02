import React, { useState } from "react";
import "../styles/AddEventPage.css";
import { Plus, Trash } from "lucide-react";

const ROLES = [
  "Manager", "Logistics", "Co-Manager", "Dev",
  "Communication", "Finance", "Design", "Sponsorship", "Volunteer",
];

export default function AddEventPage() {
  const [organizers, setOrganizers] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [coverImage, setCoverImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  const addOrganizer = () =>
    setOrganizers([...organizers, { name: "", role: "", img: null }]);
  const updateOrganizer = (i, key, val) => {
    const copy = [...organizers];
    copy[i][key] = val;
    setOrganizers(copy);
  };
  const removeOrganizer = (i) =>
    setOrganizers(organizers.filter((_, idx) => idx !== i));

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

  const handleSubmit = (e) => {
    e.preventDefault();
    for(let f of formFields) {
      if(f.required){
        const val = formData[f.label];
        if(val===undefined||val===""||(Array.isArray(val)&&val.length===0)){
          alert(`Field "${f.label}" is required!`);
          return;
        }
      }
    }
    for(let o of organizers){
      if(o.role===""||o.role==="Select Role"){alert(`Please select a role for all organizers.`); return;}
    }
    console.log({organizers, formData, coverImage, bannerImage});
    alert("Event submitted successfully!");
  };

  return (
    <div className="add-event-page">
      <div className="add-event-container">
        <h1 className="add-event-title">Add New Event</h1>
        <form className="add-event-form" onSubmit={handleSubmit}>
          <label>Event Name<input type="text" placeholder="Event name" required /></label>
        
          <label>Category of the event<input type="text" placeholder="Category" required /></label>       

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

          <label>Description<textarea placeholder="Event description" rows={4} /></label>

          <div className="date-time-grid">
            <label>Start Date<input type="date" required /></label>
            <label>End Date<input type="date" required /></label>
            <label>Start Time<input type="time" required /></label>
            <label>End Time<input type="time" required /></label>
          </div>

          <label>Location<input type="text" placeholder="Location" required /></label>

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
                  {/* Field Type Badge */}
                  <span style={{fontSize:'12px',fontWeight:'600',color:'#8b5cf6',textTransform:'uppercase'}}>
                    {f.type}
                  </span>

                  {/* Field Label */}
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
