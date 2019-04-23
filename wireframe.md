# project3-mern Wireframe
###TODO:
- edit tweets route: for loop find one and update and add a flag for the form client side
- look up mongoose queries to sort tweets by date: 
    UserCollection.find( ).sort( { field: value } )
- cookies?
- search tweets by tweet body
###Server:
- new user strategy and routes
- login strategy and routes
- log out route (session/cookie reset)
- new tweet route (post, $push)
- edit tweet route
- all tweet routes (get)
- search tweet routes (get)

###Client Components
HomePage:
- nav bar: home link, register link, my tweets, search
- isLoggedIn: five most recent tweets
- Else: Sign In Form, five most recent public tweets

Register:
- form: username, password, image(url), background(url)
- fetch (post) 

Search:
- form
- fetch (get)
- results

Profile:
- user image and background image
- new tweet form
- my tweets 



