import { useState, useEffect } from "react";
import {
  interactionListView,
  interactionCreate,
  interactionDetailViewPut,
  interactionDetailViewDelete,
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

  useEffect(() => {
    fetchInteractions();
  }, []);

  const fetchInteractions = async () => {
    const data = await interactionListView();
    setInteractions(data);
  };

  const handleAddInteraction = async (newInteraction: any) => {
    const data = await interactionCreate(newInteraction);
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
                Interaction Type
              </th>
              <th className="py-2 px-4 border-b border-r font-medium font-epilogue">
                Notes
              </th>
              <th className="py-2 px-4 border-b border-r font-medium font-epilogue">
                Date
              </th>
              <th className="py-2 px-4 border-b border-r font-medium font-epilogue">
                Client Type
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
                  {interaction.interaction_type}
                </td>
                <td className="py-2 px-4 border-b border-r font-manrope">
                  {interaction.notes}
                </td>
                <td className="py-2 px-4 border-b border-r font-manrope">
                  {interaction.date}
                </td>
                <td className="py-2 px-4 border-b border-r font-manrope">
                  {interaction.client_type}
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
