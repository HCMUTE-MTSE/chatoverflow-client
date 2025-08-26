export default function EmailLoginForm() {
   return (
      <form className="space-y-4">
         <div>
            <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
               Email address
            </label>
            <input
               id="email"
               type="email"
               placeholder="you@example.com"
               className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
         </div>
         <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition font-semibold"
         >
            CONTINUE
         </button>
      </form>
   );
}
