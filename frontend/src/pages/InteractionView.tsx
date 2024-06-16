import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  interactionDetailViewGet,
  customerListView,
  leadListView,
} from "../services/api";
import Button from "../components/Button";

type InteractionType = {
  id?: number;
  interaction_type: "phone" | "email" | "social_media" | "in_person";
  lead?: number;
  customer?: number;
  notes: string;
  date: string;
};

function InteractionView() {
  const { interactionId } = useParams<{ interactionId: string }>();
  const [interaction, setInteraction] = useState<InteractionType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [customers, setCustomers] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [interactionData, customersData, leadsData] = await Promise.all([
          interactionDetailViewGet({ id: Number(interactionId) }),
          customerListView(),
          leadListView(),
        ]);
        setInteraction(interactionData);
        setCustomers(customersData);
        setLeads(leadsData);
        setLoading(false);
      } catch (error) {
        setError("Failed to load interaction details.");
        setLoading(false);
      }
    };

    fetchData();
  }, [interactionId]);

  const resolveName = (id: number | undefined, type: "customer" | "lead") => {
    if (type === "customer") {
      const customer = customers.find((customer) => customer.id === id);
      return customer ? customer.name : "Unknown Customer";
    } else {
      const lead = leads.find((lead) => lead.id === id);
      return lead ? lead.name : "Unknown Lead";
    }
  };

  const getInteractionTypeLabel = (type: string) => {
    switch (type) {
      case "email":
        return "Email";
      case "phone":
        return "Phone Call";
      case "social_media":
        return "Social Media";
      case "in_person":
        return "In Person Meeting";
      default:
        return type;
    }
  };

  function handleGoBack() {
    window.history.back();
  }


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="p-6 bg-white rounded">
        <h1 className="text-2xl font-medium mb-4 font-epilogue">
          Interaction Details
        </h1>
        {interaction ? (
          <div className="space-y-2 font-manrope">
            <div>
              <strong>ID:</strong> {interaction.id}
            </div>
            <div>
              <strong>Type:</strong>{" "}
              {getInteractionTypeLabel(interaction.interaction_type)}
            </div>
            <div>
              <strong>Notes:</strong> {interaction.notes}
            </div>
            <div>
              <strong>Date:</strong>{" "}
              {new Date(interaction.date).toLocaleDateString()}
            </div>
            <div>
              <strong>Client: </strong>
              {interaction.customer
                ? resolveName(interaction.customer, "customer")
                : resolveName(interaction.lead, "lead")}
            </div>
          </div>
        ) : (
          <p>No interaction found.</p>
        )}
      </div>
      <Button onClick={handleGoBack} type="button" className="ml-6 mt-0">
        Return
      </Button>
    </>
  );
}

export default InteractionView;
