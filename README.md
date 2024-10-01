Project Title: ActiveCircle
Overview
ActiveCircle is a community-driven app designed to help people discover and participate in activities happening near them. Users can post listings for activities such as gym sessions, yoga classes, kids' playdates, and group walks. The app provides an easy way to organize or join events based on location, activity type, and preferences, encouraging social connections through shared interests.

Problem Space
Many individuals struggle to find local activities that align with their fitness or social interests. There’s a growing need for a platform that consolidates community-driven events, making it easier for people to discover, join, or organize events near them. ActiveCircle solves this problem by providing a simple and effective platform for discovering and managing fitness, family-friendly, and wellness activities in their area.

User Profile
Primary users:

Fitness Enthusiasts: People who seek workout buddies or want to organize group workouts.
Parents: Individuals looking to arrange or join kids' playdates.
Health-Conscious Individuals: People interested in organizing or joining community walks or yoga sessions.
Community Organizers: Individuals or organizations that host events for welfare, social, or health-focused groups.
Special Considerations:

Users will want to filter activities by location, time, and activity type.
Parents may need extra security features, such as identifying responsible adults for children’s activities.
Yoga sessions might require payment processing integration.
Ease of use and quick access to local activities is crucial to retain engagement.
Features
User Listings: Users can post listings for activities (gym sessions, walks, kids' play, and yoga). Each post will include location, number of participants, and details specific to the activity.
Filters: Filter activities by type (Gym, Yoga, Kids' Play, Walk), location, and time.
Search Functionality: Search for activities happening nearby, or within a set radius, based on user location.
Profile Creation: Users can create profiles that store preferences and make posting or joining events easier.
Community Engagement: Users can join or organize events representing community or welfare groups.
Safety Features for Kids' Play: Organizers can designate responsible adults for kids' activities.
Payment Integration: Yoga session listings can include price details and support for payments via Stripe.
Favorites/RSVP: Users can mark events as favorites or RSVP to activities they’re interested in attending.

Implementation
Tech Stack
Frontend: React.js for building dynamic and responsive user interfaces.
Styling: SASS for styling and maintaining design consistency.
Backend: Node.js with Express for server-side logic and API requests.
Database: TBD
Authentication: TBD
Payment Integration: TBD
Deployment: TBD
APIs
Google Maps API: For location-based filtering and displaying activities.
Firebase Authentication: TBD
Stripe API: TBD

Sitemap
Home Page: Displays a list of nearby activities with filters for gym, yoga, kids' play, and walk events.
Post Listing Page: Allows users to create a new listing for an activity, specifying details such as location, participants, and time.
Activity Detail Page: Displays the details of a specific activity and provides options to join or contact the organizer.
Profile Page: Shows user details, event history, and preferences.
Search Results Page: Lists filtered activities based on user’s search criteria (location, type, time).
Mockups
Mockups will show the following pages:

Home Page: With filters and activity listings.
Post Activity Form: For users to post new listings.
Activity Detail Page: Showing activity information with options to join or contact the organizer.
Profile Page: With user details and list of posted or joined activities.
Tools like Figma or hand-drawn sketches can be used to create visual representations.

Data
Users:

userId: unique identifier
name: string
email: string
preferences: array (e.g., preferred activities)
Activities:

activityId: unique identifier
type: string (Gym, Walk, Kids' Play, Yoga)
location: string
organizerId: userId
details: string (e.g., workout type, kids' activity details)
Listings:

listingId: unique identifier
activityId: activityId
organizerId: userId
participants: array of userIds
Endpoints
POST /activities: Creates a new activity listing.
Parameters: activityType, location, details
Example Response: { activityId: '123', message: 'Activity created successfully.' }
GET /activities: Retrieves a list of activities based on filters.
Parameters: type, location, radius
Example Response: [ { activityId: '123', type: 'Gym', location: 'XYZ' } ]
POST /join: Allows a user to join an activity.
Parameters: activityId, userId
Example Response: { message: 'Joined activity successfully.' }
GET /user/
: Retrieves user profile data and activity history.
Example Response: { name: 'John Doe', activities: [{ activityId: '123', type: 'Walk' }] }
