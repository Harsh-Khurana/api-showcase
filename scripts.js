const fetchbtn = document.getElementById('fetch-button');
const postbtn = document.getElementById('post-button');
const allData = document.getElementById('all-data');
const formTitle = document.getElementById('form-title');
const formBody = document.getElementById('form-body');

const newData = (titleText,bodyText) =>{
	const title = document.createElement('DIV');
	title.innerHTML=titleText;
	title.className = 'card-title';
	const body = document.createElement('DIV');
	body.innerHTML = bodyText;
	body.className = 'card-body';
	const main = document.createElement('DIV');
	main.className = 'card';
	main.appendChild(title);	main.appendChild(body);
	allData.appendChild(main);
}

// Fn that fetches the data on click of fetch btn and also adds the 
// data to the page to display
fetchbtn.addEventListener('click',()=>{
	fetch('https://jsonplaceholder.typicode.com/posts')
		.then(resp=>resp.json())
		.then(result=>{
			const posts = result.splice(0,10);
			posts.map(post=>{
				newData(post.title,post.body);
			})
		})
		.catch(err=>{
	  		console.log(err);
		});
})

// Fn that posts data on click of post btn
postbtn.addEventListener('click',()=>{
	console.log("Listening for post click");
	if(formTitle.value.length>0 && formBody.value.length>0){
	console.log("inside if condn");
		fetch('https://jsonplaceholder.typicode.com/posts', {
	    method: 'POST',
	    body: JSON.stringify({
	      title: formTitle.value,
	      body: formBody.value
	    }),
	    headers: {
	      "Content-type": "application/json"
	    }
	  })
	  .then(resp => resp.json())
	  .then(result=>{
	  		alert("Data submitted successfully !!!")
	  		newData(formTitle.value,formBody.value)
	  		console.log(result);
	  	})
	  .catch(err=>{
	  		console.log(err);
	  });
	}else{
		alert("Form data cannot be empty :(");
	}
})