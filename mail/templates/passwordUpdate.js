exports.passwordUpdated=(email,name)=>{
    return `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Password update confirmaion</title>
    <style>
    body{
    background-color:#ffffff;
    font-family:Arial,sans-serif;
    font-size:16px;
    line-height:1.4;
    color:#333333;
    margin:0;
    padding:0;
    }
    .container{
    max-width:600px;
    margin:0 auto;
    padding:20px;
    text-align:center;
    }
    .logo{
    max-width:200px;
    margin-bottom:20px;
    }
    .message{
    font-size:18x;
    font-weight:bold;
    margin-bottom:20px;
    }
    .body{
    font-size:16x;
        margin-bottom:20px;
    }
        .support{
    font-size:14x;
    color:#999999;
    margin-top:20px;
        }
    .highlight{
    font-weight:bold;}
    </style>
     </head>
     <body>
     <div class="container">
     <a href=" ><img class="logo" src="" alt="StudyNotion Logo></a>
     <div class="message" >Password update confirmation</div>
     <div class="body">
     <p>Hey ${name},</p>
     <p>Your password has been successfully updated for email <span class="highlight">${email}</span> </p>
     <p>If you did not request this password change please contact us immediately to secure your account </p></div>
     <div class="support">If you have any questions or need further assistance please contact at <a href="mailininfo@studynotion.com">info@studynotion.com</a>.We are here to help!</div>
     </div>
     </body>
     </html>`;
    


}