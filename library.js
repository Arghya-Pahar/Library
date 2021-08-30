console.log( 'welcome' );

displaystorage();

function book( name, author, type ) {
    this.name = name;
    this.author = author;
    this.type = type;
}
// display constructor

function display() {


}

// add methods to display prototype
display.prototype.add = function ( Book ) {
    console.log( "adding" );
    tablebody = document.getElementById( "tablebody" );
    let uistring = `<tr>
                     <td>${Book.name}</td>
                     <td>${Book.author}</td>
                     <td>${Book.type}</td>
                    </tr>`;
    tablebody.innerHTML += uistring;
  
}
 

display.prototype.clear = function () {
    let libraryform = document.getElementById( 'libraryform' );
    libraryform.reset();
}
display.prototype.validate = function ( Book ) {
    if ( Book.name.length < 3 || Book.author.length < 3 ) {
        return false;
    }
    else {
        return true;
    }

}
display.prototype.show = function (type, Message) {
    message = document.getElementById( "message" )
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>message:</strong> ${Message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;

  setTimeout(() => {
      message.innerHTML='';
      
  },3000);

}



// addbook event listner to libraryform
let libraryform = document.getElementById( 'libraryform' );
libraryform.addEventListener( 'submit', libraryformsubmit );


function libraryformsubmit( e ) {
    e.preventDefault();
    let name = document.getElementById( 'bookname' ).value;
    let author = document.getElementById( 'author' ).value;
    let type;
    let fiction = document.getElementById( 'fiction' );
    let programming = document.getElementById( 'programming' );
    let cooking = document.getElementById( 'cooking' );

    if ( fiction.checked ) {
        type = fiction.value;
    }
    else if ( programming.checked ) {
        type = programming.value;
    }
    else if ( cooking.checked ) {
        type = cooking.value;
    }
    let Book = new book( name, author, type );
    console.log( "form is submitted" );
    // console.log( Book );
    
    let Display = new display();
    if ( Display.validate( Book ) ) {
        Display.add( Book );
        Display.clear();
        Display.show('success','your book has been succesfully added');
       let storageitem=localStorage.getItem("storage");
       if(storageitem==null)
       {
           storageobj=[];
       }
       else
       {
           storageobj=JSON.parse(storageitem);
       }
       storageobj.push(Book);
       localStorage.setItem("storage",JSON.stringify(storageobj));

    }
    else {
        Display.show('danger','sorry letter must be exceed three');

    }
}
function displaystorage(){

    let getstorage =JSON.parse(localStorage.getItem("storage"));
    if(getstorage!=null)
    {
    getstorage.forEach(function(element,index) {
    tablebody = document.getElementById( "tablebody" );
    let uistring = `<tr>
                     <td>${element.name}</td>
                     <td>${element.author}</td>
                     <td>${element.type}</td>
                    </tr>`;
    tablebody.innerHTML += uistring;
    
    
})};
}



    