# gciAwsServer

This server is a robust and dynamic marketing automation system built on a stack of JavaScript, Node.js, Express, Nodemailer, Amazon AWS, and Google OAuth2.

Upon receiving an email address from the GCI Sample Page, it initiates a marketing funnel process that involves sending out a series of three emails, each spaced a day apart. These emails are sent via a Gmail account that is securely configured with Google OAuth2, ensuring reliable and secure email communications.

The first email provides the recipient with a sample and a link to the e-book store. The second email serves as a reminder about the e-book, again providing the same link. The third email offers a link with a discount. However, before sending this discount link, the server makes a request to the Hotmart API to verify that the client’s email is not already on the closed sales list.

In essence, this server is an intelligent marketing tool that not only automates email communication with potential customers but also integrates with external APIs to ensure optimal sales strategies.
