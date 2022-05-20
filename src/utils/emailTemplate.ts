const emailTemplate = (emailBody: string, receiverName?: string) => {
	return `
    <html>
    <head>
    </head>
  <body>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@500&display=swap" rel="stylesheet">
  <style>
    .container {
      padding: 16px;
      color: #000000;
    }
    p{
      font-family: 'Work Sans', sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 19.57px;
      color: #000000;
    }
    .main {
      max-width: 555px;
    }
    .mb-5 {
      margin-bottom: 8px;
    }
    .mt-5 {
      margin-bottom: 8px;
    }
    .header {
      margin-bottom: 4px;
    }
    .header .logo {
      height: 28.31px;
      margin-right: 5.4px;
    }
    .header .logo-text {
      height: 26.6px;
    }
    .footer {
      color: rgba(0, 0, 0, 0.42);
    }
    .footer p {
      font-family: 'Work Sans', sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 19.57px;
      padding: 0px 0px;
      margin: 0px 0;
      color: rgba(0, 0, 0, 0.42);
    }
    .footer p:first-child {
      margin: 0px 0px;
    }
    .divide {
      margin-top: 24px;
      max-width: 568px;
      border: 1px solid rgba(0, 0, 0, 0.09);
      margin-bottom: 24px;
    }
    a {
      color: inherit;
      font-weight: bold;
      text-decoration: underline;
    }
  </style>
    <div class="container">
      <div class="main">
        ${
					receiverName
						? `
          <p class="mb-5">
            Hi ${receiverName},
          </p>
        `
						: '<p class="mb-5">Hey, </p>'
				}
        <p class="mb-5">
          ${emailBody}
        </p>
      </div>
      <div class="footer">
        <div class="mt-5"><br></div>
        <p>Organizo App</p>
        </p>
      </div>
    </div>
  </body>
  </html>`;
};

export default emailTemplate;
