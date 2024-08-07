 <div align="center">
<img src="https://github.com/me-shweta/Design-Den/blob/main/FoodiesWeblogo.png" alt="image" border="0"/>
<h1>Connecting You to Your College Canteens</h1>

<table align="center">
    <thead align="center">
        <tr border: 1px;>
            <td><b>🌟 Stars</b></td>
            <td><b>🍴 Forks</b></td>
            <td><b>🐛 Issues</b></td>
            <td><b>🔔 Open PRs</b></td>
            <td><b>🔕 Close PRs</b></td>
            <td><b> last commit</b></td>
        </tr>
     </thead>
    <tbody>
         <tr>
            <td><img alt="Stars" src="https://img.shields.io/github/stars/VanshKing30/FoodiesWeb?style=flat&logo=github"/></td>
             <td><img alt="Forks" src="https://img.shields.io/github/forks/VanshKing30/FoodiesWeb?style=flat&logo=github"/></td>
            <td><img alt="Issues" src="https://img.shields.io/github/issues/VanshKing30/FoodiesWeb?style=flat&logo=github"/></td>
            <td><img alt="Open Pull Requests" src="https://img.shields.io/github/issues-pr/VanshKing30/FoodiesWeb?style=flat&logo=github"/></td>
           <td><img alt="Close Pull Requests" src="https://img.shields.io/github/issues-pr-closed/VanshKing30/FoodiesWeb?style=flat&color=critical&logo=github"/></td>
           <td><img alt="Close Pull Requests" src="https://img.shields.io/github/last-commit/VanshKing30/FoodiesWeb?style=flat&color=critical&logo=github"/></td>
        </tr>
    </tbody>
</table>
</div>

# Tech Stacks

![](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&color=blue)
![](https://img.shields.io/badge/Express.js-8A2BE2?style=for-the-badge&logo=express.js&color=black)
![](https://img.shields.io/badge/Node.js-8A2BE2?style=for-the-badge&logo=node.js&color=green)
![](https://img.shields.io/badge/MongoDB-8A2BE2?style=for-the-badge&logo=MongoDB&color=orange)
![](https://img.shields.io/badge/mongoose-8A2BE2?style=for-the-badge&logo=mongoose&labelcolor=yellow)
![](https://img.shields.io/badge/Tailwindcss-8A2BE2?style=for-the-badge&logo=Tailwind&color=yellow)

</div>

## Table of Contents 📒

- [Introduction 👋](#introduction)
- [Features 🌟](#features)
- [Quick Start 🚀](#quickstart)
- [Contribution Guide🤝](#contribution)

# Introduction <a name="introduction"></a>

Welcome👋

<p> 
Welcome to Foodies, your go-to college dining companion! Designed for seamless campus culinary experiences, Foodies simplifies menu exploration and nutritional insights. Access daily canteen menus, make informed dietary choices with Spoonacular integration, and empower canteen efficiency. Our platform prioritizes user security and simplicity, ensuring effortless student sign-ups and hassle-free canteen management. Stay up-to-date with our Health News section, delivering valuable insights for healthier eating habits. Embrace convenience and culinary enlightenment with Foodies! 🍽️ 
</p>
<center><img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*vn4AvYCeRN9vMVIdXdzVzw.png" /></center>
<center><img src="https://miro.medium.com/v2/resize:fit:750/format:webp/1*b0oBt2sZFrnVshyIh58G2Q.png" /></center>
<center><img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*AinzzVn6uc2MpB9nIDEfHA.png" /></center>
<center><img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*VGix7E14mgXVRmiLUK3N5g.png" /></center>

<br/>

# Features🌟 <a name="features"></a>

- **Menu Exploration**: Easily check out daily menus of all campus canteens from personal devices.
- **Nutritional Insights**: Access nutritional information for dishes, aiding in informed dietary choices.
- **Canteen Optimization**: Assist canteen owners with menu planning and recipe suggestions, enhancing efficiency.
- **User-Friendly Interface**: Effortless sign-up for students and secure login credentials for canteen owners.
- **Health News**: Stay informed with health-related articles, empowering users to make healthier dietary choices.

## Tech Stack

- **React.js**: Provides a sleek and efficient frontend.
- **Tailwind CSS**: Ensures stylish and user-friendly designs.
- **Express.js**: Powers the backend operations.
- **MongoDB Atlas and Mongoose**: Store and manage important data.
- **Spoonacular API**: Offers nutritional information and recipe ideas.
- **G News API**: Fetches health-related articles.
- **Bcrypt and JWT**: Ensure data security and protection.

## Future Scope

- **Poll Functionality**: Allow users to vote on preferred dishes.
- **Feedback System**: Share thoughts with canteens for service improvement.
- **Expanding Horizons**: Extend Foodies to multiple colleges for personalized canteen listings.

# Quick Start for Contributors 🚀 <a name="quickstart"></a>

## To get started with contributing to the FoodiesWeb project, follow these steps:

1. **Fork and clone the repository**
2. **Navigate to the Project Directory:**
   ```bash
   cd FoodiesWeb
   ```
3. **Split Terminal for Backend Setup**

4. **Navigate to the Server Directory:**
   ```bash
    cd server
   ```
5. **Install Dependencies (in both terminals):**

   ```bash
     npm install
   ```

6. **Setup Environment Variables**

   ```bash
     cp .env.example .env
   ```

   ### **ENV Variables**

   Setup MongoDB local host instance and port in env file in your local device. Default port is 4000
   Sample uri is given below.

   ```
   PORT=3000
   DATABASE_URL="http://localhost:21713/foods"
   EMAIL="The email from which forgot the password email will be sent"
   MAILPASS="password for the email ( app password )"
   ```

   ### **STEP TO GENERATE APP PASSWORD**

   1. Enable 2-step verification if not
      **In https://myaccount.google.com/security, do you see 2-step verification set to ON**

   2. Generate APP PASSWORD by clicking on below link
      **https://myaccount.google.com/apppasswords?rapt=AEjHL4PAhcbtFEpLwfNtVix3bfiGe71GdrW_Naiuvp_NVnMZyTd0UR07M2mVnEyWzkw9kB99YVhhfEVtjxTi3QWSZ39biK-zGwnghm0u778vwmlh6TFbmh4**

7. **Start the Backend Server (in the terminal within the /server directory):** <br>
   In the terminal where you navigated to the /server directory, run the following command to start the backend server:
   ```bash
   nodemon server.js
   ```
8. **Start the React App (with Backend Running):**<br>
   After navigating run the following command to start the React app with the backend server running successfully:
   ```bash
   npm start
   ```
   With these steps, you'll have both the backend server and the React app up and running, ready for development or testing.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Runs the app in the development mode.\

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single-build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
.

## 🤠 Project Admin

<a href="https://github.com/VanshKing30"><img src="https://avatars.githubusercontent.com/u/74658625?v=4" alt="image" border="0" height="120"></a>

# ✴️ Contribution-Guide <a name="contribution"></a>

- Fork the Repository

- Set Up the Project, by cloning the repository to your local machine
- Install dependencies.
- Start the project.

- Create a New Branch
- Create or work on existing issues

- Make changes and commit with descriptive messages

- Push changes to your forked repository.
- Create a Pull Request

## <center>Part of GSSoC24</center>

<img src="https://imgur.com/wuiJXqr.png"/>

<h2 align = "center">Our Contributors ❤️</h2>    
<div align = "center">
 <h3>Thank you for being a part of this project!</h3>

![Contributors](https://contrib.rocks/image?repo=VanshKing30/FoodiesWeb)<br>

</div>

<p align="right">(<a href="#top">Back to top</a>)</p>
