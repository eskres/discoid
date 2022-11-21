# Hop Little Bunny

Completed during my 6th week on General Assembly\'s Software Engineering Immersive, the concept for Discoid is that of an online marketplace specialising in the trading of vinyl records. This project was built using MongoDB, Express, Node.js, JavaScript, jQuery, Bootstrap, HTML and CSS.

**Discoid is deployed at https://discoid.skreslett.com**

This project was completed as a pair within a week. My teammate was Ivan Craig and his repository for this project can be found [here](http://https://github.com/ic188002/Vinyl-Makert-Place "here").

---
| Table of Contents |
|-|
| [Technologies Used](#Technologies-Used) |
| [Brief](#Brief) |
| [Planning](#Planning) |
| [Build Process](#Build-Process) |
| [Challenges](#Challenges) |
| [Wins](#Wins) |
| [Key Learnings](#Key-Learnings) |
| [Bugs](#Bugs) |
| [Future Improvements](#Future-Improvements) |

---
## Technologies Used
- MongoDB
- Express
- Node.js
- JavaScript
- jQuery
- Bootstrap
- HTML
- CSS

---
## Brief

Our brief was to create a web application of our choice from scratch in 7 days with the following requirements specified:
- User resource
 - User must have a profile
 - User must be able to edit their profile
 - User must be able to change password
- Authentication
 - User must be able to sign up
 - User must be able to sign in
 - User must be able to sign out
- 2 extra resources of your choice (other than User)
 - User must be able to create a resource
 - User must be able to edit a resource
 - User must be able to view all resources they created
 - User must be able to view a single resource they created
 - User must not be able to edit or delete other users' resources

---
## Planning

I suggested my first idea, an e-commerce store selling records, after a short discussion we agreed that we would work on this. We started our planning by working on wireframes (Ivan) and an ERD using Miro (myself) before working together to create a Kanban board using Trello. 
We worked collaboratively throughout the project, remaining on zoom, discussing and planning as needed. We shared the tasks by agreeing on our strengths. Ivan led the work on the wireframes as he had an interest in working creatively and developing the front-end, whilst I focussed on the back-end. These can be found below:

# INSERT PLANNING



---
## Build Process

### Stage 1
We started by laying out the folder structure, installing dependencies, configuring server.js and creating the files that we would be working on.

### Stage 2
Once our environment was ready we moved on to coding. Ivan worked on models and routes and I started out on our writing APIs in controllers plus some basic views.

### Stage 3
Ivan then started working on our front-end using Bootstrap and CSS while I moved on to implementing the Spotify API as a search function so that users could find data for a record while making listings as well as implementing cart functionality. This is the stage where I believe I wrote my most interesting pieces of code for this project.

Below you will find some code snippets from the stages described above.



### Highlights
#### Add to Cart
```
exports.cart_add_get = (req, res) => {
    let recordId = req.params.id
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    Record.findById(recordId)
    .then((record) => {
        if (req.session.cart !== undefined && req.session.cart.record.length > 0) {
            let abort;
            req.session.cart.record.forEach(element => {
                console.log();
                if (element._id.toString() == record._id.toString()) {
                    abort = true;
                }
            });
            if (abort === true) {
                console.log("abort");
                res.redirect("/records/index");
            } else {
                cart.record.push(record)
                req.session.cart = cart;
                res.redirect("/records/index")
            }
        } else {
            cart.record.push(record)
            req.session.cart = cart;
            res.redirect("/records/index")
        }
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!!");
    })
}
```
This function checks whether a cart object exists before creating one if required. As Discoid is a marketplace we have decided that each listing must be unique. Consequently, the function then checks whether the cart has any contents and whether the item being added is already in there. If the item is already in the cart then no changes are made to the cart and the user is redirected back to the product listings. If the item is not already in the cart then it is added and then the user is also redirected.

#### Spotify API Pagination
```
// SPOTIFY RESULTS NEXT PAGE
exports.record_next_post = (req, res) => {
        axios.get(req.body.next, { headers: { 'Authorization': 'Bearer' + ' ' + spotifyApi._credentials.accessToken } })
        .then(response => {
              const data = response.data;
              res.render("records/page", {data});
        }).catch(err => {
              console.error(err);
        })
}
```
In this snippet you can see the two functions I wrote for the pagination of search results from the Spotify API. This snippet is special for me as it was the first ever 3rd party API request that I had  written from scratch. Spotify\'s API response includes the URL for the next and previous pages of search results so the get request uses this to get the data for the relevant search results before rendering our page.

#### Create Record Listing
```
// HTTP POST - Record
exports.record_create_post = (req, res) => {
    // Saving the data into the Database
    let record = new Record(req.body);
    console.log(req.body);
    console.log(req.file);
    if (req.file!==undefined){
        let imagePath = '/albumCover/' + req.file.filename;
        record.albumCover= imagePath;
    } else {
        let imagePath = "https://via.placeholder.com/400"
        record.albumCover= imagePath;
    }
    record.save()
    .then(() => {
        console.log(req.body.record);
            User.findById(req.body.user, (error, user) => {
                user.record.push(record);
                user.save();
            })
        res.redirect("/records/index");
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!!");
    })
}
```
This is a simple post request for our record listing form. But I added a conditional check for whether an image file has been submitted. If an image has not been submitted it provides a placeholder image. I think this is a nice touch and demonstrates the attention to detail that I aim to bring to my work at every opportunity.

---
## Challenges
As a team I think we would both be in agreement that trying to resolve merge conflicts was our biggest challenge. For both Ivan and I it was our first time using GitHub for a team project and we had quite a steep learning curve as a result. On reflection, I would aim to overcome this in the future by ensuring all team members have clearly defined areas of focus, to avoid multiple people working within the same files. If this were not possible, I would consider pair-programming.

Personally I think implementing the Spotify API was my biggest challenge as we had not covered 3rd party APIs at this stage of the course. I struggled to understand the authorisation aspect of the Spotify API so I used a wrapper to help me, which can be found here. I believe this feature demonstrates my ambition and drive to push myself outside of my comfort zone.

---
## Wins
With this project we exceeded the brief which I believe can be attributed to strong teamwork. I’m proud of the functionality the site has and the attention to detail that can be found in areas such as the add to cart get request with its layers of conditional checks.

---
## Key Learnings
Having completed this project I have a greater confidence in using and understanding Express and Node.js. In particular, using Express’ MVC architecture to write API requests as well as using GitHub in a team setting in order to minimise merge conflicts. I have also developed my knowledge of Bootstrap through reading documentation in order to assist my teammate. Pair programming was a useful process to work through a problem together when we encountered difficulty, this facilitated effective and efficient problem solving as we progressed through the project.

---
## Bugs
The only bug I am aware of is with regards to our Spotify access token timing out and not automatically renewing.

---
## Future Improvements
In the future I would like to revisit this project and rewrite the Spotify API calls from scratch without using the wrapper and at the same time resolve the bug where our Spotify access token times out. I would also like to add test checkout functionality using Stripe.

---