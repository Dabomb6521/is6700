// Write the code for Question 1 here
const myFriends = [
  {
    firstName: "Eric",
    lastName: "Searl",
    birthDate: new Date(1992, 0, 17),
    favoriteFoods: ["pasta", "salad", "potatos"]
  },
  {
    firstName: "Dallin",
    lastName: "Southwick",
    birthDate: new Date(1994, 1, 14),
    favoriteFoods: ["pasta", "salad", "potatos"]
  },
  {
    firstName: "Stetzon",
    lastName: "Blacker",
    birthDate: new Date(1993, 2, 8),
    favoriteFoods: ["pasta", "salad", "potatos"]
  }
]

function getFriendsInfo(friends) {
  friends.forEach(friend => {
    const age = new Date().getFullYear() - friend.birthDate.getFullYear();
    const favFoodsJoined = friend.favoriteFoods.join(', ');

    console.log(`${friend.firstName} ${friend.lastName} is ${age} years old and enjoys the following foods: ${favFoodsJoined}`);
  });
};

getFriendsInfo(myFriends);