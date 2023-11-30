import React, { useState, useEffect } from 'react';
import DateForm from './DateForm';

function AppointmentForm() {
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [showDateForm, setShowDateForm] = useState(false);

    useEffect(() => {
        // Тут виконайте запит до бекенду для отримання філій
        fetch('http://localhost:5000/api/branches')
            .then(response => response.json())
            .then(data => setBranches(data));
    }, []);

    const handleBranchChange = (event) => {
        setSelectedBranch(event.target.value);
        setShowDateForm(true);  // Показати DateForm після вибору філії
    };

    return (
        <div>
            <select value={selectedBranch} onChange={handleBranchChange}>
                <option value="">Виберіть філію</option>
                {branches.map(branch => (
                    <option key={branch.id} value={branch.id}>{branch.rendered}</option>
                ))}
            </select>

            {showDateForm && <DateForm branchId={selectedBranch} />}
        </div>
    );
}

export default AppointmentForm;