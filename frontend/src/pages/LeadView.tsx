// leadDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { leadDetailViewGet } from "../services/api"; 

function LeadView() {

  type leadType = {
    id?: number;
    lead?: number;
    customer?: number;
    name: string;
    email: string;
    phone: string | number;
    status: string;
  };
  
  const { leadId } = useParams<{ leadId: string }>();
  const [lead, setLead] = useState<leadType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const data = await leadDetailViewGet({ id: Number(leadId) });
        setLead(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load lead details.");
        setLoading(false);
      }
    };

    fetchLead();
  }, [leadId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>lead Details</h1>
      {lead ? (
        <div>
          <p>ID: {lead.id}</p>
          <p>Type: {lead.name}</p>
          <p>Email: {lead.email}</p>
          <p>Phone: {lead.phone}</p>
        </div>
      ) : (
        <p>No lead found.</p>
      )}
    </div>
  );
};

export default LeadView;
