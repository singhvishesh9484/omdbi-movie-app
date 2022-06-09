
 let movies_div=document.getElementById("movies");
 let id;
async function searchMovies(){
    // https://www.omdbapi.com/?apikey=6a41ddca&s=om_shanti_om

try{
    const query=document.getElementById("query").value;
    
    let res= await fetch(`https://www.omdbapi.com/?apikey=6a41ddca&s=${query}`)

    let data=await res.json();
    console.log("data",data);
    let movies=data.Search;

    //appendMovies(movies)
    return movies;

  }catch(err){
    console.log("err",err)
 }
}


function appendMovies(data){


 movies_div.innerHTML=null;
  data.forEach(function(el){
      let p= document.createElement("p")
      p.innerText=el.Title;

      p.addEventListener("click",function(){
          let elem=p.innerText;
          document.getElementById("query").value=el.Title
          showDetail(el);
          document.getElementById("query").value=null;
          document.getElementById("movies").innerText=null;

          console.log(el)
      })

      movies_div.append(p);
  });

}

//assemble both function in one function ...append and search

async function main(){
 let data= await searchMovies();

 
 if(data===undefined){

    document.querySelector("#showmovie").append("ERROR !");
     return false;
    
 }
 appendMovies(data)

 console.log("data",data);
}

// debouncing

function debounce(func,delay){
  if(id){
      clearTimeout(id)
  }

  id= setTimeout(function(){
      func();

  },delay)

}

function showDetail(el){
   let box1= document.createElement("div");

   let img= document.createElement("img");
   img.src=el.Poster;

   let title=document.createElement("h2");
   title.innerText=`Name: ${el.Title}`;

   let year=document.createElement("p");
   year.innerText=`Release Year ${el.Year}`;

   box1.append(img,title,year)

   document.querySelector("#showmovie").append(box1);
   
}