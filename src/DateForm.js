import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DateForm() {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        email: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                toast.success('Заявка успішно відправлена!');
            } else {
                toast.error('Помилка сервера: ' + response.statusText);
            }
        } catch (error) {
            toast.error('Мережева помилка');
        }
    };

    return (
        <>
            <ToastContainer />
        <form onSubmit={handleSubmit}>
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
            />
            <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={"email"}
            />
            <button type="submit">Відправити заявку</button>
        </form>

        </>
    );
}

export default DateForm;
