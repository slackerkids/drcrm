import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

type LeadFormProps = {
  lead?: any;
  onSubmit: (lead: any) => void;
  onClose: () => void;
};

function LeadForm({ lead, onSubmit, onClose }: LeadFormProps) {
  const [formData, setFormData] = useState({
    id: lead?.id || "",
    name: lead?.name || "",
    email: lead?.email || "",
    phone: lead?.phone || "",
    status: lead?.status || "",
  });

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
          {lead ? "Edit Lead" : "Add Lead"}
        </h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium font-epilogue">Name</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Lead Name"
            className="w-full m-0"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium font-epilogue">Email</label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Lead Email"
            className="w-full m-0"
            type="email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium font-epilogue">Phone</label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Lead Phone"
            className="w-full m-0"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium font-epilogue">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="appearance-none border border-slate-200 text-gray-500 rounded-md block p-2 font-manrope text-[16px] w-full m-2"
            required
          >
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="unqualified">Unqualified</option>
          </select>
        </div>

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

export default LeadForm;
