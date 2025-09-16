const resetPassword = (user, link) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      .email-container {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: hidden;
        text-align: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
      .email-header {
        background-color: #f8f9fa;
        padding: 20px;
        text-align: center;
      }
      .email-greeting h1 {
        color: #333;
      }
      .email-info p {
        color: #555;
      }
      .email-btn {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        border: none;
      }
      .email-btn:hover {
        background-color: #0056b3;
      }
      .email-info {
        padding: 20px;
      }
      .email-info p {
        margin: 0;
      }
      .email-info a {
        text-decoration: none;
      }
      .email-info a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h2 style="margin: 0;">Task Tracker</h2>
      </div>
      <div class="email-greeting">
        <h1>Hi ${user.username}!</h1>
      </div>
      <div class="email-info">
        <p>Forgot your password? Let's setup a new one!</p>
        <a href="${link}" class="email-btn">Reset Password</a>
        <p>If you didn’t mean to reset your password, you can disregard this email and nothing will change.</p>
      </div>
    </div>
  </body>
 </html> `;
};

module.exports = { resetPassword };
