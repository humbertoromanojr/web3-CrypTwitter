// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

struct Tweet {
    address author;
    string text;
    uint timestamp;
    string username;
}

contract CrypTwitter {

    uint public nextId = 0;
    uint public constant PAGE_SIZE = 10;

    mapping(address => string) public users;

    mapping(uint => Tweet) public tweets;

    function addTweet(string calldata text) public {
        Tweet memory newTweet;
        newTweet.text = text;
        newTweet.author = msg.sender;
        newTweet.timestamp = block.timestamp;

        nextId++;
        tweets[nextId] = newTweet;
    }

    function changeUsername(string calldata username) public {
        users[msg.sender] = username;
    }

    // tem tweets more recents - 1-10
    // more 10 - 11-20
    function getLastTweets(uint page) public view returns (Tweet[] memory ) {
        if(page < 1) page = 1;
        uint startIndex = (PAGE_SIZE * (page - 1)) + 1;

        Tweet[] memory lastTweets = new Tweet[](PAGE_SIZE);
        for(uint i=0; i < PAGE_SIZE; i++) {
            lastTweets[i] = tweets[startIndex + i];
            // get username from tweet
            lastTweets[i].username = users[lastTweets[i].author];
        }

        return lastTweets;
    }

}