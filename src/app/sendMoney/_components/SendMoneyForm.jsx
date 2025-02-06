'use client'

import { useEffect, useState } from 'react';
import { PatchClients } from '../../clientList/_actions/handler';
import { SendMoneyAdd } from '../_actions/handler';





const SendMoneyForm = (props) => {
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState();

    // clients fatching
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const clientsData = await PatchClients();
                if (clientsData.status === "ok") {
                    setClients(clientsData.data);
                }
            } catch (error) {
                console.error("Failed to fetch clients:", error);
            }
        };
        fetchClients();
        // Optional: Cleanup function if needed
        // return () => {
        //     // Cleanup logic here (e.g., canceling requests)
        // };
    }, []);


    const [formData, setFormData] = useState({
        customerName: '',
        phoneNumber: '',
        amount: '',
        paymentMethod: '',
        note: '',
    });

    const [errors, setErrors] = useState({
        customerName: '',
        phoneNumber: '',
        amount: '',
        paymentMethod: '',
        note: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const newErrors = {};

        // Validation
        if (!formData.customerName) newErrors.customerName = 'Customer Name is required';
        if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number is required and should be 10 digits';
        }
        if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
            newErrors.amount = 'Amount must be a valid number greater than 0';
        }
        if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment Method is required';
        // if (!formData.note) newErrors.note = 'Note is required';

        if (Object.keys(newErrors).length === 0) {
            // Submit the form if no errors
            try {
                const dataObj = {
                    clientid: formData.customerName,
                    number: formData.phoneNumber,
                    amount: formData.amount,
                    method: formData.paymentMethod,
                    address: formData.address,
                    note: formData.note,

                }
                const response = await SendMoneyAdd(dataObj);
                if (response.status === 'ok') {
                    alert('Send Money Successfully Added!')
                }
                if (response.error) {
                } else {
                    setFormData({ customerName: "", phoneNumber: "", amount: "",paymentMethod: '', address: "", note: "" });
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error("Submission failed:");
            }
        } else {
            setErrors(newErrors);
            setLoading(false)
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Send Money Form</h2>
            <form onSubmit={handleSubmit}>
                {/* Customer Name */}
                <div className="mb-4">
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
                    <select
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select Client</option>
                        {
                            clients?.map(client => (
                                <option key={client.id} value={client.id} className='capitalize'>{client.fullname}</option>
                            ))
                        }
                    </select>
                    {errors.customerName && <div className="text-red-500 text-xs mt-1">{errors.customerName}</div>}
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="number"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        maxLength={10}
                        placeholder="Enter phone number"
                    />
                    {errors.phoneNumber && <div className="text-red-500 text-xs mt-1">{errors.phoneNumber}</div>}
                </div>

                {/* Amount */}
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter amount"
                    />
                    {errors.amount && <div className="text-red-500 text-xs mt-1">{errors.amount}</div>}
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
                    <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select Payment Method</option>
                        <option value="n">Nagad</option>
                        <option value="b">bKash</option>
                    </select>
                    {errors.paymentMethod && <div className="text-red-500 text-xs mt-1">{errors.paymentMethod}</div>}
                </div>

                {/* Note */}
                <div className="mb-4">
                    <label htmlFor="note" className="block text-sm font-medium text-gray-700">Note</label>
                    <textarea
                        id="note"
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Add a note"
                    />
                    {errors.note && <div className="text-red-500 text-xs mt-1">{errors.note}</div>}
                </div>
                {
                    loading ? <button disabled={loading} className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Loading...</button> : <button type="submit" className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Submit</button>
                }
            </form>
        </div>
    )
}

export default SendMoneyForm;


