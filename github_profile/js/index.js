const	getData = async(url) =>
{
	try
	{
		const	response = await axios.get(url);
		return (response.data);
	}
	catch(error)
	{
		console.log(error);
		return (error.message);
	}
}

const	noUser = () =>
{
	const	avatar = document.getElementById("user-img");
	const	userInfo = document.getElementById("user-info");
	const	errorMsg = document.getElementById("error");

	avatar.style.display = "none";
	userInfo.style.display = "none";
	errorMsg.style.display = "block";
}


const	showUserInfo = (userData, repoData) =>
{
	const	avatar = document.getElementById("user-img");
	const	userInfo = document.getElementById("user-info");
	const	userName = document.getElementById("user-name");
	const	userBio = document.getElementById("user-bio");
	const	followers = document.getElementById("user-followers");
	const	following = document.getElementById("user-following");
	const	userRepos = document.getElementById("user-repos");
	const	randomRepos = document.getElementById("random-repos");
	const	errorMsg = document.getElementById("error");
	let		repo = [...repoData];
	let		randomNbr;

	avatar.style.display = "block";
	userInfo.style.display = "block";
	errorMsg.style.display = "none";
	avatar.src = userData.avatar_url;
	userName.innerText = userData.name;
	userBio.innerText = userData.bio;
	followers.innerText = userData.followers + " Followers";
	following.innerText = userData.following + " Following";
	userRepos.innerText = userData.public_repos + " Repos";

	if (repo.length === 0)
	{
		randomRepos.style.display = "none";
		return (0);
	}
	for (let i = 0; i < 5; i++)
	{
		randomRepos.style.display = "flex";
		if (i > repo.length || repo.length === 0)
			break ;
		let	liRepo = document.getElementById(`repo-${i}`);
		
		randomNbr = Math.floor(Math.random() * (repo.length));
		liRepo.innerText = repo[randomNbr].name;
		repo.splice(randomNbr, 1);
	}
}

const	populateData = async() =>
{
	const	APIURL = 'https://api.github.com/users/';
	let 	search = document.getElementById("search");
    let 	userName = search.value.split(' ').join('');
	let		userData = await getData(`${APIURL}${userName}`);
	const	card = document.getElementById("card");
	let		repoData;

	search.value = "";
	card.style.display = "flex";
	if (typeof userData !== "string")
	{
		repoData = await getData(userData.repos_url);
		showUserInfo(userData, repoData);
	}
	else
	{
		noUser();
	}
}

const	formListener = () =>
{
	const	form = document.getElementById("form");

	form.addEventListener('submit', (event) =>
	{
		event.preventDefault();
		populateData();
	})
}