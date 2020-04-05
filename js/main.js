
// New code
let textArea =  document.getElementById('contentsBox');
let tweetList = []
let id =0;  // must define the id outside.

// khanh added this.
const storageName = localStorage.getItem("inputUserName");
document.querySelector('.name-id').innerHTML = `${storageName}`;
document.querySelector('.name-id-2').innerHTML = `@${storageName}offical`;
const signInStatus = document.querySelector('.signout');
signInStatus.innerHTML = `<a class="signout" href="index.html" style="
font: 21px Gotham-bold; color: white; ">SIGN OUT</a>`;

// count the letter at TextArea
let countLetter = () =>{
   let remain = 140 - textArea.value.length;
    
   if(remain<0){
    document.getElementById('charCountArea').innerHTML = `${remain}chars`.fontcolor("red");
   }else {
    document.getElementById('charCountArea').innerHTML = `${remain}chars`;
   }
   
}

// add event on textarea, should come after define the countLetter function. 
textArea.addEventListener('input',countLetter);


// add the Tweet,  (Khoa way)
let addTweet=() => {
    let tweet = {
        id:id, // unique value 
        contents: textArea.value,
        likes: []  
    }

    if ( !tweet.contents) {
        alert ("You should say us what is happening, please!!!");
        return;
    }

    let splitValue = tweet.contents.split(" ");
    let transformedTweets = splitValue.map ((item)=> {// split every single word of tweet
        let firstChar = item.charAt(0);// find the first letter 
        if (firstChar === "#") {
            return ` <a href ="${item.substring(1)}"> ${item} </a>`
        } 
        return item  
    }).join(' ');
    tweet.contents = transformedTweets;
    tweetList.push(tweet);
    
    render(tweetList);
    id++;
    textArea.value =""
    countLetter()
}

// retweet function (Khoa way)
let retweet =(originid) =>{

    // 1. find the tweet that you want to retweet
    let originTweet = tweetList.find((item)=> item.id == originid)

    // 2. make the retweet object and it will have same contents with original tweet and parents id 
    let retweetObject = {
        id:id,
        contents: originTweet.contents,
        likes: [],
        originTweetID:originid  // referencing
    }

    //3. push retweet object into tweetList
    tweetList.push(retweetObject);

    //5.after everything done, make sure increase the id 
    id++
    
    //6. render tweetList 
    render(tweetList)
    
}


//delete TWeet 
let deleteTweet = (deleteId) =>{
    // 1. remove original tweeter id and retweet id 
    tweetList = tweetList.filter(e=> e.id !== deleteId && e.originTweetID !== deleteId )
    
    // 2. show again. 
    render(tweetList);

}



//Khai code

function myFunction(id, x) {
    let index = tweetList.findIndex(e => e.id === id); // tìm index của cái tweet trong array tweetList
    if (!tweetList[index].likes.includes(storageName))  // check xem current User like chưa
        tweetList[index].likes.push(storageName) // chưa like thì push vào array likes
    else  // like ròi thi remove nó ra khỏi array (unlike)
        tweetList[index].likes = tweetList[index].likes.filter(e => !tweetList[index].likes.includes(storageName))
    render(tweetList) // render lại
}


// function này để check xem storageName có like tweet nay chưa. Gọi trong lúc render
const checkIsLike = (item) => {
    return item.likes.includes(storageName)
}

// Show on screen 
let render = (array) => {
    console.log(array)
    // chỗ checkIsLike ở dưới là tenary operator (if else 1 line) để render chữ like nếu storageName chưa có trong array item.likes, và ngược lại
    let htmlForTweet = array.map((item) => `
                                <div class="container">
                                    <div class="row">
                                        <div class="col-sm-2">
                                            <img src="/img/frame-user-2.png" class="img-fluid" style="max-width: 100%;">
                                        </div>
                                        <div class="col-sm-10" style="text-align: right;">
                                            <div class="title-user"
                                            style="display:flex; flex-direction: row; justify-content: space-between; align-items: center; margin-top: 2%;">
                                                <div class="name-id" id="name-users" style="font: 18px Gotham-bold;">${storageName}</div>
                                                <div class="name-id-2" id="name-users-2" style="font: 14px Gotham-regular; color: #989898; margin-left: -65%;">@${storageName}offical</div>
                                                <div id="timeArea">${moment().startOf('hour').fromNow()}</div>
                                            </div>
                                            <div style="background-color: #2FA8FD;
                                                        border: none;
                                                        border-radius: 7px;
                                                        margin-top: 1%;
                                                        height: auto;
                                                        width: 100%; text-align: left;padding-left: 2%;padding-top: 2%; padding-bottom: 2%;">${item.contents} </div>
                                            <div class="buttonreact" style="margin-top: 3%;">
                                            <button class="${checkIsLike(item) ? "fas" : "far"} fa-heart fa-2x" onclick="myFunction(${item.id},this)" style="background: none; border:none; color:white;margin-right: 7%;"></button>
                                            <button class="commentBtn" style="background: none; border: none; margin-right: 7%; color: white; "><i class="far fa-comment fa-2x"></i></button>
                                            <button class="reSmurfBtn" onclick="retweet(${item.id})" style="background: none; border: none;margin-right: 7%;color: white;"><i class="fas fa-retweet fa-2x"></i></button>
                                            <button class="deleteBtn" onclick="deleteTweet(${item.id})" style="background: none; border: none;margin-right: 15%; color: white;"><i class="fas fa-trash fa-2x"></i></button>        
                                        </div>
                                    </div>
                                </div>
    `).join('')
    document.getElementById('tweetArea').innerHTML = htmlForTweet

}


