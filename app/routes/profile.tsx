import * as React from "react";

export default function Profile() {
  const [sub, setSub] = React.useState<string | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        setSub(decoded.sub || null);
      } catch (e) {
        console.error("Invalid token", e);
      }
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Profile Page</h1>
      {sub ? <p>User ID: {sub}</p> : <p>No token found</p>}
    </div>
  );
}
