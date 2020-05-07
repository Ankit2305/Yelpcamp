const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

function seedDB(){
    var data = [
        {
            name: "Mountain Melo",
            image: "https://images.unsplash.com/photo-1582908140887-5935bade88da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, nam labore assumenda minima error optio sunt expedita. Facilis qui aspernatur numquam odio omnis molestiae dolor vitae maxime distinctio ipsam rerum minus repellendus ex fugit quos, amet commodi non exercitationem? Quaerat velit quisquam nulla. Libero recusandae hic id qui rerum quibusdam aperiam, ut consequuntur! Ullam corporis consequatur quas. Commodi, in dolor totam consectetur maiores soluta. Sequi, quam ea repellat nisi non reprehenderit illo laborum voluptatem at. Ad, corporis iusto. Sequi aut qui non quae quia. Delectus, sit? Quasi, veniam incidunt repellendus minus fuga magnam, et dolor hic qui perspiciatis, cumque inventore."
        },
        {
            name: "Ice Camp",
            image: "https://images.unsplash.com/photo-1579624512056-3eb398311205?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, nam labore assumenda minima error optio sunt expedita. Facilis qui aspernatur numquam odio omnis molestiae dolor vitae maxime distinctio ipsam rerum minus repellendus ex fugit quos, amet commodi non exercitationem? Quaerat velit quisquam nulla. Libero recusandae hic id qui rerum quibusdam aperiam, ut consequuntur! Ullam corporis consequatur quas. Commodi, in dolor totam consectetur maiores soluta. Sequi, quam ea repellat nisi non reprehenderit illo laborum voluptatem at. Ad, corporis iusto. Sequi aut qui non quae quia. Delectus, sit? Quasi, veniam incidunt repellendus minus fuga magnam, et dolor hic qui perspiciatis, cumque inventore."
        },
        {
            name: "Green Pal",
            image: "https://images.unsplash.com/photo-1495480024026-9dd2033e4b63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, nam labore assumenda minima error optio sunt expedita. Facilis qui aspernatur numquam odio omnis molestiae dolor vitae maxime distinctio ipsam rerum minus repellendus ex fugit quos, amet commodi non exercitationem? Quaerat velit quisquam nulla. Libero recusandae hic id qui rerum quibusdam aperiam, ut consequuntur! Ullam corporis consequatur quas. Commodi, in dolor totam consectetur maiores soluta. Sequi, quam ea repellat nisi non reprehenderit illo laborum voluptatem at. Ad, corporis iusto. Sequi aut qui non quae quia. Delectus, sit? Quasi, veniam incidunt repellendus minus fuga magnam, et dolor hic qui perspiciatis, cumque inventore."
        }
    ];

    Campground.deleteMany({}).then( () =>  {
        console.log("removed all campgrounds");
        /*
        data.forEach((campground) => {
            Campground.create(campground).then((createdCampground) => {
                console.log("added campground");
                Comment.create({ text: "This place is great because I can earn money for posting fake comments", author: "John Cena" }).then( comment => {
                    createdCampground.comments.push(comment);
                    createdCampground.save();
                    console.log("added new comment");
                }).catch(err => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
        */
    }).catch( err => {
        console.log(err);
    });
}

module.exports = seedDB;