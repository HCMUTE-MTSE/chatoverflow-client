export default function RegisterForm() {
   return (
      <form className="space-y-4">
         <label htmlFor="username" className="block text-sm text-gray-400 mb-1">
            Username
         </label>
         <input
            type="text"
            placeholder="yourusername"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
         />

         <label htmlFor="nickname" className="block text-sm text-gray-400 mb-1">
            Nickname
         </label>
         <input
            type="text"
            placeholder="nickname"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
         />

         <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
            Email address
         </label>
         <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
         />

         <label htmlFor="password" className="block text-sm text-gray-400 mb-1">
            Password
         </label>
         <input
            type="password"
            placeholder="yourpassword"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
         />

         <button
            type="submit"
            className="w-full py-2 mt-4 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition font-semibold"
         >
            <p className="text-center text-sm">Continute</p>
         </button>
      </form>
   );
}
