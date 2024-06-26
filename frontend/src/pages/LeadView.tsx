// LeadDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { leadDetailViewGet } from "../services/api";
import Button from "../components/Button";

type LeadType = {
  id?: number;
  name: string;
  email: string;
  phone: string | number;
  status: string;
};

function LeadView() {
  const { leadId } = useParams<{ leadId: string }>();
  const [lead, setLead] = useState<LeadType | null>(null);
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

  function handleGoBack() {
    window.history.back();
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="p-6 bg-white font-manrope">
        <h1 className="text-2xl font-medium mb-4 font-epilogue">
          Lead Details
        </h1>
        {lead ? (
          <div className="space-y-2">
            <div>
              <strong>ID:</strong> {lead.id}
            </div>
            <div>
              <strong>Name:</strong> {lead.name}
            </div>
            <div>
              <strong>Email:</strong> {lead.email}
            </div>
            <div>
              <strong>Phone:</strong> {lead.phone}
            </div>
            <div>
              <strong>Status:</strong> {lead.status}
            </div>
          </div>
        ) : (
          <p>No lead found.</p>
        )}
      </div>
      <Button onClick={handleGoBack} type="button" className="ml-6 mt-0">
        Return
      </Button>
    </>
  );
}

export default LeadView;
