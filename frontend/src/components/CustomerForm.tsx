import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

type CustomerFormType = {
  customer?: any;
  onSubmit: (customer: any) => void;
  onClose: () => void;
};

function CustomerForm({ customer = {}, onSubmit, onClose }: CustomerFormType) {
  const [form, setForm] = useState({
    id: customer?.id || "",
    name: customer.name || "",
    email: customer.email || "",
    phone: customer.phone || "",
    address: customer.address || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...form, pk: customer.id });
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="mt-4 p-4 bg-white rounded-lg w-3/4 md:w-1/2 lg:w-1/3"
      >
        <div className="mb-4">
          <label className="block mb-1 font-medium font-epilogue">Name</label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Customer Name"
            className="w-full m-0"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium font-epilogue">Email</label>
          <Input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Customer Email"
            className="w-full m-0"
            type="email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium font-epilogue">Phone</label>
          <Input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Customer Phone"
            className="w-full m-0"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium font-epilogue">Address</label>
          <Input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Customer Address"
            className="w-full m-0"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="submit" className="bg-blue-500 text-white">
            {customer.id ? "Update" : "Add"}
          </Button>
          {onClose && (
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CustomerForm;
