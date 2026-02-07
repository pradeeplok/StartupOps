import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Send, CheckCircle } from 'lucide-react';
import { UserContext } from '../App';

const PublicValidation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setRecentFeedback } = React.useContext(UserContext); // Access global setter

    const [rating, setRating] = useState(0);
    const [formData, setFormData] = useState({ name: '', feeling: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API Call
        setTimeout(() => {
            const newFeedback = {
                id: Date.now(),
                user: formData.name,
                comment: formData.feeling,
                sentiment: rating >= 4 ? 'positive' : rating <= 2 ? 'negative' : 'neutral',
                date: 'Just now'
            };

            // Update Global State (Simulating DB Push)
            setRecentFeedback(prev => [newFeedback, ...prev]);

            setSubmitted(true);
        }, 800);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center border-t-4 border-green-500">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Thank You!</h2>
                    <p className="text-slate-600 mb-6">Your feedback helps us build a better product for everyone.</p>
                    <button onClick={() => navigate('/')} className="text-blue-600 font-semibold underline">
                        Back to StartupOps
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full border border-slate-100">
                <div className="text-center mb-8">
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
                        Beta Feedback
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Validate {id || 'Startup'}</h1>
                    <p className="text-slate-500 mt-2">Help us validate our core features by sharing your honest thoughts.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">How would you rate this concept?</label>
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`p-2 rounded-lg transition-all ${rating >= star ? 'text-amber-400 scale-110' : 'text-slate-300 hover:text-slate-400'}`}
                                >
                                    <Star size={32} fill={rating >= star ? "currentColor" : "none"} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
                        <input
                            required
                            type="text"
                            className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="e.g. Early Adopter"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">What is your biggest pain point?</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                            placeholder="Tell us what prevents you from solving this problem today..."
                            value={formData.feeling}
                            onChange={e => setFormData({ ...formData, feeling: e.target.value })}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={rating === 0}
                        className={`w-full py-3 px-4 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all ${rating > 0 ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl' : 'bg-slate-300 cursor-not-allowed'}`}
                    >
                        <Send size={18} />
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PublicValidation;
