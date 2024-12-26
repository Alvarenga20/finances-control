import React from 'react';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: any;
    onSave?: (updatedTransaction: any) => void;
    mode: 'view' | 'edit';
}

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, transaction, onSave, mode }) => {
    const [editedTransaction, setEditedTransaction] = React.useState(transaction);

    React.useEffect(() => {
        setEditedTransaction({
            id: transaction.id || '',
            amount: transaction.amount || 0,
            category: transaction.category || '',
            paymentMethod: transaction.paymentMethod || 'Credit Card',
            status: transaction.status || 'Pending',
        });
    }, [transaction, mode]);

    React.useEffect(() => {
        setEditedTransaction(transaction);
    }, [transaction, mode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedTransaction((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (onSave) onSave({ ...editedTransaction });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md w-full">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">{mode === 'edit' ? 'Edit Transaction' : 'View Transaction'}</h2>
                    <button onClick={onClose} className="text-red-500 hover:text-red-700">&times;</button>
                </div>

                <div className="mt-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Transaction ID</label>
                        <input
                            type="text"
                            name="id"
                            value={transaction.id}
                            readOnly
                            className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-600 dark:text-white rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={mode === 'edit' ? editedTransaction.amount : transaction.amount}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (!isNaN(value)) setEditedTransaction((prev: any) => ({ ...prev, amount: value }));
                            }}
                            readOnly={mode === 'view'}
                            className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-600 dark:text-white rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={editedTransaction.category || ''}
                            onChange={handleChange}
                            readOnly={mode === 'view'}
                            className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-600 dark:text-white rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Payment Method</label>
                        <select
                            name="paymentMethod"
                            value={editedTransaction.paymentMethod || ''}
                            onChange={handleChange}
                            disabled={mode === 'view'}
                            className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-600 dark:text-white rounded-md"
                        >
                            <option value="Cash">Cash</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Pix">Pix</option>
                            <option value="Bank Slip">Bank Slip</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Status</label>
                        <select
                            name="status"
                            value={editedTransaction.status || ''}
                            onChange={handleChange}
                            disabled={mode === 'view'}
                            className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-600 dark:text-white rounded-md"
                        >
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className="flex justify-end">
                        {mode === 'edit' && (
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Save
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="ml-3 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;