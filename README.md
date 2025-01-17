# Expense Tracker Dashboard

This is an **Expense Tracker Dashboard** built with modern web technologies. It enables users to manage their financial transactions, track expenses, and view their financial statistics such as revenue growth and transaction count. 

The app includes features like user authentication, expense tracking, user settings, and an intuitive, responsive interface. Additionally, I designed it to be open for further improvements, such as making it suitable for companies or incorporating AI to enhance financial management.

## Features

- **User Authentication**: Users can register and log in with their email and password, or use social logins like Google and Facebook.
- **Expense Tracker**: Track expenses, including income and other financial activities.
- **Transactions Management**: View, add, edit, and delete transactions with a fully functional transactions page.
- **Recent Activity**: View a list of recent transactions to keep track of financial history.
- **Settings Management**: Users can update their profile, including username, email, password, and profile picture.
- **Responsive Design**: The app works on both desktop and mobile devices, offering a seamless experience.

## Technologies Used

The app is built using several powerful and modern technologies, frameworks, and tools.

### 1. **React**
   - **React** is the core library used for building the front-end of the app. It allows for efficient rendering and creating dynamic, interactive UIs.
   - React’s component-based structure makes it easy to build reusable components, which are used across different parts of the app like the Dashboard, Transactions, Login, and Settings pages.

### 2. **Firebase**
   - **Firebase Authentication**: Used for handling user authentication with email/password, Google, and Facebook logins.
   - Firebase makes it easy to implement authentication without the need for server-side code, ensuring fast and secure sign-in methods.
   - Firebase Realtime Database or Firestore (if implemented) can be used to store user data and transaction information.

### 3. **Tailwind CSS**
   - **Tailwind CSS** is a utility-first CSS framework that allows for rapid and flexible UI design. It makes styling components much easier, and offers responsiveness out-of-the-box, ensuring the app works well on mobile and desktop devices.
   - Tailwind’s utility classes help maintain a clean and consistent UI throughout the app, as seen in the Dashboard, Transactions, and Settings pages.

### 4. **React Router**
   - **React Router** is used for handling client-side routing, allowing users to navigate between pages (like Dashboard, Transactions, Login, and Settings) without a page reload.
   - It ensures smooth transitions between different views within the app.

### 5. **Context API**
   - **React Context API** is used to manage global states, such as the transaction data and user authentication status.
   - This enables centralized management of data, making it accessible to various components without prop-drilling.

### 6. **React Icons**
   - **React Icons** are used to add modern and scalable icons in the user interface. For example, icons from libraries like Font Awesome (e.g., `FaChartLine`, `FaUsers`, `FaEdit`) are used in the Dashboard and Transactions page to display important actions.

### 7. **Firebase Firestore (or Realtime Database)**
   - Data such as transactions, user details, and settings can be stored in **Firestore** or Firebase’s **Realtime Database**.
   - Firebase's NoSQL database solution ensures that the data is synced and stored securely across multiple devices in real time.

### 8. **Email and Password Authentication / OAuth**
   - Firebase handles email/password authentication, allowing users to register, log in, and manage their accounts securely.
   - OAuth is integrated for Google and Facebook authentication, enabling users to log in with their social media accounts.

### 9. **Form Validation**
   - Forms like the login form and settings form include validation to ensure that users provide valid email addresses and passwords.
   - The app uses JavaScript validation to give real-time feedback to users about any input errors.

### 10. **State Management with React**
   - React’s state management is used for dynamic updates in components, such as the transaction list, user profile information, and updating the dashboard when transactions are added or edited.
   - Components that require shared data (like the list of transactions or user profile) consume state via React's Context API.

### 11. **Responsive Layout**
   - Tailwind CSS’s responsive utilities ensure that the app’s layout adapts to various screen sizes, offering a mobile-first experience.
   - Components like the Dashboard, Transactions, and Settings page are optimized to provide an excellent user experience across all devices.

## App Structure

### Pages

- **Dashboard**: Displays financial statistics like total revenue, transactions count, and recent activity. It uses various icons and charts for a visually appealing interface.
- **Transactions**: Displays the list of transactions, allows users to search, filter by date range, and manage (view, edit, delete) transactions.
- **Login**: Allows users to log in using email/password or social login (Google/Facebook).
- **Settings**: Lets users update their personal details such as name, email, password, and profile picture.

### Components

- **Sidebar**: A navigational component providing easy access to all major sections of the app.
- **Transaction Modal**: A modal used for viewing and editing individual transactions.
- **Expense Tracker**: Displays a chart or visual representation of the user's income and expenses.
- **Transaction List**: Shows the most recent transactions and allows for easy tracking.
