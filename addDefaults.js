const database = require('./models/database.js');
const User = require('./models/user.js');
const Cat = require('./models/cat.js');

database.connect();
database.deleteMany(Cat, (param) => {})
database.deleteMany(User, (param) => {})

var user2 = new User({
    username: 'default',
    password: 'Password1',
    description: 'default'
});

database.insertOne(User, user2, function (param) {
    console.log(param)
  });


  //Taft Campus Cats
var romeow = {
    name: 'Romeow',
    age: '3',
    imageUrl: '/catImgs/romeowImg.jpg',
    gender: 'Male',
    shortDescription: 'An orange boi and likes to sleep in weird positions',
    yourCatDescription: 'Hello! My name is Romeow and I like to sleep a lot! I hang out in SJ Walk most of the time. It is not like I am waiting for Mooncake or anything. Just waiting for my best friends to swing by and feed me some of that quality wet food, you know what I am saying? Anyways, I am up for adoption and I hope you will welcome me to your new home! I promise, I will be the best cuddle bug! I love you already!',
    pusaThoughts: 'Romeow is very sweet and likes to sleep and eat most of the time. He is known as Uncle Romeow to some of the kittens and he gets sad when they get adopted but happy at the same time since they will be in their forever home. We think he can socialize well with the other kittens. He is a really good boy and we hope that the home he will end up will love him as much as we love our big putol.',
    notableQuotes: 'Why is he so chonky? - A DLSU Student',
    adoptionStatus: 'Available',
    godParents: null,      
    location: 'Taft Campus'
};

database.insertOne(Cat, romeow, function(flag) {});

var milky = {
    name: 'Milky',
    age: '4',
    imageUrl: '/catImgs/milkyImg.jpg',
    gender: 'Female',
    shortDescription: 'You wanna go, man? YOU WANNA GO, MAN? - Milky @ any random cat; Hello there hooman, I love you, please pet me - Milky @ any random human',
    yourCatDescription: 'I own DLSU now because I said so, okay? I like following cat feeders to make sure my butlers are safe because you can\'t trust anyone these days.. They said I am mean but I need to show the other cats I am the boss here even though some of them are already scared of me but I need to shOW IT TO THEM EVERYDAY. People love my wawa face so please adopt me. I am very good Milky and I will make sure the household is safe!',
    pusaThoughts: 'Milky is known as Queen Bully Milky, wawa face and other funny nicknames but even though she is a big bully, she loves people and will not hesitate for some pats and pets in the good spots although she can really be mean to other cats to establish her dominance. Despite that, she is up for adoption and is really a loving cat deep within.',
    notableQuotes: 'Oh no, she is scamming us with her wawa face! What are you doing? Do not feed her! She just ate!!! - A DLSU PUSA cat feeder',
    adoptionStatus: 'Available',
    godParents: null,      
    location: 'Taft Campus'
};

database.insertOne(Cat, milky, function(flag) {});

var icecube = {
    name: 'Ice Cube',
    age: '5',
    imageUrl: '/catImgs/icecubeImg.jpg',
    gender: 'Male',
    shortDescription: 'Watch me confuse you when I hangout with my other two white cat friends',
    yourCatDescription: 'They want to rename me to Ash Cube or Hollow Block because I like to roll in dirt and I am really chonk and because of that, they gonna give me a bath. I am still a good boy tho and I really love Ms. Laureen. They love my blue eyes the most and they said I am really a sweetheart. I like cuddling with my friends, sleeping, hugging the people I love, and most of ALL, GIVE ME THAT WET FOOD!',
    pusaThoughts: 'Ice Cube is one of the cats famous for taking a bath often because he gets dirty most of the time. He is really sweet even though he is like that and waits for his turn when another cat is sleeping in one of the butler\'s lap. He also loves hanging out with his cat friends and cuddle with them during siesta time when he feels like it. We hope Ash Cube, we mean, Ice Cube gets a new home soon. He is the perfect cuddle buddy!',
    notableQuotes: 'So how does DLSU PUSA differentiate Ice Cube, Snowflake, and Snowball again? - DLSU Student passing by during feeding time',
    adoptionStatus: 'Available',
    godParents: null,      
    location: 'Taft Campus'
};

database.insertOne(Cat, icecube, function(flag) {});

var levy = {
    name: 'Levy',
    age: '3',
    imageUrl: '/catImgs/levyImg.jpg',
    gender: 'Male',
    shortDescription: 'My mom did not allow me to go for billiards again.',
    yourCatDescription: 'Hello, my name is Levy and I live with my mom called Mama Levy and my dad called Yuch. I can be really mean to my mom sometimes because she does not allow me to hang out with my bros but I am really scared of her deep inside. They said I camouflage well in the orange leaves because yeah, I am orange. Do not let the pictures fool you, I am a chonky boi but I literally have to tell my parents where I should go before I leave. So UNFAIR!',
    pusaThoughts: 'Levy is always seen with Mama Levy and Yuch near the Faculty Center Building. They often eat together and nap together. Levy might be a bit too much and likes to attack Mooncake for no reason but he is a loveable boy and loves to sing! He also loves dreamies together with his family!',
    notableQuotes: 'Boss, one more order of dreamies - Levy',
    adoptionStatus: 'Available',
    godParents: null,      
    location: 'Taft Campus'
};

database.insertOne(Cat, levy, function(flag) {});

var animo = {
    name: 'Animo',
    age: '7',
    imageUrl: '/catImgs/animoImg.jpg',
    gender: 'Female',
    shortDescription: 'Packed with Tortitude and choco butternut catified',
    yourCatDescription: 'I am very shy and prefer to be alone with my blanket. I like approaching you but that does not mean you should pet me! Let\'s just hang out in silence and keep you hands to yourself. No touch! Only LOOK! I miss my best friend although I know Archer wants me to have my furever home soon. I can\'t wait to meet my future human! I promise you that I am gonna be the best cat you will ever have!',
    pusaThoughts: 'Animo is a solitary cat and quite picky with her food. Although, she had an other side of her which is playful. She is starting to like being around people but the rules still stands that no pats allowed! We look forward for Animo getting adopted and we hope that she will be loved by her new family as much as she is loved her in DLSU.',
    notableQuotes: 'Is that a choco butternut donut? - A hungry student',
    adoptionStatus: 'Available',
    godParents: null,      
    location: 'Taft Campus'
};

database.insertOne(Cat, animo, function(flag) {});

//Laguna Campus Cats
var charlie = {
    name: 'Charlie',
    age: '2',
    imageUrl: '/catImgs/charlieImg.jpg',
    gender: 'Male',
    shortDescription: 'I think I will cause problems on purpose.',
    yourCatDescription: 'Hello! My name is Charlie and I demand to hang out with all the students I meet inside the campus. I demand to be let inside the classroom because it is only fair I get to listen during discussions. I like sleeping inside the clean building because the air is so fresh and I love the food I get but those kittens just kept stealing kibbles from me and I do not want to mess with them because their mom is nearby. Please notice me. I am a good boi and I can\'t wait to meet my furever hooman!',
    pusaThoughts: 'Charlie is very assertive when it comes to getting what he want. He likes rubbing himself to other students and basically, he is really used around hoomans to the point he want to get some scritches (even though it is not allowed). We hope a family welcomes this assertive but playful cat in their warm home soon!',
    notableQuotes: 'Who let you in, Charlie?',
    adoptionStatus: 'Available',
    godParents: null,      
    location: 'Laguna Campus'
};

database.insertOne(Cat, charlie, function(flag) {});

var flash = {
    name: 'Flash',
    age: '1',
    imageUrl: '/catImgs/flashImg.jpg',
    gender: 'Male',
    shortDescription: 'I am too fast for y\'all, ya nerds.',
    yourCatDescription: 'I am a semi-feral cat. I am not used to humans yet but I get fed everyday because people are kind enough to leave some kibbles behind.',
    pusaThoughts: 'Flash is still feral but can be comfortable around humans in a certain distance. We are still trying to coax him out of his shell so we can prepare him for his forever home! He is very attached to his mother and likes to play a lot.',
    notableQuotes: 'A very fast boi.',
    adoptionStatus: 'Not Available',
    godParents: null,      
    location: 'Laguna Campus'
};

database.insertOne(Cat, flash, function(flag) {});

var mao = {
    name: 'Mao',
    age: '3',
    imageUrl: '/catImgs/maoImg.jpg',
    gender: 'Male',
    shortDescription: 'I have a Karen haircut but I won\'t talk to your manager',
    yourCatDescription: 'My name is Mao because mao sounds like the meow I make when I am around people. I like hanging out at the MRR building but sometimes, I will visit the clean building when I feel like it or when the other cats are not bullying me. I like sleeping most of the time but I am really happy to play with hoomans when they pass by me. I hope to meet my furever hooman soon and I promise that I will be a good boi!',
    pusaThoughts: 'Mao is very sweet even though he might look feral. He is often by himself but that does not mean that he is a mean cat. He just prefers his alone time away from the other cats but he loves it when the butlers play with him and approaches when called. We hope Mao finds his home soon!',
    notableQuotes: 'Why he meow like that? - A Laguna Campus Student',
    adoptionStatus: 'Available',
    godParents: null,      
    location: 'Laguna Campus'
};

database.insertOne(Cat, mao, function(flag) {});

var artha = {
    name: 'Artha',
    age: '2',
    imageUrl: '/catImgs/arthaImg.jpg',
    gender: 'Female',
    shortDescription: 'Let me inside the dorm, please.',
    yourCatDescription: 'I like hanging around the dormitory most of the time. You will find me sleeping near there around night time and sometimes, I will try my best and visit the clean building when I feel like it. People at the dorm likes doting on me a lot and says that I am a sweet cat! I love the people there although I wouldn\'t mind being adopted and be in my forever home!',
    pusaThoughts: 'Artha is a quiet girl and always seen with Land, which we presume is her daughter. She likes grooming Land and go around with her near the dorm. She also likes getting inside the dorm and walking in the study area. A very sweet cat and we hope she gets to be in her forever home soon where there will be butlers that will dote on her as much as she is doted here inside the dorm!',
    notableQuotes: 'Where is your daughter, Artha? - A dormer',
    adoptionStatus: 'Available',
    godParents: null,      
    location: 'Laguna Campus'
};

database.insertOne(Cat, artha, function(flag) {});

var land = {
    name: 'Land',
    age: '1',
    imageUrl: '/catImgs/landImg.jpg',
    gender: 'Female',
    shortDescription: 'Let me inside the dorm, please PART 2',
    yourCatDescription: 'I like sticking around my mom often but now, I am trying to explore the great outdoors but I have to go back during feeding time so I have lots of energy to explore the world! They said I am up for adoption because I am such a nice cat and well, I hope to meet my forever human so we can explore new things together!',
    pusaThoughts: 'Land is often hard to spot but she never misses feeding time. She likes exploring around the campus but always goes back to Artha and check if her mom is okay. We hope someone adopts her soon so she doesn\'t have to worry about her next meal!',
    notableQuotes: 'Where is your mom, Land? - A dormer',
    adoptionStatus: 'Available',
    godParents: null,      
    location: 'Laguna Campus'
};

database.insertOne(Cat, land, function(flag) {});