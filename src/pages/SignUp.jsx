export default function SignUp() {
  return (
    <div className="flex items-center justify-center py-20 bg-slate-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="mt-6 w-full px-4 py-3 border rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          className="mt-4 w-full px-4 py-3 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          className="mt-4 w-full px-4 py-3 border rounded-lg"
        />

        <button className="mt-6 w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition">
          Sign Up
        </button>
      </div>
    </div>
  );
}