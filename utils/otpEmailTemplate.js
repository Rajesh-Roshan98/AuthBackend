const generateOtpEmail = (otpValue) => {
  return `
  <html>
  <body style="margin:0; padding:0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0; padding: 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <tr>
              <td align="center">
                <h1 style="color: #333333; margin-bottom: 10px;">OTP Verification</h1>
                <p style="color: #555555; font-size: 16px; margin: 0 0 20px 0;">Use the following OTP to complete your verification:</p>
                <div style="
                  display: inline-block;
                  padding: 20px 40px;
                  font-size: 32px;
                  font-weight: bold;
                  letter-spacing: 6px;
                  color: #ffffff;
                  background-color: #007BFF;
                  border-radius: 10px;
                  margin-bottom: 20px;
                ">${otpValue}</div>
                <p style="color: #999999; font-size: 14px; margin: 0 0 20px 0;">This OTP is valid for 5 minutes.</p>
                <p style="color: #555555; font-size: 16px; margin: 0;">If you did not request this, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
                <p style="color: #999999; font-size: 12px; text-align: center;">&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

module.exports = generateOtpEmail;
