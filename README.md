Airbnb Clone

An Airbnb Clone project that emulates the essential functionalities of the Airbnb platform. This application allows users to browse, book properties, and manage listings, while offering separate roles for administrators and users. The project covers core features such as authentication, CRUD (Create, Read, Update, Delete) operations, and booking management, MVC pattern is applied to design this.

 Features
- MVC pattern: Controllers, routes, and middleware, we are working with the application architecture or design pattern
- User Authentication: Users can register, login, and manage their profiles.
- Admin Dashboard: Admins have full control over all listings, bookings, and user management.
- Property Listings: Browse and view details of available properties, with property descriptions, pricing, and photos.
- Booking System: Users can book properties based on availability and view past bookings.
- CRUD Operations: Admins and property owners can create, read, update, and delete property listings.
- Responsive Design: Designed to be responsive across mobile, tablet, and desktop devices.

 Technologies
This project uses the following technologies and frameworks:
- Backend: Node.js, Express.js 
- Database: MongoDB 
- Frontend: React.js, Bootstrap 
- Authentication: JSON Web Tokens 


 Installation
Follow these steps to set up the project on your local machine.

1. Clone the repository:
   ```bash
   git clone https://github.com/username/airbnb-clone.git
   cd airbnb-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   DB_CONNECTION=<your-database-url>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Run the application:
   ```bash
   npm start
   ```

5. Open the app:
   Navigate to `http://localhost:3000` in your browser.

 Usage
1. Admin Actions:
   - Access the dashboard to manage users and listings.
   - Perform CRUD operations on all properties.
   - Review all bookings and cancel if necessary.

2. User Actions:
   - Register and log in.
   - Browse available properties and book based on availability.
   - View booking history.

3. Property Management:
   - Owners or admins can add, update, and delete properties.
   - Include property details such as description, images, amenities, and location.


 License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

