"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/src/lib/api";

export default function CreateCompany() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createCompany = async () => {
    await api.post("/companies", { name });
    router.push("/dashboard");
  };

  return (
    <div className="p-10">
      <input
        type="text"
        placeholder="Company name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2"
      />

      <button onClick={createCompany} className="ml-3 bg-blue-500 text-white p-2">
        Create
      </button>
    </div>
  );
}

// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import api from "@/src/lib/api";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function CreateCompany() {

//   const router = useRouter();

//   const [name, setName] = useState("");

//   const createCompany = async () => {

//     if (!name) {
//       alert("Enter company name");
//       return;
//     }

//     try {

//       await api.post("/companies", {
//         name: name,
//       });

//       router.push("/dashboard");

//     } catch (error) {
//       alert("Error creating company");
//     }
//   };

//   return (

//     <div className="flex h-screen justify-center items-center">

//       <div className="p-6 border rounded w-80 space-y-4">

//         <h2 className="text-xl font-bold">
//           Create Company
//         </h2>

//         <Input
//           placeholder="Company name"
//           value={name}
//           onChange={(e)=>setName(e.target.value)}
//         />

//         <Button
//           onClick={createCompany}
//           className="w-full"
//         >
//           Create
//         </Button>

//       </div>

//     </div>
//   );
// }