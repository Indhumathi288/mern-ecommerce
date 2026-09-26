import Header from "../components/Header";
import { useState, useEffect } from "react";
import { FiUser, FiEdit2, FiSave } from "react-icons/fi";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setPhone(storedUser.phone || "");
      setAddress(storedUser.address || "");
    }
  }, []);

  const saveProfile = () => {
    const updatedUser = {
      ...user,
      phone,
      address,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditing(false);
  };

  if (!user) return null;

  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

        <div className="bg-white rounded shadow p-6 grid md:grid-cols-3 gap-6 items-center">

          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="h-28 w-28 rounded-full bg-blue-100 flex items-center justify-center">
              <FiUser size={50} className="text-blue-600" />
            </div>

            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center gap-1 text-blue-600 text-sm"
            >
              <FiEdit2 /> {editing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Details */}
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">

            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              {editing ? (
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="border p-2 rounded w-full"
                />
              ) : (
                <p className="font-medium">
                  {user.phone || "Not added"}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Address</p>
              {editing ? (
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address"
                  rows="2"
                  className="border p-2 rounded w-full"
                />
              ) : (
                <p className="font-medium">
                  {user.address || "Not added"}
                </p>
              )}
            </div>

            {editing && (
              <div className="sm:col-span-2">
                <button
                  onClick={saveProfile}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"
                >
                  <FiSave /> Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
