import React from "react";
import "./UserListModal.css";

function UserListModal({ users, onClose }) {
  return (
    <div className="modalOverlay">
      <div className="modalBox">
        <h2>Participants List</h2>

        {users.length === 0 ? (
          <p className="emptyText">No users found</p>
        ) : (
          <table className="userTable">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button className="closeBtn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default UserListModal;