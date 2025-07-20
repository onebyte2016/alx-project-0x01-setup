import React from 'react'
import {UserProps} from "@/interfaces";

const UserCard: React.FC<UserProps> = ({name, email,username, phone, website, company, address}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all border">
      <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-600">@{username}</p>
      <p className="text-sm text-gray-700 mt-2">{email}</p>
      <p className="text-sm text-gray-700"> {phone}</p>
      <p className="text-sm text-blue-600 underline">{website}</p>

      <div className="mt-3">
      {company ? (
        <div className="mt-3">
          <h3 className="font-semibold text-gray-700">{company.name}</h3>
          <p className="text-xs text-gray-600 italic">"{company.catchPhrase}"</p>
        </div>
      ) : (
        <div className="mt-3 text-sm text-red-500">Company info not available</div>
      )}
      </div>

      {address && (
        <div className="mt-2 text-xs text-gray-600">
          {address.suite}, {address.street}, {address.city}, {address.zipcode}
        </div>
      )}
    </div>
  )
}

export default UserCard