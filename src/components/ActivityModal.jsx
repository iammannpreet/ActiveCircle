import React from 'react';

const ActivityModal = ({ activity, onClose }) => {
    if (!activity) return null;

    // Format the activity date
    const activityDate = activity.date ? new Date(activity.date).toLocaleDateString() : 'Date not available';

    // If participants array exists, count the number of participants
    const participantsCount = activity.participants ? activity.participants.length : 0;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
            <div
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside it
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                    onClick={onClose}
                >
                    ✖
                </button>
                <h2 className="text-2xl font-bold mb-4">{activity.type}</h2>

                <p className="mb-2">
                    <span className="font-semibold">Location:</span> {activity.location}
                </p>

                <p className="mb-2">
                    <span className="font-semibold">Details:</span> {activity.details}
                </p>

                <p className="mb-2">
                    <span className="font-semibold">Organized by:</span> {activity.organizer}
                </p>

                <p className="mb-2">
                    <span className="font-semibold">Date:</span> {activityDate}
                </p>

                <p className="mb-2">
                    <span className="font-semibold">Participants:</span> {participantsCount} participant(s)
                </p>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ActivityModal;
