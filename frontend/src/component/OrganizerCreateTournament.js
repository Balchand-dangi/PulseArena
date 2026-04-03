import React, { useState } from "react";
import axios from "axios";
import jscookie from "js-cookie";
import { requestedOrganizerURL } from "../utils";

function OrganizerCreateTournament() {
  const [formData, setFormData] = useState({
    tournamentName: "",
    gameTitle: "",
    gameCategory: "",
    eventType: "sports",
    description: "",
    venue: "",
    tournamentDate: "",
    reportingTime: "",
    maxParticipants: "",
    organizerContact: "",
    tournamentPoster: null,
  });

  const [posterPreview, setPosterPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];

      setFormData({
        ...formData,
        [name]: file,
      });

      if (file) {
        setPosterPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const token = jscookie.get("organizerTokenData");
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      data.set("maxParticipants", Number(formData.maxParticipants));

      const res = await axios.post(
        requestedOrganizerURL + "/createTournament",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);

      setFormData({
        tournamentName: "",
        gameTitle: "",
        gameCategory: "",
        eventType: "sports",
        description: "",
        venue: "",
        tournamentDate: "",
        reportingTime: "",
        maxParticipants: "",
        organizerContact: "",
        tournamentPoster: null,
      });

      setPosterPreview("");
    } catch (error) {
      console.log("Create Tournament Error:", error.response?.data || error);
      alert("Error creating event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="organizer-form-page">
      <section className="organizer-form-hero">
        <div>
          <p className="organizer-hero-badge">Create Tournament</p>
          <h1>Create a premium event experience</h1>
          <p>
            Fill in the details below to publish a clean, professional-looking
            tournament for participants.
          </p>
        </div>
      </section>

      <div className="organizer-form-layout">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="organizer-event-form"
        >
          <div className="form-section-title">
            <h2>Event Details</h2>
            <p>Enter the core information about your tournament</p>
          </div>

          <div className="organizer-form-grid">
            <div className="form-group">
              <label>Event Name</label>
              <input
                type="text"
                name="tournamentName"
                placeholder="Ex: Inter College BGMI Championship"
                value={formData.tournamentName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Event Title</label>
              <input
                type="text"
                name="gameTitle"
                placeholder="Ex: BGMI / Valorant / Cricket / Coding Contest"
                value={formData.gameTitle}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Event Type</label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
              >
                <option value="sports">Sports</option>
                <option value="esports">eSports</option>
                <option value="technical">Technical</option>
                <option value="cultural">Cultural</option>
                <option value="workshop">Workshop</option>
                <option value="fest">College Fest</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="gameCategory"
                placeholder="Ex: Action / Indoor / Coding / Football"
                value={formData.gameCategory}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Event Description</label>
              <textarea
                name="description"
                placeholder="Describe your event, rules, highlights, eligibility, and expectations..."
                value={formData.description}
                onChange={handleChange}
                rows="5"
              />
            </div>

            <div className="form-group">
              <label>Venue</label>
              <input
                type="text"
                name="venue"
                placeholder="Ex: IPS Academy, Indore"
                value={formData.venue}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Event Date</label>
              <input
                type="date"
                name="tournamentDate"
                value={formData.tournamentDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Reporting Time</label>
              <input
                type="time"
                name="reportingTime"
                value={formData.reportingTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Max Participants</label>
              <input
                type="number"
                name="maxParticipants"
                placeholder="Ex: 100"
                value={formData.maxParticipants}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Organizer Contact</label>
              <input
                type="text"
                name="organizerContact"
                placeholder="Ex: 9876543210"
                value={formData.organizerContact}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Event Poster</label>
              <div className="poster-upload-box">
                <input
                  type="file"
                  name="tournamentPoster"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
                <small>Upload a clean poster/banner for your event</small>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="organizer-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Event..." : "Create Event"}
          </button>
        </form>

        <div className="organizer-preview-panel">
          <div className="preview-card">
            <p className="preview-badge">Live Preview</p>

            <div className="preview-image-wrapper">
              {posterPreview ? (
                <img src={posterPreview} alt="Poster Preview" />
              ) : (
                <div className="preview-placeholder">
                  <span>Poster Preview</span>
                </div>
              )}
            </div>

            <div className="preview-content">
              <h3>{formData.tournamentName || "Your Event Name"}</h3>
              <p>{formData.gameTitle || "Your event title will appear here"}</p>

              <div className="preview-tags">
                <span>{formData.eventType || "sports"}</span>
                <span>{formData.gameCategory || "category"}</span>
              </div>

              <div className="preview-meta">
                <p>📍 {formData.venue || "Venue not added yet"}</p>
                <p>📅 {formData.tournamentDate || "Date not selected"}</p>
                <p>🕒 {formData.reportingTime || "Time not selected"}</p>
                <p>👥 {formData.maxParticipants || "0"} Participants</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizerCreateTournament;