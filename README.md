## ActiveCircle Capstone Project Submission

### Overview
**ActiveCircle** is a community-driven application that helps users discover, organize, and participate in local activities. Whether users are fitness enthusiasts, parents arranging kids’ playdates, or individuals looking for a group walk or yoga class, ActiveCircle is designed to foster social connections and promote wellness through shared activities.

### Problem Space
Finding activities that align with specific interests, locations, and schedules can be challenging. There is a growing need for a consolidated platform where people can discover, join, and organize activities within their community. **ActiveCircle** addresses this need by offering a user-friendly platform that filters and manages local fitness, wellness, and family-friendly activities in one place.

### Project Features (Current Version)
1. **User Listings**: Users can post activities like gym sessions, yoga classes, kids’ playdates, and community walks. Each listing includes key details like location, time, type, and participants.
2. **Filters & Search**: Users can search and filter activities based on type (Gym, Yoga, Walk, Kids’ Play), location, and schedule. Multiple filters can be applied simultaneously for precise results.
3. **Interactive Map**: The app uses Mapbox API to provide an interactive map view of activities, enabling users to explore events visually based on their location.
4. **Authentication**: User authentication is implemented with JWT, ensuring secure access and personalized content.
5. **Community Engagement**: Users can organize and view events representing community groups.
6. **Responsive Design**: The app is responsive and optimized for mobile, tablet, and desktop devices using a combination of Tailwind CSS and React.

### Upcoming Features (Future Version)
1. **Profile Creation**: Users will be able to create and customize profiles to store preferences and event history.
2. **Safety Features for Kids' Play**: Organizers will have the ability to designate responsible adults for activities involving children.
3. **Payment Integration**: For activities like yoga classes, there will be an integrated payment system using Stripe.
4. **Favorites/RSVP**: Users will have the option to mark activities as favorites and RSVP for events.

### Implementation
1. **Tech Stack**:
   - **Frontend**: React.js for building dynamic user interfaces.
   - **Styling**: Tailwind CSS for responsive design and clean styling.
   - **Backend**: Node.js with Express.js for handling API requests and server-side logic.
   - **Database**: MongoDB for scalable data storage and retrieval.
   - **APIs**: Mapbox for interactive maps, and Useless Facts API for providing fun facts on the 404 page.
  
2. **Endpoints**:
   - **POST /activities**: Allows users to create new activity listings.
   - **GET /activities**: Retrieves a list of activities with filter support.
   - **POST /join**: Allows users to join an existing activity.
   - **GET /user/:id**: Fetches user profile data and activity history.

### Current Achievements
- **User Activities**: Users can post and view activities, explore events using multiple filters, and search by keywords or location. The backend securely handles all POST and GET requests, ensuring data integrity and user authentication.
- **Fully Functional Map**: The Mapbox API integration allows users to explore activities visually with full interactivity.
- **Responsive Design**: The app adjusts seamlessly across all devices—mobile, tablet, and desktop.
- **Authentication and Authorization**: Implemented secure authentication with JWT, allowing users to create and manage their listings.
- **404 Page**: A creative “Not Found” page that displays random fun facts using the Useless Facts API.

### Future Goals
- Enhance user profiles with personalized settings and activity history.
- Implement security measures for kids’ activities by allowing responsible adult assignments.
- Integrate payment processing for premium events such as yoga classes.
- Add RSVP functionality to allow users to express their interest in activities.

### Final Summary
ActiveCircle is an effective, community-focused app that makes it easier for people to discover and participate in local activities. While the current version focuses on core features like creating, viewing, and searching activities, future updates will include profile management, safety features, payment processing, and RSVP capabilities. This project showcases practical solutions for community engagement through shared interests and local activities.

**Tech Stack Used**: React.js, Tailwind CSS, Node.js, Express.js, MongoDB, Mapbox API

###Installation and Setup
To fully experience ActiveCircle, you need to install the required dependencies, set up the environment variables, and seed the database with initial data. Instructions on setting up and running the application are detailed in the Installation Guide section. Additionally, remember to create and add at least three activities and events to explore the app’s complete features.
