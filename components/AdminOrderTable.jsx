'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_COLORS = {
    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const STATUS_OPTIONS = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
];

function OrderModal({ order, onClose, onStatusChange }) {
    const [status, setStatus] = useState(order.status);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusChange = async (newStatus) => {
        setIsUpdating(true);
        try {
            const res = await fetch(`/api/orders/${order._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                setStatus(newStatus);
                onStatusChange(order._id, newStatus);
            }
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0a1f1c] rounded-2xl border border-[#1a3a35] p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Order Details</h3>
                    <button onClick={onClose} className="text-[#afbfc1] hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-[#afbfc1]">Order ID</p>
                        <p className="text-white font-mono text-sm">{order._id}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-[#afbfc1]">Client Name</p>
                            <p className="text-white">{order.clientName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-[#afbfc1]">Phone</p>
                            <p className="text-white">{order.clientPhone}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-[#afbfc1]">Email</p>
                        <p className="text-white">{order.clientEmail}</p>
                    </div>

                    <div>
                        <p className="text-sm text-[#afbfc1] mb-2">Status</p>
                        <div className="flex gap-2">
                            {STATUS_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => handleStatusChange(opt.value)}
                                    disabled={isUpdating || status === opt.value}
                                    className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${status === opt.value
                                        ? STATUS_COLORS[opt.value]
                                        : 'border-[#1a3a35] text-[#afbfc1] hover:border-[#01b793]'
                                        } disabled:opacity-50`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-[#afbfc1] mb-2">Services</p>
                        <div className="bg-[#051512] rounded-lg p-4 space-y-2">
                            {order.services?.frontend?.tier && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#afbfc1]">Frontend: {order.services.frontend.tier}</span>
                                    <span className="text-white">₹{order.services.frontend.price?.toLocaleString()}</span>
                                </div>
                            )}
                            {order.services?.backend?.tier && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#afbfc1]">Backend: {order.services.backend.tier}</span>
                                    <span className="text-white">₹{order.services.backend.price?.toLocaleString()}</span>
                                </div>
                            )}
                            {order.services?.mongodb?.features?.length > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#afbfc1]">MongoDB: {order.services.mongodb.features.join(', ')}</span>
                                    <span className="text-white">₹{order.services.mongodb.price?.toLocaleString()}</span>
                                </div>
                            )}
                            {order.services?.uropay?.included && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#afbfc1]">Uropay</span>
                                    <span className="text-white">₹{order.services.uropay.price?.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="pt-2 border-t border-[#1a3a35] flex justify-between font-bold">
                                <span className="text-white">Total</span>
                                <span className="text-[#01b793]">₹{order.totalPrice?.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-[#afbfc1]">Created</p>
                            <p className="text-white">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-[#afbfc1]">Updated</p>
                            <p className="text-white">{new Date(order.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {order.businessSummary && (
                        <div>
                            <p className="text-sm text-[#afbfc1] mb-2">Business Summary</p>
                            <div className="bg-[#051512] rounded-lg p-4">
                                <p className="text-white text-sm whitespace-pre-wrap">{order.businessSummary}</p>
                            </div>
                        </div>
                    )}

                    {order.additionalInfo && (
                        <div>
                            <p className="text-sm text-[#afbfc1] mb-2">Additional Information</p>
                            <div className="bg-[#051512] rounded-lg p-4">
                                <p className="text-white text-sm whitespace-pre-wrap">{order.additionalInfo}</p>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

function DeleteConfirmModal({ order, onClose, onConfirm, isDeleting }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0a1f1c] rounded-2xl border border-[#1a3a35] p-6 max-w-md w-full"
            >
                <h3 className="text-xl font-bold text-white mb-4">Delete Order?</h3>
                <p className="text-[#afbfc1] mb-6">
                    Are you sure you want to delete the order from <strong className="text-white">{order.clientName}</strong>? This action cannot be undone.
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="flex-1 py-3 border-2 border-[#1a3a35] text-[#afbfc1] rounded-xl hover:border-[#01b793] hover:text-white transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="flex-1 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all disabled:opacity-50"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function AdminOrderTable() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 0 });
    const [stats, setStats] = useState({ totalRevenue: 0, avgOrderValue: 0, pendingCount: 0 });
    const [filters, setFilters] = useState({
        status: '',
        search: '',
        sortField: 'createdAt',
        sortOrder: 'desc',
    });
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [deleteOrder, setDeleteOrder] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: pagination.page.toString(),
                limit: pagination.limit.toString(),
                sortField: filters.sortField,
                sortOrder: filters.sortOrder,
            });

            if (filters.status) params.append('status', filters.status);
            if (filters.search) params.append('search', filters.search);

            const res = await fetch(`/api/orders?${params}`);
            const data = await res.json();

            if (res.ok) {
                setOrders(data.orders);
                setPagination((prev) => ({ ...prev, ...data.pagination }));
                setStats(data.stats);
            }
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.limit, filters]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleDelete = async () => {
        if (!deleteOrder) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/orders/${deleteOrder._id}`, { method: 'DELETE' });
            if (res.ok) {
                setOrders((prev) => prev.filter((o) => o._id !== deleteOrder._id));
                setDeleteOrder(null);
            }
        } finally {
            setIsDeleting(false);
        }
    };

    const handleStatusChange = (orderId, newStatus) => {
        setOrders((prev) =>
            prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
    };


    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0a1f1c] rounded-xl border border-[#1a3a35] p-4">
                    <p className="text-[#afbfc1] text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-white">{pagination.total}</p>
                </div>
                <div className="bg-[#0a1f1c] rounded-xl border border-[#1a3a35] p-4">
                    <p className="text-[#afbfc1] text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-[#01b793]">₹{stats.totalRevenue?.toLocaleString()}</p>
                </div>
                <div className="bg-[#0a1f1c] rounded-xl border border-[#1a3a35] p-4">
                    <p className="text-[#afbfc1] text-sm">Pending Orders</p>
                    <p className="text-2xl font-bold text-amber-400">{stats.pendingCount}</p>
                </div>
                <div className="bg-[#0a1f1c] rounded-xl border border-[#1a3a35] p-4">
                    <p className="text-[#afbfc1] text-sm">Avg Order Value</p>
                    <p className="text-2xl font-bold text-white">₹{Math.round(stats.avgOrderValue || 0).toLocaleString()}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
                <input
                    type="text"
                    placeholder="Search by name, email, phone..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && fetchOrders()}
                    className="flex-1 min-w-[200px] px-4 py-2 bg-[#0a1f1c] border border-[#1a3a35] rounded-lg text-white placeholder-[#afbfc1]/50 focus:outline-none focus:border-[#01b793]"
                />
                <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="px-4 py-2 bg-[#0a1f1c] border border-[#1a3a35] rounded-lg text-white focus:outline-none focus:border-[#01b793]"
                >
                    <option value="">All Status</option>
                    {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <button
                    onClick={fetchOrders}
                    className="px-4 py-2 bg-[#01b793] text-white rounded-lg hover:bg-[#00a583] transition-colors"
                >
                    Search
                </button>
            </div>

            {/* Table */}
            <div className="bg-[#0a1f1c] rounded-xl border border-[#1a3a35] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#051512]">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-[#afbfc1] uppercase">Client</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-[#afbfc1] uppercase">Contact</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-[#afbfc1] uppercase">Services</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-[#afbfc1] uppercase">Total</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-[#afbfc1] uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-[#afbfc1] uppercase">Date</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-[#afbfc1] uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1a3a35]">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-[#afbfc1]">
                                        Loading...
                                    </td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-[#afbfc1]">
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-[#051512]/50 transition-colors">
                                        <td className="px-4 py-4">
                                            <p className="text-white font-medium">{order.clientName}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-[#afbfc1] text-sm">{order.clientEmail}</p>
                                            <p className="text-[#afbfc1] text-sm">{order.clientPhone}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-white text-sm">
                                                {order.services?.frontend?.tier || 'N/A'}
                                                {order.services?.backend?.tier && ` + ${order.services.backend.tier}`}
                                            </p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-[#01b793] font-bold">₹{order.totalPrice?.toLocaleString()}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-block px-2 py-1 rounded-lg text-xs border ${STATUS_COLORS[order.status]}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-[#afbfc1] text-sm">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="p-2 text-[#afbfc1] hover:text-[#01b793] transition-colors"
                                                    title="View Details"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => setDeleteOrder(order)}
                                                    className="p-2 text-[#afbfc1] hover:text-red-500 transition-colors"
                                                    title="Delete"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 bg-[#051512] border-t border-[#1a3a35]">
                        <p className="text-sm text-[#afbfc1]">
                            Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                                disabled={pagination.page === 1}
                                className="px-3 py-1 border border-[#1a3a35] rounded text-[#afbfc1] hover:border-[#01b793] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                                disabled={pagination.page === pagination.pages}
                                className="px-3 py-1 border border-[#1a3a35] rounded text-[#afbfc1] hover:border-[#01b793] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {selectedOrder && (
                    <OrderModal
                        order={selectedOrder}
                        onClose={() => setSelectedOrder(null)}
                        onStatusChange={handleStatusChange}
                    />
                )}
                {deleteOrder && (
                    <DeleteConfirmModal
                        order={deleteOrder}
                        onClose={() => setDeleteOrder(null)}
                        onConfirm={handleDelete}
                        isDeleting={isDeleting}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
