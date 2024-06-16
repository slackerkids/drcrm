import { useState, useEffect } from "react";
import {
  interactionListView,
  interactionCreate,
  interactionDetailViewPut,
  interactionDetailViewDelete,
  customerListView,
  leadListView,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import { PencilIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "../components/Button";
import InteractionForm from "../components/InteractionForm";

function Interactions() {
  const [interactions, setInteractions] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editInteraction, setEditInteraction] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const customersData = await customerListView();
      const leadsData = await leadListView();
      setCustomers(customersData);
      setLeads(leadsData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    fetchInteractions();
  }, []);

  const fetchInteractions = async () => {
    const data = await interactionListView();
    setInteractions(data);
  };

  function resolveNameLead(id: number) {
    const lead = leads.find((lead) => lead.id === id);
    if (lead) {
      return lead.name;
    }

    return "Unknown";
  }

  function resolveNameCustomer(id: number) {
    const customer = customers.find((customer) => customer.id === id);
    if (customer) {
      return customer.name;
    }

    return "Unknown"
  }

  const handleAddInteraction = async (newInteraction: any) => {
    const clientIdNumber = parseInt(newInteraction.client_id, 10);

    const payload: any = {
      [newInteraction.client_type]: clientIdNumber,
      interaction_type: newInteraction.interaction_type,
      notes: newInteraction.notes,
      date: newInteraction.date,
    };

    const data = await interactionCreate({ payload });
    setInteractions([...interactions, data]);
    setIsAdding(false);
  };

  const handleEditInteraction = async (interaction: any) => {
    await interactionDetailViewPut(interaction);
    fetchInteractions();
    setIsEditing(false);
  };

  const handleDeleteInteraction = async (interactionId: number) => {
    await interactionDetailViewDelete({ id: interactionId });
    setInteractions(
      interactions.filter((interaction) => interaction.id !== interactionId)
    );
    fetchInteractions();
  };

  const handleViewInteraction = (interactionId: number) => {
    navigate(`/interactions/${interactionId}`);
  };

  function getInteractionTypeLabel(type: string) {
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
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-medium mb-4 m-2 font-epilogue">
        Interactions
      </h1>
      <div className="flex justify-end mb-4">
        <Button type="button" onClick={() => setIsAdding(true)}>
          Add +
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-r font-medium font-epilogue">
                Client
              </th>
              <th className="py-2 px-4 border-b border-r font-medium font-epilogue">
                Interaction Type
              </th>
              <th className="py-2 px-4 border-b border-r font-medium font-epilogue">
                Notes
              </th>
              <th className="py-2 px-4 border-b border-r font-medium font-epilogue">
                Date
              </th>
              <th className="py-2 px-4 border-b font-medium font-epilogue">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {interactions.map((interaction) => (
              <tr key={interaction.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-r font-manrope">
                  {interaction.lead && (
                    <span>{resolveNameLead(interaction.lead)}</span>
                  )}
                  {interaction.customer && (
                    <span>{resolveNameCustomer(interaction.customer)}</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-r font-manrope">
                  {getInteractionTypeLabel(interaction.interaction_type)}
                </td>
                <td className="py-2 px-4 border-b border-r font-manrope">
                  {interaction.notes}
                </td>

                <td className="py-2 px-4 border-b border-r font-manrope">
                  {formatDate(interaction.date)}
                </td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <PencilIcon
                    className="h-5 w-5 text-black hover:text-gray-700 cursor-pointer"
                    onClick={() => {
                      setIsEditing(true);
                      setEditInteraction(interaction);
                    }}
                  />
                  <TrashIcon
                    className="h-5 w-5 text-black hover:text-gray-700 cursor-pointer"
                    onClick={() => handleDeleteInteraction(interaction.id)}
                  />
                  <EyeIcon
                    className="h-5 w-5 text-black hover:text-gray-700 cursor-pointer"
                    onClick={() => handleViewInteraction(interaction.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditing && (
        <InteractionForm
          interaction={editInteraction}
          onSubmit={handleEditInteraction}
          onClose={() => setIsEditing(false)}
        />
      )}
      {isAdding && (
        <InteractionForm
          onSubmit={handleAddInteraction}
          onClose={() => setIsAdding(false)}
        />
      )}
    </div>
  );
}

export default Interactions;
