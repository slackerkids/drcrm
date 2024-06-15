import { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import { customerListView, leadListView } from "../services/api";

type InteractionFormProps = {
  interaction?: any;
  onSubmit: (interaction: any) => void;
  onClose: () => void;
};

function InteractionForm({
  interaction,
  onSubmit,
  onClose,
}: InteractionFormProps) {
  const [formData, setFormData] = useState({
    id: interaction?.id || "",
    interaction_type: interaction?.interaction_type || "",
    notes: interaction?.notes || "",
    date: interaction?.date || "",
    client_type: interaction?.client_type || "",
    client_id: interaction?.client_id || "",
  });

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

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="mt-4 p-4 bg-slate-100 rounded-lg w-3/4 md:w-1/2 lg:w-1/3"
      >
        <h2 className="text-xl font-medium mb-4">
          {interaction ? "Edit Interaction" : "Add Interaction"}
        </h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium font-epilogue">
            Interaction Type
          </label>
          <select
            name="interaction_type"
            value={formData.interaction_type}
            onChange={handleChange}
            className="appearance-none border border-slate-200 text-gray-500 rounded-md block p-2 font-manrope text-[16px] w-full m-0"
            required
          >
            <option value="email">Email</option>
            <option value="phone">Phone Call</option>
            <option value="social_media">Social Media</option>
            <option value="in_person">In Person Meeting</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium font-epilogue">Notes</label>
          <Input
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="w-full m-0"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium font-epilogue">Date</label>
          <Input
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Date"
            className="w-full m-0"
            type="date"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium font-epilogue">
            Client Type
          </label>
          <select
            name="client_type"
            value={formData.client_type}
            onChange={handleChange}
            className="appearance-none border border-slate-200 text-gray-500 rounded-md block p-2 font-manrope text-[16px] w-full m-0"
            required
          >
            <option value="">Select Client Type</option>
            <option value="lead">Lead</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        {formData.client_type && (
          <div className="mb-4">
            <label className="block mb-1 font-medium font-epilogue">
              {formData.client_type.charAt(0).toUpperCase() +
                formData.client_type.slice(1)}
            </label>
            <select
              name="client_id"
              value={formData.client_id}
              onChange={handleChange}
              className="appearance-none border border-slate-200 text-gray-500 rounded-md block p-2 font-manrope text-[16px] w-full m-0"
              required
            >
              <option value="">Select {formData.client_type}</option>
              {(formData.client_type === "lead" ? leads : customers).map(
                (client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                )
              )}
            </select>
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white"
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-500 text-white">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default InteractionForm;
