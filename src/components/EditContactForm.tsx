// EditContactForm.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editContact } from '../redux/actions/contactActions';

interface EditContactFormProps {
    contact: {
        id: number;
        firstName: string;
        lastName: string;
        status: string;
    };
    onClose: () => void; // Callback function to close the edit form
}

const EditContactForm: React.FC<EditContactFormProps> = ({ contact, onClose }) => {
    const [editedContact, setEditedContact] = useState(contact);
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedContact(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedContact(prevState => ({
            ...prevState,
            status: e.target.value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(editContact(editedContact));
        onClose(); // Close the edit form after submitting
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
            <div className=' flex flex-col justify-center items-start px-10 mx-10 rounded bg-sky-400 p-5'>
                <label>
                    First Name:
                    <input type="text" className='p-2 m-3 rounded-lg border-2 border-sky-500' name="firstName" value={editedContact.firstName} onChange={handleChange} required />
                </label>
                <label>
                    Last Name:
                    <input type="text" className='p-2 m-3 rounded-lg border-2 border-sky-500' name="lastName" value={editedContact.lastName} onChange={handleChange} required />
                </label>
                <div className='flex'>
                    <label>
                        Status:
                        {/* <input type="text" name="status" value={editedContact.status} onChange={handleChange} /> */}
                    </label>
                    <div className='px-7 mx-5'>
                        <input type="radio" name="status" value="active" checked={editedContact.status === 'active'} onChange={handleStatusChange} /> Active
                        <input type="radio" name="status" value="inactive" checked={editedContact.status === 'inactive'} onChange={handleStatusChange} /> Inactive
                    </div>
                </div>

            </div>
            <button type="submit" className='px-10 p-4 m-5 bg-teal-500 rounded-lg'>Edit Contact</button>
        </form>
    );
};

export default EditContactForm;
