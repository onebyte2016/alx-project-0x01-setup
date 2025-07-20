// // pages/users/index.tsx
// import { GetStaticProps } from "next";
// import { useState } from "react";
// import Header from "@/components/layout/Header";
// import UserCard from "@/components/common/UserCard";
// import UserModal from "@/components/common/UserModal";
// import { UserData } from "@/interfaces";

// const Users: React.FC<UsersPageProps> = ({ posts }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [users, setUsers] = useState<UserProps[]>(posts);
  
//     const handleAddUser = (newUser: UserProps) => {
//       setUsers([newUser, ...users]);
//     };
  
//     return (
//       <div className="flex flex-col h-screen">
//         <Header />
//         <main className="p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-2xl font-semibold">User Directory</h1>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Add User
//             </button>
//           </div>
  
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {users.map((user) => (
//               <UserCard key={user.id} {...user} />
//             ))}
//           </div>
//         </main>
  
//         {/* User Modal */}
//         <UserModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onAddUser={handleAddUser}
//         />
//       </div>
//     );
//   };
  




// pages/users/index.tsx

// import React from "react";
// import Header from "@/components/layout/Header";
// import UserCard from "@/components/common/UserCard";
// import { UserProps } from "@/interfaces";

// interface UsersPageProps {
//   posts: UserProps[];
// }

// const Users: React.FC<UsersPageProps> = ({ posts }) => {
//   return (
//     <div className="flex flex-col h-screen">
//       <Header />
//       <main className="p-4">
//         <h1 className="text-2xl font-semibold mb-4">User Directory</h1>
//         <div className="grid grid-cols-3 gap-4">
//           {posts?.map((user) => (
//             <UserCard key={user.id} {...user} />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export async function getStaticProps() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   const posts = await response.json();

//   return {
//     props: {
//       posts,
//     },
//   };
// }

// export default Users;

import React, { useState } from 'react';
import Header from "@/components/layout/Header";
import UserCard from '@/components/common/UserCard';
import UserModal from '@/components/common/UserModal';
import { UserData } from '@/interfaces';

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = (newUser: UserData) => {
    setUsers(prev => [...prev, newUser]);
  };

  return (
    <div className="p-4">
      <Header />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Users</h1>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add User</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map(user => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>

      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddUser={handleAddUser} />
    </div>
  );
};

export default Users;
