// CustomerDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customerDetailViewGet } from "../services/api";
import Button from "../components/Button";

type CustomerType = {
  id?: number;
  name: string;
  email: string;
  phone: string | number;
  address?: string;
};

function CustomerView() {
  const { customerId } = useParams<{ customerId: string }>();
  const [customer, setCustomer] = useState<CustomerType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await customerDetailViewGet({ id: Number(customerId) });
        setCustomer(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load customer details.");
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  function handleGoBack() {
    window.history.back();
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="p-6 bg-white font-manrope">
        <h1 className="text-2xl font-medium mb-4 font-epilogue">
          Customer Details
        </h1>
        {customer ? (
          <div className="space-y-2">
            <div>
              <strong>ID:</strong> {customer.id}
            </div>
            <div>
              <strong>Name:</strong> {customer.name}
            </div>
            <div>
              <strong>Email:</strong> {customer.email}
            </div>
            <div>
              <strong>Phone:</strong> {customer.phone}
            </div>
            <div>
              <strong>Address:</strong> {customer.address}
            </div>
          </div>
        ) : (
          <p>No customer found.</p>
        )}
      </div>
      <Button onClick={handleGoBack} type="button" className="ml-6 mt-0">
        Return
      </Button>
    </>
  );
}

export default CustomerView;
