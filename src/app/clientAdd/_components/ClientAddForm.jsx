'use client'
import React, { useState } from "react"
import { useToast } from "@/src/hooks/use-toast";
import { ToastProvider } from "@/src/components/ui/toast";
import { Toaster } from "@/src/components/ui/toaster";
import { ClientAdd } from "../_actions/handler";

const ClientAddForm = (props) => {
    const [loading,setLoading] = useState(false)
    const [formData, setFormData] = useState({
                customerName: '',
                phoneNumber: '',
                address: '',
            });
        
            const [errors, setErrors] = useState({
                customerName: '',
                phoneNumber: '',
                address: '',
            });
        
            const handleInputChange = (e) => {
                const { name, value } = e.target;
                setFormData({
                    ...formData,
                    [name]: value,
                });
            };

            const {toast} = useToast();
        
            const handleSubmit = async(e) => {
                setLoading(true)
                e.preventDefault();
                const newErrors = {};

        
                // Validation
                if (!formData.customerName) newErrors.customerName = 'Customer Name is required';
                // if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
                //     newErrors.phoneNumber = 'Phone number is required and should be 10 digits';
                // }
                // if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
                //     newErrors.amount = 'Amount must be a valid number greater than 0';
                // }
                if (!formData.address) newErrors.address = 'Address Method is required';
        
                if (Object.keys(newErrors).length === 0) {
                    // Submit the form if no errors
                    try {
                        const dataObj = {
                            name: formData.customerName,
                            number: formData.phoneNumber,
                            address: formData.address,
                        };
                    
                        const response = await ClientAdd(dataObj);
                        
                        if (response.status === 201) {
                            setLoading(false); 
                            toast({
                                variant: 'success',
                                description: 'Client added successfully!',
                            });
                            setFormData({
                                customerName: "",
                                phoneNumber: "",
                                amount: "",
                                address: "",
                                note: "",
                            });
                        } else {
                            setLoading(false);
                            console.error("Submission failed:", response.message);
                            toast({
                                variant: 'destructive',
                                description: `Client Add Failed!. Please try again! ${response.message}`,
                            });
                        }
                    } catch (error) {
                        setLoading(false);
                        console.error("Submission failed:", error.message); // Ensure it's error.message
                        toast({
                            variant: 'destructive',
                            description: `Client Add Failed!. Please try again! ${error.message}`, // Use error.message for proper detail
                        });
                    }
                }
            };
        

            

  return (
    <ToastProvider>
        <Toaster />
      <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Client Add Form</h2>
            <form onSubmit={handleSubmit}>
                {/* Customer Name */}
                <div className="mb-4">
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
                    <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter Customer Name"
                    />
                    {errors.customerName && <div className="text-red-500 text-xs mt-1">{errors.customerName}</div>}
                </div>
                

                {/* phone number */}
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="number"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter Phone Number"
                    />
                    {errors.phoneNumber && <div className="text-red-500 text-xs mt-1">{errors.phoneNumber}</div>}
                </div>
                {/* address */}
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter Address"
                    />
                    {errors.address && <div className="text-red-500 text-xs mt-1">{errors.address}</div>}
                </div>

            {
                loading ? (
                <button disabled={loading} type="submit" className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Loading...</button>
                ):(
                    <button type="submit" className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Submit</button>
                )
            }
            </form>
  
        </div>
    </ToastProvider>
  )
};

export default ClientAddForm;
