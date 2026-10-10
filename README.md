# ShopEase – E-Commerce Website

A Full-Stack E-Commerce Web Development Major Project

## 1. Project Overview

ShopEase is a full-stack e-commerce web application developed as a team major project. The purpose of the project is to provide users with an online shopping experience where they can browse products, search for items, view product details, manage a shopping cart, proceed through checkout, and access their orders.

The application also includes user authentication, profile management, role-based access, and an administrative interface.

The project is organized into modules to allow different team members to develop separate functionalities and integrate them into a common application.

The system uses HTML, CSS, and JavaScript for the product storefront, React for the application interface, Node.js and Express.js for backend APIs, and MongoDB Atlas for data storage.

## 2. Project Objectives

The main objectives of ShopEase are:

- Develop an interactive and user-friendly e-commerce website.
- Implement user registration, login, logout, and profile management.
- Display products with search, filtering, sorting, and product details.
- Allow users to add products to a shopping cart.
- Support cart quantity updates and item removal.
- Connect cart operations with checkout and order management.
- Provide an interface for administrative operations.
- Integrate the frontend with backend REST APIs.
- Store application data using MongoDB.
- Develop and integrate the application through a modular team workflow.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure of the storefront pages |
| CSS3 | Styling, layout, and responsive design |
| JavaScript | Storefront interactions and API requests |
| React | Authentication and application interface |
| React Router | Navigation between React pages |
| Vite | React development server and build tooling |
| Axios | HTTP requests from the frontend |
| Node.js | Backend JavaScript runtime |
| Express.js | Backend API and routing |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB models and database operations |
| bcryptjs | Password hashing |
| JWT | Authentication tokens |
| HTTP-only cookies | Secure delivery of authentication cookies |
| Git and GitHub | Version control and team collaboration |

## 4. System Architecture

ShopEase has three main development components.

### 4.1 Product Storefront

The static storefront contains the main product browsing interface. It is developed using HTML, CSS, and JavaScript.

Its responsibilities include:

- Displaying products.
- Searching and filtering products.
- Sorting products.
- Opening product details.
- Sending add-to-cart requests to the backend.
- Providing navigation to other application pages.

### 4.2 React Frontend

The React application contains the authentication interface and additional application pages.

Its responsibilities include:

- Registration and login forms.
- Profile management.
- Authentication-aware navigation.
- Cart and checkout pages.
- Orders page.
- Admin Panel.
- Protected routes and role-based frontend navigation.

### 4.3 Backend and Database

The backend is developed using Node.js and Express.js. It provides APIs that the frontend modules use to exchange data.

MongoDB Atlas stores application data through Mongoose models.

Backend responsibilities include:

- Authentication and authorization.
- Product API access.
- Cart operations.
- Order-related operations.
- Database communication.
- Validation and protected API access.

### Development Architecture

```text
                 USER
                   |
                   v
       +-----------------------+
       |  ShopEase Storefront  |
       |   HTML, CSS, JS       |
       +-----------------------+
                   |
                   | REST API requests
                   v
       +-----------------------+
       |  React Application    |
       | Authentication, Cart, |
       | Checkout, Orders,     |
       | Profile, Admin        |
       +-----------------------+
                   |
                   | HTTP requests
                   v
       +-----------------------+
       | Node.js + Express.js  |
       |      Backend API      |
       +-----------------------+
                   |
                   v
       +-----------------------+
       |     MongoDB Atlas     |
       |     Application Data  |
       +-----------------------+
```

The diagram represents the main components and their intended integration. The storefront and React application currently run on separate development servers. A single user-facing storefront requires the additional frontend integration described in the setup notes below.

## 5. Project Folder Structure

The project is organized into the following main directories:

```text
CORIZO-MAJOR-PROJECT/
|
|-- Auth module/
|   |
|   |-- backend/
|   |   |-- controllers/
|   |   |-- middleware/
|   |   |-- models/
|   |   |-- routes/
|   |   |-- package.json
|   |   |-- .env
|   |   `-- ...
|   |
|   |-- frontend/
|   |   |-- src/
|   |   |   |-- components/
|   |   |   |-- contexts/
|   |   |   |-- pages/
|   |   |   |-- services/
|   |   |   |-- App.jsx
|   |   |   `-- ...
|   |   |-- package.json
|   |   `-- ...
|   |
|   |-- README.md
|   |-- API_CONTRACT.md
|   |-- MONGODB_SETUP.md
|   `-- DEPLOYMENT.md
|
|-- product-module/
|   |-- index.html
|   |-- product-details.html
|   |-- styles.css
|   |-- script.js
|   `-- ...
|
`-- README.md
```

This is a representative structure based on the project layout. Other files and subdirectories may exist in the actual project.

The root `README.md` documents the entire project. The README inside `Auth module` documents Member 1's authentication module.

## 6. Modules and Features

### 6.1 Authentication and Profile Management

**Developed by: Aryan Sharma — Member 1**

The authentication module provides user identity management and access control.

Features include:

- User registration.
- User login.
- Password hashing and validation.
- JWT-based authentication using HTTP-only cookies.
- User logout.
- Authentication context for managing the current user.
- Protected frontend routes.
- Authorization middleware.
- Role-based access for users and administrators.
- Profile page.
- Navigation based on authentication state.

The React application uses React Router for navigation and an authentication context to provide user information and logout functionality to components.

The backend verifies authentication for protected API routes.

### 6.2 Product Storefront

**Developed by: Aathisaravanan — Member 2**

The product module provides the storefront interface used for browsing products.

Features include:

- Product listing.
- Product search.
- Product filtering and sorting.
- Product details page.
- Product image and price display.
- Add-to-cart interaction.
- Storefront navigation.

The storefront is built using HTML, CSS, and JavaScript.

The JavaScript communicates with the backend product API to retrieve product information. Product selection and add-to-cart interactions connect the storefront with the backend cart API.

### 6.3 Cart and Order Management

**Developed by: Devananda K — Member 3**

The cart and order module connects product selection with the shopping workflow.

The work includes:

- Connecting the storefront's add-to-cart functionality with the backend.
- Integrating cart information with the React Cart page.
- Displaying product names, images, prices, and quantities.
- Supporting cart quantity changes.
- Supporting removal of cart items.
- Connecting the cart with the checkout workflow.
- Integrating order-related pages.
- Testing communication between the storefront, React application, and backend.

The cart API uses authenticated routes. The backend must recognize the logged-in user for protected cart operations to succeed.

### 6.4 Checkout and Notifications

**Developed by: Devananda K — Member 3, also responsible for Member 4's work**

This module supports the transition from cart review to order processing.

The responsibilities include:

- Integrating the checkout page.
- Connecting checkout with cart information.
- Supporting the order submission workflow.
- Integrating relevant order status or notification functionality where implemented.
- Testing the interaction between the cart, checkout, and backend.

The precise payment and notification capabilities depend on the features implemented in the current project version.

### 6.5 Admin Panel

**Developed by: Devananda K — Member 3, also responsible for Member 5's work**

The Admin Panel provides a dedicated interface for administrative operations.

The responsibilities include:

- Integrating the Admin Panel into the React application.
- Supporting administrator-only navigation.
- Connecting administrative functionality with the backend where implemented.
- Testing role-based access.
- Ensuring that restricted administrative API operations require appropriate authorization.

Frontend route protection alone is not sufficient for security. Administrative API operations must also verify the user's role on the backend.

## 7. Important Implementation Details

### 7.1 Authentication

The authentication module uses a React authentication context to track the current user and expose login and logout operations.

The existing navigation component uses the authentication context to:

- Display the user's name when logged in.
- Display a Profile link.
- Show an Admin Panel link to administrators.
- Display Login and Register links when logged out.
- Call the existing logout function when the Logout button is selected.

The backend is responsible for verifying authentication and protecting private routes.

### 7.2 Product API Integration

The storefront JavaScript retrieves products from the backend product API.

The product module also sends add-to-cart requests to the backend cart endpoint. These requests include credentials so that the browser can send applicable authentication cookies.

The exact API endpoints and request formats should be documented in the backend API contract.

### 7.3 Cart Integration

The React Cart page retrieves cart data from the backend.

The integration expects cart items to contain product information such as:

- Product identifier.
- Product name.
- Product price.
- Product image.
- Quantity.

The cart uses these values to display items and support cart operations.

Cart operations depend on successful authentication because the backend cart routes are protected.

### 7.4 Navigation Integration

The static storefront and React frontend use different routing systems.

The static storefront uses ordinary HTML links. The React frontend uses React Router.

During development, the storefront runs on port `5500`, while the React frontend runs on port `5173`.

Navigation links can connect the two applications, but this does not make them a single server. The final integrated version should make the required user-facing pages available through one storefront entry point without breaking existing authentication or cart functionality.

## 8. Prerequisites

Before running ShopEase, install or configure:

- Node.js and npm.
- MongoDB Atlas account.
- VS Code or another code editor.
- A modern web browser.
- Internet connectivity for the configured MongoDB Atlas connection.
- All required project environment variables.

Use the Node.js version compatible with the project's dependencies.

## 9. Installation and Setup

### Step 1: Open the Project

Open the `CORIZO-MAJOR-PROJECT` folder in VS Code.

Open a terminal using:

**Terminal → New Terminal**

The following commands assume that the project is located inside the Desktop directory on macOS.

### Step 2: Configure MongoDB

Open the authentication module's existing `MONGODB_SETUP.md` file.

Follow its instructions to:

1. Configure MongoDB Atlas.
2. Create or select the database.
3. Configure database network access.
4. Obtain the MongoDB connection URI.
5. Add the required environment variables to the backend `.env` file.

Never commit `.env` files, database passwords, JWT secrets, or other private credentials to GitHub.

### Step 3: Install Backend Dependencies

Open the first terminal:

```bash
cd ~/Desktop/CORIZO-MAJOR-PROJECT/"Auth module"/backend
npm install
```

### Step 4: Start the Backend

Run:

```bash
npm run dev
```

If the project does not define a `dev` script, check the `scripts` section of `package.json` and use the configured command.

The current development setup is expected to use:

`http://localhost:5001`

If the backend health endpoint is configured, verify it at:

`http://localhost:5001/api/health`

The actual port is determined by the backend configuration.

### Step 5: Install React Frontend Dependencies

Open a second terminal:

```bash
cd ~/Desktop/CORIZO-MAJOR-PROJECT/"Auth module"/frontend
npm install
```

### Step 6: Start the React Frontend

Run:

```bash
npm run dev
```

The Vite development server is expected to use:

`http://localhost:5173`

Keep this terminal running while using the React application.

### Step 7: Start the Product Storefront

Open a third terminal:

```bash
cd ~/Desktop/CORIZO-MAJOR-PROJECT/product-module
npx http-server -p 5500
```

If prompted to install `http-server`, confirm the installation.

Alternatively, run the storefront using Python:

```bash
python3 -m http.server 5500
```

Open:

`http://localhost:5500`

Keep this terminal running while using the storefront.

### 9.1 Development Server Summary

| Component | URL | Purpose |
|---|---|---|
| Product storefront | `http://localhost:5500` | Product browsing and storefront interface |
| React frontend | `http://localhost:5173` | Login, registration, profile, cart, checkout, orders, and admin pages |
| Backend | `http://localhost:5001` | API requests, authentication, and database operations |

These are the current expected development addresses. If the project configuration specifies different ports, use the configured values.

**Important:** Starting all three servers does not automatically integrate them into one server. The single-storefront requirement must be completed and tested separately.

## 10. Running the Application

Once the required servers are running:

1. Open the storefront.
2. Browse the available products.
3. Search for products and test filtering or sorting.
4. Open product details.
5. Register an account if necessary.
6. Log in using the React authentication interface.
7. Add products to the cart.
8. Open the Cart page and verify the selected products.
9. Update quantities or remove products.
10. Proceed to checkout.
11. Test the order workflow.
12. Open the Orders page.
13. Test profile and logout functionality.
14. Test administrator functionality using an authorized account.

For the current multi-server development setup, some navigation may open pages on port `5173`. This should be addressed during the final storefront integration.

## 11. Testing and Validation

### Authentication Testing

- [ ] Register a new user.
- [ ] Log in with valid credentials.
- [ ] Verify that invalid credentials are rejected.
- [ ] Open the profile page.
- [ ] Verify protected routes while logged out.
- [ ] Log out and verify the resulting authentication state.
- [ ] Test administrator access with an authorized account.

### Product Testing

- [ ] Verify that products load from the backend.
- [ ] Test product search.
- [ ] Test product filtering and sorting.
- [ ] Open product details.
- [ ] Verify product images and prices.
- [ ] Add a product to the cart.

### Cart Testing

- [ ] Verify that the selected product appears in the cart.
- [ ] Verify product name, image, price, and quantity.
- [ ] Increase and decrease quantities.
- [ ] Remove a product.
- [ ] Verify that cart changes are reflected by the backend.
- [ ] Test cart access when logged out.

### Checkout and Orders Testing

- [ ] Open checkout with valid cart items.
- [ ] Test order submission.
- [ ] Verify the resulting order data.
- [ ] Open the Orders page.
- [ ] Verify the appropriate order information.
- [ ] Test any implemented payment and notification functionality.

### Integration Testing

- [ ] Verify frontend-to-backend communication.
- [ ] Verify authentication cookies and credential settings.
- [ ] Test navigation between storefront and React pages.
- [ ] Test the complete shopping workflow.
- [ ] Verify the single-storefront experience after integration.
- [ ] Confirm that no existing member functionality has been broken.

## 12. Security Considerations

- Store secrets in environment variables.
- Do not publish database credentials or authentication secrets.
- Use password hashing for stored passwords.
- Protect private API routes with authentication middleware.
- Enforce administrator permissions on the backend.
- Configure CORS for the required development origins.
- Configure cookies correctly for the chosen deployment setup.
- Restrict database access to trusted network locations where practical.
- Validate API request data.
- Never rely exclusively on frontend route protection for security.

## 13. Known Development Considerations

The following points should be verified before the final submission:

1. The static storefront and React application currently use separate development servers.
2. All user-facing pages should be integrated under the intended storefront URL.
3. Authentication cookies must work correctly between the frontend and backend.
4. Cart operations must remain associated with the authenticated user.
5. Checkout and order submission must be tested end to end.
6. Administrator permissions must be enforced by the backend.
7. The README commands and port numbers must match the final project configuration.
8. All team members' features should be tested together before the final demonstration.

## 14. Future Enhancements

Potential future improvements include:

- Complete single-storefront integration.
- Responsive mobile layouts.
- Payment gateway integration, if not already implemented.
- Product ratings and reviews.
- Improved order tracking.
- Email or in-app notifications.
- Product recommendations.
- Improved search and filtering.
- Production deployment.
- Automated integration tests.

## 15. Team Contributions

Member 1 - Aryan Sharma:- Authentication, registration, login, logout, profile management, protected routes, and role-based access 

Member 2 - Aathisaravanan:- Product storefront, product listing, product search, filtering, sorting, product details, and storefront interactions 

Member 3 - Devananda K:- Cart and order integration, checkout integration, notifications-related work, Admin Panel integration, and overall module integration 

Member 4 - Work handled by Devananda K:- Checkout and notification responsibilities |
Member 5 - Work handled by Devananda K:- Admin Panel responsibilities |

## 16. Documentation

The authentication module includes additional documentation:

- `Auth module/README.md` — Authentication module setup and features.
- `Auth module/API_CONTRACT.md` — API contract and integration details.
- `Auth module/MONGODB_SETUP.md` — MongoDB Atlas setup.
- `Auth module/DEPLOYMENT.md` — Deployment instructions.

These files should be retained and updated by the appropriate team member if their module changes.

## 17. Conclusion

ShopEase is a modular e-commerce web application that brings together product browsing, user authentication, shopping cart management, checkout, order handling, and administrative functionality.

The project demonstrates the use of frontend technologies, React, REST APIs, Node.js, Express.js, and MongoDB Atlas to build an integrated application.

Through collaboration among the team members, the project combines multiple modules into a common shopping workflow. The final integration and testing process ensures that the modules work together reliably and that users can complete the shopping process with a consistent interface.
