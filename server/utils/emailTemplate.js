function gmailContent(verificationToken, username) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Arial', sans-serif;
          background-color: #f0f0f0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h1, h2 {
          color: black;
          text-align: center;
        }
    
        p {
          font-size: 16px;
          color: black;
          text-align: center;
        }
    
        .btn-verify {
          display: inline-block;
          background-color: #0D6EFD;
          color: #fff;
          font-size: 18px;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          border: 2px solid #008080;
          transition: background-color 0.3s ease-in-out;
          text-align: center;
          margin-top: 20px;
        }
    
        .btn-verify:hover {
          background-color: darkblue;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Email Verification</h1>
        <p>Please take a moment to verify your email 👋</p>
        <div style="text-align: center; margin-top: 20px;">
          <h2>Hello ${username},</h2>
          <p>Foodies appreciates your commitment to securing your account. To proceed, kindly click the button below to verify your email:</p>
          <a href="${process.env.BACKEND_URL}/verifyemail/${verificationToken}" class="btn-verify" style="color: white;">Verify Email</a>
        </div>
      </div>
    </body>
    </html>
    `;
}

function successFullVerification(username) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification Success</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Arial', sans-serif;
          background-color: #f0f0f0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h1, p {
          color: black;
          text-align: center;
        }
    
        p {
          font-size: 16px;
          color: black;
        }
    
        .btn-home {
          display: inline-block;
          background-color: #0D6EFD;
          color: #fff;
          font-size: 18px;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          border: 2px solid #008080;
          transition: background-color 0.3s ease-in-out;
          text-align: center;
          margin-top: 20px;
        }
    
        .btn-home:hover {
          background-color: darkblue;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Congratulations! ${username}</h1>
        <p>You have successfully verified your email. 🥳</p>
        <div style="text-align: center; margin-top: 20px;">
          <p>You can now proceed to the home page by clicking the button below:</p>
          <a href="${process.env.FRONTEND_URL}" style="color: white" class="btn-home">Go to Home Page</a>
        </div>
      </div>
    </body>
    </html>
    `;
}


module.exports = { gmailContent, successFullVerification };