// // components/common/UserModal.tsx
// import React, { useState } from "react";
// import { UserData, UserModalProps } from "@/interfaces";

// const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onAddUser }) => {
//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     email: "",
//     phone: "",
//     website: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     const newUser: UserData = {
//       id: Math.floor(Math.random() * 10000),
//       name: form.name,
//       username: form.username,
//       email: form.email,
//       phone: form.phone,
//       website: form.website,
//       address: {
//         street: "",
//         suite: "",
//         city: "",
//         zipcode: "",
//         geo: { lat: "", lng: "" }
//       },
//       company: { name: "", catchPhrase: "", bs: "" }
//     };
//     onAddUser(newUser);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Add New User</h2>
//         {["name", "username", "email", "phone", "website"].map((field) => (
//           <input
//             key={field}
//             name={field}
//             value={(form as any)[field]}
//             onChange={handleChange}
//             placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//             className="w-full mb-3 p-2 border rounded"
//           />
//         ))}
//         <div className="flex justify-end space-x-2">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-400 rounded text-white">
//             Cancel
//           </button>
//           <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 rounded text-white">
//             Add User
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserModal;

import React, { useState } from 'react';
import { UserModalProps, UserData } from '@/interfaces';

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onAddUser }) => {
  const [formData, setFormData] = useState<UserData>({
    id: Date.now(),
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nestedKeys = name.split('.');

    // Handle nested address/company/geo
    if (nestedKeys.length > 1) {
      setFormData(prev => {
        const updated = { ...prev };
        nestedKeys.reduce((obj, key, idx) => {
          if (idx === nestedKeys.length - 1) obj[key] = value;
          else obj[key] = { ...obj[key] };
          return obj[key];
        }, updated);
        return updated;
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    onAddUser(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">Add New User</h2>

        <input className="input" placeholder="Name" name="name" onChange={handleChange} />
        <input className="input" placeholder="Username" name="username" onChange={handleChange} />
        <input className="input" placeholder="Email" name="email" onChange={handleChange} />
        <input className="input" placeholder="Phone" name="phone" onChange={handleChange} />
        <input className="input" placeholder="Website" name="website" onChange={handleChange} />

        {/* Address */}
        <input className="input" placeholder="Suite" name="address.suite" onChange={handleChange} />
        <input className="input" placeholder="Street" name="address.street" onChange={handleChange} />
        <input className="input" placeholder="City" name="address.city" onChange={handleChange} />
        <input className="input" placeholder="Zipcode" name="address.zipcode" onChange={handleChange} />
        <input className="input" placeholder="Geo Lat" name="address.geo.lat" onChange={handleChange} />
        <input className="input" placeholder="Geo Lng" name="address.geo.lng" onChange={handleChange} />

        {/* Company */}
        <input className="input" placeholder="Company Name" name="company.name" onChange={handleChange} />
        <input className="input" placeholder="Catch Phrase" name="company.catchPhrase" onChange={handleChange} />
        <input className="input" placeholder="BS" name="company.bs" onChange={handleChange} />

        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-400 text-white">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded bg-blue-600 text-white">Add</button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
