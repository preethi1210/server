exports.emailVerification = (email, name, verificationLink) => {
    return `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Email Verification</title>
    <style>
    body {
        background-color: #ffffff;
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.4;
        color: #333333;
        margin: 0;
        padding: 0;
    }
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
    }
    .message {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .body {
        font-size: 16px;
        margin-bottom: 20px;
    }
    .highlight {
        font-weight: bold;
    }
    .support {
        font-size: 14px;
        color: #999999;
        margin-top: 20px;
    }
    .button {
        background-color: #007bff;
        color: #ffffff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        display: inline-block;
        margin-top: 10px;
    }
    </style>
    </head>
    <body>
    <div class="container">
        <div class="message">Verify Your Email</div>
        <div class="body">
            <p>Hey ${name},</p>
            <p>Thank you for signing up! Please verify your email address to activate your account.</p>
            <p><a href="${verificationLink}" class="button">Verify Email</a></p>
        </div>
        <div class="support">If you did not request this, please ignore this email or contact <a href="mailto:info@studynotion.com">info@studynotion.com</a>.</div>
    </div>
    </body>
    </html>`;
};
