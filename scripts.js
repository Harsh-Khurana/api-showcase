const fetchbtn = document.getElementById('fetch-button');
const postbtn = document.getElementById('post-button');
const allData = document.getElementById('all-data');
const formTitle = document.getElementById('form-title');
const formBody = document.getElementById('form-body');
const loader = document.getElementById('loading');


// Fn that fetches the data on click of fetch btn and also adds the 
// data to the page to display
fetchbtn.addEventListener('click',()=>{
	fetch('https://jsonplaceholder.typicode.com/posts')
		.then(resp=>resp.json())
		.then(result=>{
			const posts = result.splice(0,10);
			posts.map(post=>{
				const title = document.createElement('DIV');
				title.innerHTML=post.title;
				title.className = 'card-title';
				const body = document.createElement('DIV');
				body.innerHTML = post.body;
				body.className = 'card-body';
				const main = document.createElement('DIV');
				main.className = 'card';
				main.appendChild(title);	main.appendChild(body);
				allData.appendChild(main);
			})
		})
		.catch(err=>{
	  		console.log(err);
		});
})

// Fn that posts data on click of post btn
postbtn.addEventListener('click',()=>{
	loader.className = 'loading-animation';
	if(formTitle.value.length>0 && formBody.value.length>0){
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
	  		loader.classList.remove('loading-animation');
	  		alert("Data submitted successfully !!!")
	  		console.log(result);
	  		formTitle.value='';
	  		formBody.value='';
	  	})
	  .catch(err=>{
	  		console.log(err);
	  		loader.classList.remove('loading-animation');
	  });
	}else{
		loader.classList.remove('loading-animation');
		alert("Form data cannot be empty :(");
	}
})