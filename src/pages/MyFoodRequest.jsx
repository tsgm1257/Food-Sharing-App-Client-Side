import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthProvider";

const MyFoodRequest = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `${import.meta.env.VITE_API_BASE_URL}/requests?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setRequests(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">My Food Requests</h2>

      {!Array.isArray(requests) || requests.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t requested any food yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Food</th>
                <th>Pickup</th>
                <th>Expire</th>
                <th>Donor</th>
                <th>Request Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(requests) &&
                requests.map((req) => (
                  <tr key={req._id}>
                    <td>
                      <img
                        src={req.food_image}
                        alt={req.food_name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td>{req.food_name}</td>
                    <td>{req.pickup_location}</td>
                    <td>{new Date(req.expired_at).toLocaleString()}</td>
                    <td>{req.donor_name}</td>
                    <td>{new Date(req.request_date).toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFoodRequest;
