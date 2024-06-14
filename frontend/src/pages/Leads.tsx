import { useState, useEffect } from "react";
import {
  leadListView,
  leadCreate,
  leadDetailViewPut,
  leadDetailViewDelete,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import { PencilIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "../components/Button";
import LeadForm from "../components/LeadForm";

function Leads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editLead, setEditLead] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const data = await leadListView();
    setLeads(data);
  };

  const handleAddLead = async (newLead: any) => {
    const data = await leadCreate(newLead);
    setLeads([...leads, data]);
    setIsAdding(false);
  };

  const handleEditLead = async (lead: any) => {
    await leadDetailViewPut(lead);
    fetchLeads();
    setIsEditing(false);
  };

  const handleDeleteLead = async (leadId: number) => {
    await leadDetailViewDelete({ id: leadId });
    setLeads(leads.filter((lead) => lead.id !== leadId));
    fetchLeads();
  };

  const handleViewLead = (leadId: number) => {
    navigate(`/leads/${leadId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-medium mb-4 m-2 font-epilogue">Leads</h1>
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
                Name
              </th>
              <th className="py-2 px-4 border-b border-r font-medium font-epilogue">
                Email
              </th>
              <th className="py-2 px-4 border-b border-r font-medium font-epilogue">
                Phone
              </th>
              <th className="py-2 px-4 border-b border-r font-medium font-epilogue">
                Status
              </th>
              <th className="py-2 px-4 border-b font-medium font-epilogue">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-r font-manrope">
                  {lead.name}
                </td>
                <td className="py-2 px-4 border-b border-r font-manrope">
                  {lead.email}
                </td>
                <td className="py-2 px-4 border-b border-r font-manrope">
                  {lead.phone}
                </td>
                <td className="py-2 px-4 border-b border-r font-manrope">
                  {lead.status}
                </td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <PencilIcon
                    className="h-5 w-5 text-black hover:text-gray-700 cursor-pointer"
                    onClick={() => {
                      setIsEditing(true);
                      setEditLead(lead);
                    }}
                  />
                  <TrashIcon
                    className="h-5 w-5 text-black hover:text-gray-700 cursor-pointer"
                    onClick={() => handleDeleteLead(lead.id)}
                  />
                  <EyeIcon
                    className="h-5 w-5 text-black hover:text-gray-700 cursor-pointer"
                    onClick={() => handleViewLead(lead.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditing && (
        <LeadForm
          lead={editLead}
          onSubmit={handleEditLead}
          onClose={() => setIsEditing(false)}
        />
      )}
      {isAdding && (
        <LeadForm onSubmit={handleAddLead} onClose={() => setIsAdding(false)} />
      )}
    </div>
  );
}

export default Leads;
