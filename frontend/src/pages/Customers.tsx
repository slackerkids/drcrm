import { useState, useEffect } from "react";
import { customerListView } from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await customerListView();
        setCustomers(data);
      } catch (error) {
        setError("Failed to load customers.");
      }
    };

    fetchCustomers();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {customers.length > 0 ? (
        <ul>
          {customers.map((customer, index) => (
            <li key={index}>
              <p>{customer.name}</p>
              <p>{customer.email}</p>
              <p>{customer.phone}</p>
              <p>{customer.address}</p>
              <br />
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Customers;
