This repo contains a basic e-commerce application built with React. The application allows users to authenticate, browse products, add them to a shopping cart, and proceed to checkout.

See [Live Demo](https://react-firebase-e-commerce.vercel.app/)



# Getting Started



1. Clone the repo:

  `git clone https://github.com/mesutcifci/React-Projects.git`

2. Open the main folder you cloned and navigate to the `react-e-commerce-app` directory

3. instal dependencies:

  `npm install`

4. Create .env file in where package.json placed:

```
  REACT_APP_FIREBASE_APP_ID=TYPE YOUR VALUE       
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=TYPE YOUR VALUE
  REACT_APP_FIREBASE_STORAGE_BUCKET=TYPE YOUR VALUE
  REACT_APP_FIREBASE_PROJECT_ID=TYPE YOUR VALUE
  REACT_APP_FIREBASE_AUTH_DOMAIN=TYPE YOUR VALUE
  REACT_APP_FIREBASE_API_KEY=TYPE YOUR VALUE
```

5. Initialize products
   
   - Checkout to branch react-e-commerce-initialize-products

   - Start project with command `npm start`

   - Go to components/InitializeProducts directory

   - Inside addProducts function set image urls for each primary category

      ``` 
        // Add your image URL's here
        const men = "";
        const women = "";
        const kids = "";
      ```

   - Open http://localhost:3000/ in your browser
   - Click **Add Products** button
   - If you see ```something bad happened: FirebaseError: [code=permission-denied]: Missing or insufficient permissions.```:
     - Go to your firebase console
     - Select Firestore Database on left menu
     - Click Rules tab on incoming screen
     - Copy and paste following code 
     
       ```  rules_version = '2';
       service cloud.firestore {
         match /databases/{database}/documents {
          // Products
          match /products/{product} {
    	      allow read, create;
          }
        // Users
        match /users/{userId} {
          allow create: if request.auth != null;
    	    allow read, update: if request.auth != null && request.auth.uid == userId;
        } } }
     - Click publish button.
     - Return to app screen and click **Add Products** button   
     - After products added checkout to main branch - if something went wrong let me know. 
  
  6. Build project:

    `npm run build`

 7. run tests:

    `npm run test`

# Features

- Responsive, mobile first
- Product Carousel
- Product listing and detail pages
- Filtering products by categories
- Shopping cart functionality
- Checkout process
- User authentication and authorization with Gmail and email
- Form management with formik and yup

# Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Create React App](https://create-react-app.dev/) - A tool to create single-page React applications  
- [TypeScript](https://www.typescriptlang.org/) - A strongly typed programming language that builds on JavaScript
- [Redux / Redux toolkit](https://redux-toolkit.js.org/) - A predictable state container for JavaScript apps
- [Firebase](https://firebase.google.com/) - A platform for building web and mobile apps
- [Material UI](https://mui.com/) - A popular React UI framework
- [Formik](https://formik.org/) - A library for managing the state and validation of forms
- [Formik Material-UI](https://stackworx.github.io/formik-mui/) - A set of Material-UI form controls built with Formik
- [Yup](https://github.com/jquense/yup) - A library for writing validation schemas
- [Jest](https://jestjs.io/) - JavaScript Testing Framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing framework for React
