import { useState, useEffect } from "react";
import {
  customerListView,
  customerCreate,
  customerDetailViewPut,
  customerDetailViewDelete,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import { PencilIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "../components/Button";
import CustomerForm from "../components/CustomerForm";

function CustomerPage() {
  const [customers, setCustomers] = useState<any>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editCustomer, setEditCustomer] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const data = await customerListView();
    setCustomers(data);
  };

  const handleAddCustomer = async (newCustomer: any) => {
    const data = await customerCreate(newCustomer);
    setCustomers([...customers, data]);
    setIsAdding(false);
  };

  const handleEditCustomer = async (customer: any) => {
    await customerDetailViewPut(customer);
    fetchCustomers();
    setIsEditing(false);
  };

  const handleDeleteCustomer = async (customerId: number) => {
    await customerDetailViewDelete({ pk: customerId });
    setCustomers(
      customers.filter((customer: any) => customer.id !== customerId)
    );
  };

  const handleViewCustomer = (customerId: number) => {
    navigate(`/customers/${customerId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-medium mb-4 m-2 font-epilogue">Customers</h1>
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
                Address
              </th>
              <th className="py-2 px-4 border-b font-medium font-epilogue">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer: any) => (
              <tr key={customer.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-r font-manrope">
                  {customer.name}
                </td>
                <td className="py-2 px-4 border-b border-r font-manrope">
                  {customer.email}
                </td>
                <td className="py-2 px-4 border-b border-r font-manrope">
                  {customer.phone}
                </td>
                <td className="py-2 px-4 border-b border-r font-manrope">
                  {customer.address}
                </td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <PencilIcon
                    className="h-5 w-5 text-black hover:text-gray-700 cursor-pointer"
                    onClick={() => {
                      setIsEditing(true);
                      setEditCustomer(customer);
                    }}
                  />
                  <TrashIcon
                    className="h-5 w-5 text-black hover:text-gray-700 cursor-pointer"
                    onClick={() => handleDeleteCustomer(customer.id)}
                  />
                  <EyeIcon
                    className="h-5 w-5 text-black hover:text-gray-700 cursor-pointer"
                    onClick={() => handleViewCustomer(customer.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditing && (
        <CustomerForm
          customer={editCustomer}
          onSubmit={handleEditCustomer}
          onClose={() => setIsEditing(false)}
        />
      )}
      {isAdding && (
        <CustomerForm
          onSubmit={handleAddCustomer}
          onClose={() => setIsAdding(false)}
        />
      )}
    </div>
  );
}


export default CustomerPage;
