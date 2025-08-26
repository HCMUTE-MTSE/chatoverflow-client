export default function AuthFooter() {
   return (
      <div className="flex flex-col items-center gap-2 text-sm text-gray-500">
         <p>
            No account?{' '}
            <a href="#" className="text-orange-500 hover:underline">
               Sign up
            </a>
         </p>
         <div className="flex gap-4">
            <a href="#" className="hover:underline">
               Help
            </a>
            <a href="#" className="hover:underline">
               Privacy
            </a>
            <a href="#" className="hover:underline">
               Terms
            </a>
         </div>
      </div>
   );
}
