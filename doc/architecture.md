##Cloud App Server
Restful API

##E-shop App
Ember.js client side application

- register
- login
- product / category
- order
- payment
- scm
- crm

##App Domain Example
- Cloud App:
main domain: www.cloud.de
backoffice: www.cloud.de/bo
- E-Shop App:
main domain: www.e-shop.de
subdomain: e-shop.cloud.de
backoffice: www.e-shop.de/bo
subdomain backoffice: e-shop.cloud.de/bo

##Note:
- scurity problem for client side business app
server side solution
1. extensible server logic / automated web service composition
client side solution
2. third party resource for mapping between private resource and public resource, hide custom fields of resource in the third party resource
3. private field of resource, hide or encrypt private field, only server know and can compare or operate private value since it knows the encrypt method

##Use Case

Use case 1: (register)
1. user fill in the register form with username, email and password.
2. e-shop app send the form to the server api per ajax.
3. server create user resource and activation resource for the client.
4. server reponse the client with 201 status code.
5. server send the activation email to the client with the activation link.

Use case 2: (activate user)
1. user click the activation link in the email (delete http request).
2. activate the status of user resource, delete the activation resource.
3. server response with 204 status code.

Use case 3: (login)
1. user fill in the login form with username and password.
2. e-shop call the pipeline resource (/pipeline/authentication) to execute pipeline
3. server run the logic of authentication pipeline which make a serie of internal requests (pipelet).
4. first get user resource by given username.
5. compare the username and password information.
6. return access token to the client after the pipeline is finished.

Use case 4: (place order)
1. user select a product in the e-shop and put it into the cartridge.
2. user input the address and invoice information, etc.
3. e-shop app create a new order resource with unpaid status.
4. user input the payment information.
5. e-shop app update the order resource with paid status.
6. user confirm the transaction.
7. e-shop app validate the paid status of this order
8. e-shop app call the pipelet resource (/pipelet/send) to send a confirmation email.


url -> resource resolve
pdp based on resource name
/categories/0 -> category infos
/categories/0?include -> category infors with included product ref links or embeded list of all products
/categories/0/products -> all included product info list based on the props of category (product list)
/categories/0/products/1 -> ref link to one product
logic:
1. first split string, check the length of array, odd or even
2. /resource/:id in the end of pathname -> found resource name, found resource instance based on unique id
3. /resource/:id/resource in the end of pathname -> found last resource name, found last resource collection based on the resource instance before it
4. router always search database by res.get(resource, query, options, callback)
5. resource saved with node, e.g., '/application/e-shop'
