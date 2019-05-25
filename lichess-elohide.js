const userLinkObserver = new MutationObserver((mutations) =>
{
	for(let mutation of mutations)
	{
		for(let node of mutation.addedNodes)
		{
			if(node.tagName === "GOOD" || node.tagName === "BAD")
				node.style.visibility = "hidden";
		}
	}
});

window.requestAnimationFrame(() =>
{
	let stuff_to_hide = 
	[
		...document.getElementsByTagName("RATING"),
		...document.getElementsByTagName("GOOD"),
		...document.getElementsByTagName("BAD"),
	];

	for(let obj of stuff_to_hide)
	{
		obj.style.visibility = "hidden";
	}
	
	for(let user_link of document.getElementsByClassName("user-link"))
	{
		userLinkObserver.observe(user_link, {childList: true});
		if(user_link.parentNode.classList.contains("player"))
		{
			// This is the one we're looking for...
	
			// Substracts the rating from the users name
			user_link.innerHTML = user_link.innerHTML.substr(0, user_link.innerHTML.indexOf(' '));
		}
	}
});



function check_ratings(time)
{
	const ratings = document.getElementsByClassName("upt__info__ratings");
	if(ratings.length == 0)
	{
		window.requestAnimationFrame(check_ratings);
	} else
	{
		for(let obj of document.getElementsByClassName("upt__info__ratings"))
		{
			obj.style.visibility = "hidden";
		}
	}
 	
}

const powerTipObserver = new MutationObserver((mutations) =>
{
	window.requestAnimationFrame(check_ratings);
	// empty the mutaton queue of the powerTipObserver - we don't need it anymore
	powerTipObserver.takeRecords();
});

const bodyObserver = new MutationObserver((mutations) =>
{
	for(let mutation of mutations)
		{
			for(let node of mutation.addedNodes)
			{
				if(node.id === "powerTip")
				{
					window.requestAnimationFrame(check_ratings);
					powerTipObserver.observe(node, {attributes: true});
				}
			}
		}
	});

bodyObserver.observe(document.body, {childList: true});
